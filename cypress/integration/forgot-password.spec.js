/* eslint-disable */
/// <reference types="cypress" />
import Chance from 'chance';
const chance = new Chance();

describe('/forgotPassword', function () {
  const randomEmail = chance.email();

  beforeEach(function (){
    cy.visit('/forgotPassword');
    cy.fixture('global-data').then((globalData) => {
      this.globalData = globalData
    })
    cy.fixture('forgot-password').then((forgotPassword) => {
      this.forgotPassword = forgotPassword
    })
  })

  it('greets with forgot password', function () {
    cy.contains('h1', this.forgotPassword.greeting)
  })

  it('requires valid email', function () {
    cy.get('[id=email]')
      .type(this.globalData.improperEmail)
      .should('have.value', this.globalData.improperEmail)

    cy.get('[id=email-helper-text]')
      .should('contain', this.globalData.emailErrMessage)

    cy.contains('button[type="button"]', this.forgotPassword.buttonText)
      .should('be.disabled')
  })

  it('displays a success message upon successful reset', function () {
    cy.get('[id=email]')
      .type(this.globalData.email)
      .should('have.value', this.globalData.email)

    cy.contains('button[type="button"]', this.forgotPassword.buttonText)
      .should('not.be.disabled')
      .click()

    cy.get('[id^=notistack]')
      .contains('Success')
  })

  it('displays a failure message upon unsuccessful reset', function () {
    cy.get('[id=email]')
      .type(randomEmail)
      .should('have.value', randomEmail)

    cy.contains('button[type="button"]', this.forgotPassword.buttonText)
      .should('not.be.disabled')
      .click()

    cy.get('[id^=notistack]')
      .contains('Failure')
  })
})