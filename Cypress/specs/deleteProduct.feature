Feature: Product Deletion

  As an admin,
  I want to be able to delete products from the inventory
  so that I can remove products that are no longer available or relevant.

  Scenario: Navigate to admins products management page
    Given that I am on the "/" page
    When I click the "signin" in the navbar
    Then I enter my admin "email"
    And I also enter my "password"
    And I click the "login" button
    And then I click the "profile" button
    And I click on the "adminpanel" on the sidebar
    And lastly I navigates to the "products" overview page

  Scenario: Deleting a product
    Given I am on the products overview page
    When I click the next button
    Then I should be able to see the product I want to delete
    And I click the delete button to remove the product

  Scenario: Verifying deletion in the auction page
    Given I am on the products overview page
    When I exit the admin dashboard
    And I navigate to the public auctions page
    Then the deleted product should not be visible