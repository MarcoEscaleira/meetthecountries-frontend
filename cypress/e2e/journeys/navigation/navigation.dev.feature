Feature: Platform Navigation
    @e2e
    Scenario Outline: View the app logged out
        When I go to url "/"
        # Header navigation
        Then I should see the text "Meet The Countries"
