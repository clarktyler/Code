#!/usr/bin/python

# For reference:
# row[0] = canvas_user_id
# row[1] = user_id
# row[3] = first_name
# row[4] = last_name

import csv
import requests
import time

myCsvFile = '/users/tclark/Desktop/milescc_user_provisioning.csv'  # Example: 'API_Testing/users_provisioning.csv'
myLogFile = '/users/tclark/desktop/milescc_log.txt'  # Example: '/Users/ianm/Documents/Schools/IMU/log.txt'
baseUrl = 'https://milescc.test.instructure.com/'  # Example: 'https://canvas.instructure.com/api/v1/users/'
header = {'Authorization': 'Bearer 8119~RFYvFQTaAcVqi4E1gRfZTzA1CXMgDr04JunkWOLKA1YEsoxhiSXSuWDAnRNfXjvR'}
# noinspection PyPep8
imagesUrl = 'https://data.milescc.edu/Miles/IMAGES/NamePhoto/'  # Example: 'https://s3.amazonaws.com/canvas_ianm/avatars/'
fileExt = '.jpg'  # .png, .jpg, etc.

with open(myCsvFile, 'rb') as csvFile:
    csvReader = csv.reader(csvFile, delimiter=',')
    # csvReader.next()  # Skip the header

    # Create log object for storing results
    log_time = str(time.asctime(time.localtime(time.time())))
    log = open(myLogFile, 'a')
    log.write('\n\n' + log_time + '\n')

    for row in csvReader:
        payload = {'user[avatar][url]': imagesUrl + row[1] + fileExt}
        r = requests.put(baseUrl + row[0], headers=header, params=payload)
        # Output progress to the console
        print
        str(csvReader.line_num - 1) + ". Avatar added for " + row[0] + ": " + row[3] + " " + row[4]
        # Alternatively, write results to a text file
        log.write(str(csvReader.line_num - 1) + ". Avatar added for " + row[0] + ": " + row[3] + " " + row[4] + "\n")
    log.close()
