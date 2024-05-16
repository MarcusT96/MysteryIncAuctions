Feature: Product Modification

  As an admin,
  I want to edit a product from the inventory
  so that I can modify our product status.

  Scenario: Navigate to admins products management page
    Given I am on the homepage
    When I click on the "Login" button in the navigation bar
    And I fill in my email and password with valid credentials
    And I click the submit button
    Then I should be back on the homepage
    And then I click the "profile" button
    And I click on the "adminpanel" on the sidebar
    And lastly I navigates to the "products" overview page

  Scenario: Editing a product
    Given I am on the products overview page
    When I click the next button
    Then I should be able to see the product I want to edit
    And I click the edit button in order to edit the product
    And I change the name, weight, and starting price of the product
    And I change the expiration date for the product
    And I write a new description for the product
    And I click the "Update-Box" button to save the changes

  Scenario: Verifying edited product in the auction page
    Given I am on the products overview page
    When I quit out of the admin dashboard
    And I navigate to the public auctions page
    Then the edited product should be visible