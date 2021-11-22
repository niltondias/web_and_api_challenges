/// <reference types="cypress" />

import { getApiUrl, getToken } from '../support/utils'

describe('Testing Challenges', () => {
    context('UI tests', () => {

        it('Validating products and the total order', () => {
            const skus = require('../fixtures/products.json')
            let totalOrder = 0;
            let totalQuantity = skus.length

            cy.visit('https://www.amazon.com')

            Cypress.on('uncaught:exception', (err, runnable) => {
                return false
            })

            skus.forEach((sku) => {
                cy.get('#twotabsearchtextbox')
                    .clear()
                    .type(`${sku.name}`);

                cy.get('#nav-search-submit-button').click()

                cy.get(`[data-asin="${sku.id}"]`).as(`${sku.id}`)

                totalOrder += sku.price

                // Click on the product
                cy.get(`@${sku.id}`)
                    .find('.s-image')
                    .click()

                //Validating price of each product
                cy.get('#newBuyBoxPrice')
                    .should('have.text', '$' + `${sku.price.toFixed(2)}`)
                    .click()

                // Add to cart
                cy.get('#add-to-cart-button').click()

            })

            // Go to cart
            cy.get('#hlb-view-cart-announce').click();

            // Validating Total order 
            cy.get('#sc-subtotal-amount-buybox > .a-size-medium')
                .should('have.text', '$' + `${totalOrder}`);

            // Validating Total quantity 
            cy.get('#sc-subtotal-label-buybox')
                .should('contain.text', `Subtotal (${totalQuantity} items):`);
        })

    })
    context('API tests', () => {
        const apiUsers = getApiUrl('/public/v1/users')
        const authorization = getToken()

        it('Get all Users - Validanting Status code', () => {
            cy.request(
                'GET',
                apiUsers
            ).then(response => {
                console.log(response);
                expect(response.status, 'Validanting StatusCode of GET all users').equal(200)
            })
        })

        it('Create a new user', () => {
            cy.request({
                method: 'POST',
                url: apiUsers,
                headers: {
                    authorization
                },
                body: {
                    name: "Mosk Vosk",
                    gender: "male",
                    email: "mosk.vosk@bxb.com",
                    status: "active"
                }
            }).then(response => {
                console.log('User created: ', response)
            })
        })

        it('Find user by email validating status code and response content', () => {
            cy.findUserByEmail('mosk.vosk@bxb.com').then(response => {
                console.log('Search result:', response.body.data[0].id)
                expect(response.status, 'Validating statusCode of GET request').equal(200)
                expect(response.body.data[0].email, 'Validanting email searched').equal('mosk.vosk@bxb.com')
            })
        })

        it('Changing name user using PUT method, validating status code and response content', () => {
            cy.findUserByEmail('mosk.vosk@bxb.com').then(response => {
                cy.request({
                    method: 'PUT',
                    url: apiUsers + '/' + response.body.data[0].id,
                    headers: {
                        authorization
                    },
                    body: {
                        name: "Victor Volsk",
                        gender: "male",
                        email: "mosk.vosk@bxb.com",
                        status: "active"
                    }
                }).then(response => {
                    expect(response.status, 'Validating PUT status code').equal(200)
                    console.log('PUT result', response)
                    expect(response.body.data.name, 'Validanting user name after PUT').equal('Victor Volsk')
                })
            })
        })

        it('Deleting a user', () => {
            cy.findUserByEmail('mosk.vosk@bxb.com').then(response => {
                cy.request({
                    method: 'DELETE',
                    url: apiUsers + '/' + response.body.data[0].id,
                    headers: {
                        authorization
                    }
                }).then(response => {
                    expect(response.status, 'Validanting status code of deleting user').equal(204)
                })

            })
        })
    })

})