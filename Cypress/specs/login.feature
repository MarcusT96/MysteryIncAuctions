Feature: Navigate around the user page

    Scenario: Navigate through different sections of the user page after logging in
        Given I am logged in and on the homepage
        When I navigate to the profile page
        Then I should see my profile information
        Then I go to my payment options page
        Then I go to my reviews page
        Then I go to my orders page
        Then I go to my My Information page
