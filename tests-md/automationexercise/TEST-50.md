# TEST-50 - Successful user registration with valid unregistered email

## Test Case Id

TEST-50

## Scenario

Successful user registration with valid unregistered email

## Preconditions

Visitor is on the website home page and the email address used for signup is not registered in the system.

## Test Steps

1. Navigate to the home page and click on 'Signup / Login' in the top navigation bar
   - **Expected Result:** The Signup / Login page is displayed with Signup and Login forms.
2. In the 'New User Signup!' section, enter a name and a unique unregistered email address, then click 'Signup'
   - **Test Data:** Name: John Doe, Email: john.doe.test@example.com
   - **Expected Result:** The Account Information registration form is displayed.
3. Fill in the required account information fields (Title, Password, Date of Birth, Address details, Mobile Number) and click 'Create Account'
   - **Test Data:** Password: Password123!, Address: 123 Main St, Country: United States, State: NY, City: New York, Zipcode: 10001, Mobile: 1234567890
   - **Expected Result:** Account creation success message is displayed and user account is created.

## Expected Result

N/A
