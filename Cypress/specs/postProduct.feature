Feature: Product Management

  As an admin,
  I want to add new products to the inventory
  so that I can expand our product offerings.

  Scenario: Navigate to admins products management page
    Given that I am on the "/" page
    When I click the "signin" in the navbar
    Then I enter my admin "email"
    And I also enter my "password"
    And I click the "login" button
    And then I click the "profile" button
    And I click on the "adminpanel" on the sidebar
    And lastly I navigates to the "products" overview page

  Scenario: Adding a new product
    Given that I am on the products overview page
    When I click the "Add Product" button in order to create a new product
    Then I am taken to the "Add New Product" form
    And I enter the name, weight, and starting price of the product
    And I select the expiration date for the product
    And I write a description for the product
    And I choose a category for the product
    And I add an image URL for the product
    And I click the "Submit" button to add the product

  Scenario: Checking if the cypress test worked
    Given that I am on the products overview page
    When I click on the next slide button
    Then I should be able to see the newly added product
    And I then exit the admin dashboard
    And I navigate to the auctions page
    And the new product should be visible
    And I press the "read-more" button, in order to view the details on the new product