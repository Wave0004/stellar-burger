declare namespace Cypress {
  interface Chainable {
    getReduxState(): Chainable<any>;
    getReduxState(selector: (state: any) => any): Chainable<any>;
  }
}
