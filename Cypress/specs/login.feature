Feature: Payment options

    Scenario: Login
        Given that I am on the "/" page
        When I click on "Logga in / registrera"
        And And I successfully log in as "rasmus@test.com" with "klezmer"
        Then I can see "Min Profil"

    Scenario: Add payment option
        Given that I am on the "/" page
        And I am logged in
        When I click on "Min Profil"
        And I click on

