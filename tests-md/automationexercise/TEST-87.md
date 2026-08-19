# TEST-87 - Valid payment details place the order and generate an order id

## Test Case Id
TEST-87

## Scenario
Valid payment details place the order and generate an order id

## Preconditions
Registered and logged-in user at the checkout review step with 2 products in the cart

## Test Steps
1. Enter an order comment and click Place Order
   * **Test Data:** Order comment text
   * **Expected Result:** The payment form is displayed
2. Fill in the payment form with valid card details and confirm payment
   * **Test Data:** Name on card, card number, CVC, expiration month and year
   * **Expected Result:** Payment is accepted and the confirmation page is displayed
3. Read the confirmation page
   * **Expected Result:** The message 'Your order has been placed successfully!' is shown and an order id is displayed

## Expected Result
N/A