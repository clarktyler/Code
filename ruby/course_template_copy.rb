require 'unirest'
require 'csv'

#== Change me ======
access_token = "*************"
domain = "bharris"
env = nil
csv_file = "test_template.csv"
log_file = "./log.txt"

#====== Don't change me ==========
unless access_token
  "Puts what is your access token?"
  access_token = gets.chomp
end

unless domain
  "Puts what is your Canvas domain?"
  domain = gets.chomp
end

unless csv_file
  "Puts where is your Template update CSV located?"
  csv_file = gets.chomp
end

unless File.exists?(csv_file)
  raise "Error: can't locate the update CSV"
end

env ? env << "." : env
base_url = "https://#{domain}.#{env}instructure.com/api/v1"
test_url = "#{base_url}/accounts/self"
puts test_url
Unirest.default_header("Authorization", "Bearer #{access_token}")

# Make generic API call to test token, domain, and env.
test = Unirest.get(test_url)

unless test.code == 200
  raise "Error: The token, domain, or env variables are not set
  correctly"
end

CSV.foreach(csv_file, {:headers => true}) do |row|
  template_id = row['source_course']
  new_course_id = row['destination_course']
  url = "#{base_url}/courses/#{new_course_id}?migration_type=course_copy_importer&settings[source_course_id]=#{template_id}"
  section_update_response = Unirest.put(url)

  if section_update_response.code != 200
    File.open(log_file, "ab") { |file| file.write("Error updating #{new_course_id} \n\n #{section_update_response.body}\n") }
    puts "Error updating #{template_id}"
  else
    puts "Successfully imported #{template_id} to #{new_course_id}"
    puts section_update_response.body
  end
end
