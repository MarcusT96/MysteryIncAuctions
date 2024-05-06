Feature: Login

    Scenario: Login
        Given that I am on the "/" page
        When I click on "Logga in / registrera"
        And And I successfully log in as "rasmus@test.com" with "klezmer"
        Then I can see "Min Profil"

