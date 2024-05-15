Feature: Flip order of auctionboxes

    Scenario: Flip the order of auctionboxes
        Given that I am on the auctionpage
        When I click on Sortera Sjunkande
        Then the boxes should be in descending order

