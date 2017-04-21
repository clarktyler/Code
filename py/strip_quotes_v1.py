input_csv = ''  # File path to "" CSV
output_csv = ''  # File path to Output CSV

#############################
## DON'T UPDATE CODE BELOW ##
#############################
# Loop through a CSV to remove ""
userCsv = open(input_csv, 'rt')
with open(output_csv, 'w') as _f:
    _f.write(userCsv.read().replace('"', ''))
print("Alright we removed those pesky " " for you.")

