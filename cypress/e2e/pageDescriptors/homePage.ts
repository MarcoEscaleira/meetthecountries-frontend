export const pageDescriptor = {
  url: "/track",
  getTrackLink: () => cy.get("a[href='/track']"),
  getTitle: () => cy.get("[data-cy='page-header-title']"),
  getLogoTitle: () => cy.get("h1"),
};
