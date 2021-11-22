/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        /**
        * @param email    - User e-mail to find
        * @returns User id from the API
        */
        findUserByEmail(email: string): object | Cypress.Chainable<Cypress.Response<any>>
    }
}
