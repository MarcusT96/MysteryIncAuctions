Feature: Contact Us

  Scenario: Navigate to Contact Us page and send a message
    Given I am on the homepage
    When I click on Contact Us
    Then I can fill in my name, email and message
    Then I can submit my message
