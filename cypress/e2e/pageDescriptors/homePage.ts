export const homePageDescriptor = {
  url: "/",
  getStartedBtn: () => cy.get("[data-cy='get-started']"),
  menuBtn: () => cy.get("[data-cy='menu-toggle']"),
  emailLoginInput: () => cy.get("input[name='email']"),
  passwordLoginInput: () => cy.get("input[name='password']"),
};
