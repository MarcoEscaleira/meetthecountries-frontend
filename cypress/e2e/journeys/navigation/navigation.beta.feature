Feature: Platform Navigation
    @smoke
    Scenario Outline: Login, navigation ( Track / Plan / Report ) and logout
        When I perform a full login with user "<userIdentifier>"
        # Header navigation
        Then I should see the text "Meet the countries" on header
