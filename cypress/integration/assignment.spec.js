/// <reference types="cypress" />

describe('Digital Tolk Tests', () => {
    it('TS-01 Navigate to Home Page', () => {
        cy.visit('https://ct.digitaltolk.se/')
        cy.contains('Logga in', {timeout: 10000}).eq(0).should('be.visible')
    })

    it('TS-02 Change Language', () => {
        cy.get('.language-menu').should('be.visible').click()
        cy.contains('EN', {timeout: 5000}).should('be.visible').click()
        cy.contains('Log in', {timeout: 10000}).eq(0).should('be.visible')
    })

    it('TS-03 Navigate to login page', () => {
        cy.contains('Log in', {timeout: 10000}).eq(0).should('be.visible').click()
        cy.url().should('include', '/login')
    })

    it('TS-04 Login with invalid credentials', () => {
        cy.get('input[placeholder="Username"]', {timeout: 10000})
            .should('be.visible').type('username')
        cy.get('input[placeholder="Password"]', {timeout: 10000})
            .should('be.visible').type('password')
        cy.get('.login-form__login-button').should('be.visible').click()
        cy.get('div[role="alert"]', {timeout: 10000}).should('be.visible').and('contain', 'The user credentials were incorrect.')
    })

    it('TS-05 Login with valid credentials', () => {
        cy.get('input[placeholder="Username"]', {timeout: 10000})
            .should('be.visible').clear().type('usman@customer.dt')
        cy.get('input[placeholder="Password"]', {timeout: 10000})
            .should('be.visible').clear().type('Test123$')
        cy.get('.login-form__login-button').should('be.visible').click()
        cy.get('div[role="alert"]', {timeout: 10000}).should('not.be.visible')
        cy.url().should('not.contain', '/login')
    })
})
