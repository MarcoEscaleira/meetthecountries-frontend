Feature: Register
    Scenario: User enters valid details to create a new account
        Given the user is on the register page
        When the user enters all form required details
        Then user submits the register form
        Then I should see the text "Get started and login to your account"

    Scenario: User enters incorrect details or missing mandatory fields
        Given the user is on the register page
        Then user submits the register form
        Then the form displays the required errors
