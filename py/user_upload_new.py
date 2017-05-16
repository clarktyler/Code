'''
Process to transmit the HR LMS Bridge users file to Amazon Web Services
'''
from xml.dom import minidom
import sys
import requests
import collections
from requests.auth import HTTPBasicAuth
from requests.packages.urllib3.exceptions import InsecureRequestWarning
import time
import os
import json

waitInc = 90   # seconds
timesToWait = 20
counter = 1

COMPLETE="complete"


def getText(nodelist):
    rc = []
    for node in nodelist:
        if node.nodeType == node.TEXT_NODE:
            rc.append(node.data)
    return str(''.join(s.encode('utf-8') for s in rc))


requests.packages.urllib3.disable_warnings(InsecureRequestWarning)   

try:
    zipFile = sys.argv[1]
except IndexError as e: 
    print "Missing parameter"
    print "Usage: python bridgeLoad bridge_users.zip"
    print str(e)
    sys.exit(1)

try:    
    serverName = os.environ['BRIDGE_SERVER_NAME']
    serverKey = os.environ['BRIDGE_SERVER_KEY']
    serverSecret = os.environ['BRIDGE_SERVER_SECRET']
except KeyError as e:
    print "Missing Environment Variables"
    print str(e)
    sys.exit(1)

# Step 1. Get Policy Info from AWS
awsURL = 'https://{0}/api/author/file_upload_policies'.format(serverName)

awsHeaders = {
    'Content-Type': 'application/json',
    }

awsData = {"content_type": "text/csv", "multipart": True}

policy = requests.post(awsURL, headers=awsHeaders, json=awsData, auth=HTTPBasicAuth(serverKey, serverSecret))

if policy.status_code == 200:
    try:
        policy_json  = policy.json()
        print "Step 1 - Policy Retrieved Successfully"
    except ValueError as e:
        print e
        sys.exit(1)
else:
    print "Error retrieving Policy"
    print "Invalid Status Code:", str(policy.status_code)
    sys.exit(1)
    
# Step 2. Upload Zip to S3

# need OrderedDict for AWS to make sure key is the first entry
files = collections.OrderedDict()
files['key'] = policy_json['policies'][0]['conditions']['key']
files['policy'] = policy_json['policies'][0]['conditions']['policy']
files['signature'] = policy_json['policies'][0]['conditions']['signature']
files['acl'] = policy_json['policies'][0]['conditions']['acl']
files['AWSAccessKeyId'] = policy_json['policies'][0]['conditions']['AWSAccessKeyId']
files['Content-Type'] = policy_json['policies'][0]['conditions']['Content-Type']
files['success_action_status'] = policy_json['policies'][0]['conditions']['success_action_status']
files['file'] = open(zipFile, 'rb')

bucket_url = policy_json['policies'][0]['bucket_url']
location = requests.post(bucket_url, files=files, verify=False)
if location.status_code == 201:
    try:
        dom = minidom.parseString(location.text)
        print "Step 2 - File Uploaded"
    except e:
        print e
        sys.exit(1)
else:
    print "Error retrieving Location"
    print "Invalid Status Code:", str(location.status_code)
    print location.text
    sys.exit(1)


locationDataURL = getText(dom.getElementsByTagName("Location")[0].childNodes)

# step 3. Define CSV Headers

fields = {
        "0": ["uid","uid"]
        , "1": "first_name"
        , "2": "last_name"
        , "3": "email"
        , "4": ["hris_id", "HRIS"]
        , "5": "30"
        , "6": "31"
        , "7": "32"
        , "8": "33"
        , "9": "34"
        , "10": "35"
        , "11": "36"
        , "12": "37"
        , "13": "38"
        , "14": "39"
        , "15": ["manager_uid","SupervisorId"]
        , "16": "40"
        , "17": "41"
        }


data = { 'context_type': 'User', 'file': { 'fields': fields, 'has_headers': True, 'url':  "{0}".format(locationDataURL)  } }

locationURL = 'https://{0}/api/admin/users/import'.format(serverName)
imports = requests.post(locationURL, headers=awsHeaders, json=data, auth=HTTPBasicAuth(serverKey, serverSecret))

if imports.status_code != 201:
    print "Error retrieving imports.json"
    print "Invalid Status Code:", str(imports.status_code)
    print locationDataURL
    sys.exit(1)
else:
    try:
        imports_json = imports.json()
        print "Step 3 - CSV Headers Defined"
    except ValueError as e:
        print e
        sys.exit(1)

importId = imports_json['imports'][0]['id']


# Step 4. Check upload Status

print "File ID: ", str(importId)
uploadURL = 'https://{0}/api/admin/users/imports/{1}'.format(serverName, importId)
state = ""

# need to wait for file to process on the AWS server before trying to confirm
# Will try 5 times @ 3 mintes each until a complete is found or we use up all 5 tries

while state != COMPLETE and counter <= timesToWait:
    
    print "Try: ", str(counter)
    time.sleep(waitInc)
    counter += 1
    
    uploadStatus = requests.get(uploadURL, headers=awsHeaders, auth=HTTPBasicAuth(serverKey, serverSecret))
    print uploadStatus.status_code
    if not str(uploadStatus.status_code).startswith("2"):
        print "Error retrieving upload Status"
        print "Invalid Status Code:", str(uploadStatus.status_code)
        sys.exit(1)
    else:
        try:
            uploadStatus_json = uploadStatus.json()
        except ValueError as e:
            print e
            sys.exit(1)

    state = uploadStatus_json['imports'][0]['state']  
    print state
    print uploadStatus_json['imports'][0]['invalid_rows'] 
    print
    
if state != COMPLETE:
    print "Upload Status: ", state
    sys.exit(1)
else:
    print "Step 4 - Upload Status completed"

    
#Step 5.   Finalize upload with confirm

uploadConfirmUrl = 'https://{0}/api/admin/users/imports/{1}/confirm'.format(serverName, importId)

uploadConfirm = requests.post(uploadConfirmUrl , headers=awsHeaders, auth=HTTPBasicAuth(serverKey, serverSecret))
                             
if uploadConfirm.status_code != 204:
    print "The file was not confirmed"
    print "Invalid Status Code:", str(uploadConfirm.status_code)
    sys.exit(1)
else:
    print "Step 5 - The file was confirmed"


sys.exit(0)

