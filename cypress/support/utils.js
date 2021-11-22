/// <reference types="cypress" />

/**
 * 
 * @param target - part of url to be target 
 * @returns - The base url with target
 */
const getApiUrl = target => Cypress.env('API_BASE_URL') + target

const getToken = () => `Bearer ${Cypress.env('PERSONAL_TOKEN')}`

export { getApiUrl, getToken }