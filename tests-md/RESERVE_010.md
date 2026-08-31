# RESERVE_010 - Verify we can reserve a plan after being logged in

## Test Case Id

RESERVE_010

## Scenario

Verify we can reserve a plan after being logged in

## Preconditions

N/A

## Test Steps

1. Navigate to the page (https://hotel-example-site.takeyaqa.dev/en-US/)
2. Log in with valid account
   - **Test Data:** clark@example.com/password
3. Click on the top menu link "Reserve"
4. Click on the button "Reserve room" of a plan
   - **Test Data:** Premium Plan
5. Fill all required fields
6. Click on the button "Confirm Reservation"
   - **Expected Result:** The user is redirected to Confirm Reservation page.
7. Click on the button "Submit Reservation"
   - **Expected Result:** The success popup is displayed:
     - Popup title: Thank you for reserving.
     - Content: We look forward to visiting you.
     - Close button.

## Expected Result

N/A
