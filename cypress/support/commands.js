import { getApiUrl, getToken } from '../support/utils'

Cypress.Commands.add('findUserByEmail', email => {
    const apiUsers = getApiUrl('/public/v1/users')
    const authorization = getToken()

    cy.request({
        method: 'GET',
        url: apiUsers,
        qs: {
            email
        },
        headers: {
            authorization
        }
    }).then(response => {
        return response
    })

})