/// <reference types="cypress" />
import dateTimeObj from './helpers/booking.helper'

describe('Digital Tolk Tests', () => {

    it('TS-01 Navigate to Home Page', () => {
        cy.visit('https://ct.digitaltolk.se/')
        cy.contains('Logga in').eq(0).should('be.visible')
    })

    it('TS-02 Change Language', () => {
        cy.get('.language-menu').should('be.visible').click()
        cy.contains('EN').should('be.visible').click()
        cy.contains('Log in').eq(0).should('be.visible')
    })

    it('TS-03 Navigate to login page', () => {
        cy.contains('Log in').eq(0).should('be.visible').click()
        cy.url().should('include', '/login')
    })

    it('TS-04 Login with invalid credentials', () => {
        cy.get('input[placeholder="Username"]')
            .should('be.visible').type('username')
        cy.get('input[placeholder="Password"]')
            .should('be.visible').type('password')
        cy.get('.login-form__login-button').should('be.visible').click()
        cy.get('div[role="alert"]').should('be.visible').and('contain', 'The user credentials were incorrect.')
    })

    it('TS-05 Login with valid credentials', () => {
        cy.get('input[placeholder="Username"]')
            .should('be.visible').clear().type('usman@customer.dt')
        cy.get('input[placeholder="Password"]')
            .should('be.visible').clear().type('Test123$')
        cy.get('.login-form__login-button').should('be.visible').click()
        cy.get('div[role="alert"]').should('not.be.visible')
        cy.url().should('not.contain', '/login')
    })

    it('TS-06 Navigate to Booking Tab', () => {
        cy.get('input[placeholder="Select Language"]')
            .should('be.visible').click().type('Ludh', {delay: 500}).type('{enter}')
        cy.get('input[placeholder="Day"]')
            .should('be.visible').click()
        cy.get(`span[aria-label="${dateTimeObj.day}"]`)
            .should('be.visible').click()
        cy.get('input[placeholder="Start Time"]')
            .should('be.visible').click().type(dateTimeObj.startTime).type('{enter}')
        cy.contains('Physical').should('be.visible').click()
        cy.contains('Others').should('be.visible').click()
        cy.get('div[aria-live=polite] > div > div:nth-child(1)')
            .should('be.visible').click()
        cy.contains('Female Translator').should('be.visible').click()
        cy.get('div[aria-live=polite] > div > div:nth-child(2)')
            .should('be.visible').type('usman',{delay: 500})
        cy.contains('Usman Test Translator - 80899').should('be.visible').click()
        cy.get('input[name=file]').attachFile('sample.pdf') // this file is located in fixtures
        cy.get('.normal-booking-form__book-button').should('be.visible').click()
        cy.contains('Login').should('be.visible').click()
    })

    it('TS-07 Confirmation Window Test', () => {
        cy.contains('Confirmation').should('be.visible')
        cy.get('input[placeholder="Input Booker Name"]').should('be.visible').click().type('Test Booker').type('{enter}')
        cy.get('input[placeholder="Input Staff Name"]').should('be.visible').click().type('Test Staff').type('{enter}')
        cy.get('.booking-confirm-form__reference').should('be.visible').click().type('Test Reference').type('{enter}')
        cy.get('textarea[rows]').should('be.visible').click().type('Test Notes').type('{enter}')
        cy.get('.booking-confirm-form__question-fields > div > div > div > label:nth-child(1)').eq(0).click()
        cy.get('.booking-confirm-form__question-fields > div > div > div > label:nth-child(1)').eq(1).click()
        cy.contains('Change').should('be.visible').click()
        cy.get('#google_address_autocomplete').should('be.visible').click().clear().type('Centralplan 15, 111 20 ', {delay: 500}).type('{downarrow}').type('{enter}')
        cy.get('.booking-confirm-form__instructions').should('be.visible').type('this is a test input for address instructions')
        cy.contains('Create Booking').should('be.visible').click()
    })
})
