Feature: Login
    Scenario: User enters valid details that match with an existing account
        Given I navigate to the "Home" page
        Then I open the menu drawer
        When I enter user email and password
        When I click to login button
        Then I should see the text "Hello Marco!"

    Scenario: User enters unmatched details
        Given I navigate to the "Home" page
        Then I open the menu drawer
        When I click to login button
        Then I should see the text "Invalid email address."
        Then I should see the text "Password is required."

    Scenario: User enters wrong email format and tries to submit
        Given I navigate to the "Home" page
        Then I open the menu drawer
        When I click to login button
#        Then I should see the text "Wrong email address."
