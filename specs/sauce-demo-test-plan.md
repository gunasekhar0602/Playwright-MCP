# Sauce Demo Core User Operations Test Plan

## Application Overview

Functional test plan for the Sauce Demo e-commerce application at https://www.saucedemo.com/. Covers the five typical end-user operations: sign in, browse and select products, manage the cart, provide checkout information, and review and place an order. Each scenario starts in a fresh browser state and uses the documented standard_user account (standard_user / secret_sauce) unless testing invalid login behavior.

## Test Scenarios

### 1. Core Shopping Journey

**Seed:** `tests/seed.spec.ts`

#### 1.1. Sign in with valid and invalid credentials

**File:** `tests/sauce-demo/login.spec.ts`

**Steps:**
  1. Start from a fresh session at https://www.saucedemo.com/. Submit an incorrect username and password.
    - expect: The user remains on the login page.
    - expect: A visible authentication error is shown.
  2. Replace the credentials with username standard_user and password secret_sauce, then select Login.
    - expect: The user is signed in and navigated to the Products inventory page.
    - expect: The product list and shopping cart control are visible.

#### 1.2. Browse, sort, inspect, and add a product

**File:** `tests/sauce-demo/product-browsing.spec.ts`

**Steps:**
  1. From a fresh session, sign in as standard_user with password secret_sauce.
    - expect: The Products page displays the available product inventory and a product-sort control.
  2. Change the sort order to Price (low to high).
    - expect: Products are reordered by ascending price; Sauce Labs Onesie ($7.99) appears before higher-priced products.
  3. Open the Sauce Labs Backpack product details.
    - expect: The detail view shows the Sauce Labs Backpack name, description, price ($29.99), and Add to cart control.
  4. Select Add to cart.
    - expect: The control changes to Remove and the cart indicator shows one item.

#### 1.3. Review and manage cart contents

**File:** `tests/sauce-demo/cart-management.spec.ts`

**Steps:**
  1. From a fresh session, sign in as standard_user and add Sauce Labs Backpack and Sauce Labs Bike Light to the cart.
    - expect: The cart indicator shows two items.
  2. Open the cart.
    - expect: The cart lists both selected products with their descriptions, prices, and quantity 1.
  3. Remove Sauce Labs Backpack from the cart.
    - expect: The Backpack is removed, the Bike Light remains, and the cart indicator updates to one item.
  4. Select Continue Shopping, then reopen the cart.
    - expect: The user returns to inventory and the cart still contains only the Bike Light.

#### 1.4. Validate checkout information

**File:** `tests/sauce-demo/checkout-validation.spec.ts`

**Steps:**
  1. From a fresh session, sign in as standard_user, add one product, open the cart, and select Checkout.
    - expect: The Checkout: Your Information page displays First Name, Last Name, and Zip/Postal Code fields.
  2. Leave all fields empty and select Continue.
    - expect: Checkout does not advance and a visible error states that First Name is required.
  3. Enter a first name only and select Continue.
    - expect: Checkout does not advance and a visible error states that Last Name is required.
  4. Enter a last name but leave ZIP/postal code empty, then select Continue.
    - expect: Checkout does not advance and a visible error states that the ZIP/Postal Code is required.
  5. Enter a valid ZIP/postal code and select Continue.
    - expect: The user advances to Checkout: Overview.

#### 1.5. Review totals and complete an order

**File:** `tests/sauce-demo/order-completion.spec.ts`

**Steps:**
  1. From a fresh session, sign in as standard_user, add Sauce Labs Backpack, open the cart, select Checkout, enter first name Test, last name Customer, and ZIP/postal code 90210, then select Continue.
    - expect: Checkout: Overview shows the Backpack with quantity 1 and unit/item total $29.99.
    - expect: Payment information and shipping information are displayed.
    - expect: For this single-item order, tax is $2.40 and the total is $32.39.
  2. Review the order and select Finish.
    - expect: The Checkout: Complete! page appears with the message Thank you for your order!
    - expect: The confirmation states the order has been dispatched.
    - expect: The cart indicator is empty.
  3. Select Back Home.
    - expect: The user returns to the Products page and can continue shopping.
