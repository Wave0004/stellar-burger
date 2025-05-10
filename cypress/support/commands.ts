Cypress.Commands.add('getReduxState', (selector) =>
  cy
    .window()
    .its('store')
    .invoke('getState')
    .then(selector || ((state) => state))
);
