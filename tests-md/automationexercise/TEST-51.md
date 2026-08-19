# TEST-51 - Prevent account registration with an already registered email

## Test Case Id
TEST-51

## Scenario
Prevent account registration with an already registered email

## Preconditions
An account with email 'existing.user@example.com' already exists in the system.

## Test Steps
1. Navigate to the Signup / Login page from the top navigation
   * **Expected Result:** The Signup / Login page is displayed.
2. Enter a name and an already registered email address in the Signup section and click 'Signup'
   * **Test Data:** Name: Jane Doe, Email: existing.user@example.com
   * **Expected Result:** An error message indicating that the email address already exists is displayed.
3. Verify system state after registration attempt
   * **Expected Result:** User is not navigated to the account creation form and no duplicate account is created.

## Expected Result
N/A