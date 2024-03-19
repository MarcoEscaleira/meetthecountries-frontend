export const pageDescriptor = {
  url: "/track",
  getTrackLink: () => cy.get("a[href='/track']"),
  getTitle: () => cy.get("[data-cy='page-header-title']"),
  getLogoTitle: () => cy.get("h1"),
  getUsernameInput: () => cy.get("input[name='username']"),
  getPasswordInput: () => cy.get("input[name='password']"),
  getFirstSigninButton: () => cy.get("button[class~=_button-login-id]"),
  getSecondSigninButton: () => cy.get("button[class~=_button-login-password]"),
};
