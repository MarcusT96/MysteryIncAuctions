Feature: Search function
  Scenario: Search for auctionboxes
  Given that I am on the auctionpage
  When I search for "<searchTerm>"
  Then I should see "<searchTerm>" in aktiva Auktioner


    Examples:
      | searchTerm  |
      | poke        |
      | indossa     |
      | mystery     |
      | bergen      |
      | destination |
      | okänd       |
      | Guld        |
      | Smak        |
      | skatt       |
      | Bergens     |
      | Box         |
      | Gåva        |