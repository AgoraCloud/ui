/* eslint-disable */
/// <reference types="cypress" />
import * as data from "../fixtures/global-data.json"

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginAsAdmin', () => { 
    cy.visit('/login');

    cy.get('[id=email]')
      .type(data.email)
      .should('have.value', data.email)

    cy.get('[id=password]')
      .type(data.password)
      .should('have.value', data.password)

    cy.get('button[type="submit"]')
      .contains('Log In')
      .click()

    cy.url()
      .should('include', '/w/')
 })
