Feature: App Navigation
    Scenario: View the landing page information
        Given I navigate to the "Home" page
        Then I should see the text "Meet the Countries"
        Then I should see the text "Embark on an exciting journey with us to explore uncharted territories and discover countries like never before."
        Then I should see the text "Are you ready for the adventure?"
        Then I should see the text "Get started"

    Scenario: View the side bar drawer
        Given I navigate to the "Home" page
        Then I open the menu drawer
        Then I should see the text "Hello explorer!"
        Then I should see the text "Get started and login to your account"
        Then I should see the text "Game"
        Then I should see the text "About"
        Then I should see the text "Sign in"
        Then I should see the text "Not registered?"

    Scenario: View the about page
        Given I navigate to the "Home" page
        Then I open the menu drawer
        Then I click on the text "About"
        Then I should see the text "About"
        Then I should see the text "Personal motivations"
        Then I should see the text "The idea behind MTC"

    Scenario: View the game page through the side bar drawer
        Given I navigate to the "Home" page
        Then I open the menu drawer
        Then I click on the text "Game"
        Then I should see the text "Begin by choosing a country"

    Scenario: View the game page through the get started button
        Given I navigate to the "Home" page
        Then I open the menu drawer
        Then I click on the text "Game"
        Then I should see the text "Begin by choosing a country"
