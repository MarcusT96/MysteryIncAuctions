Feature: Product Modification

  As an admin,
  I want to edit a product from the inventory
  so that I can modify our product status.

  Scenario: Navigate to admins products management page
    Given that I am on the "/" page
    When I click the "signin" in the navbar
    Then I enter my admin "email"
    And I also enter my "password"
    And I click the "login" button
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
    And I choose a different category for the product
    And I click the "Update-Box" button to save the changes

  Scenario: Verifying edited product in the auction page
    Given I am on the products overview page
    When I quit out of the admin dashboard
    And I navigate to the public auctions page
    Then the edited product should be visible