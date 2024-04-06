/*
  RTL descriptors and commands
*/
export function findByText(text: string) {
  return cy.findAllByText(new RegExp(text));
}

export function clickOnText(text: string) {
  return cy.findAllByText(new RegExp(text)).click();
}

export function textPresence(text: string) {
  findByText(text);
}
