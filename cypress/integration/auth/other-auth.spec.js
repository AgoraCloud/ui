/* eslint-disable */
/// <reference types="cypress" />
import Chance from 'chance';
const chance = new Chance();

describe('/verify-account', function () {
  beforeEach(function (){
    cy.visit('/verify-account');
    cy.fixture('auth').then((auth) => {
        this.auth = auth
    })
  })

  it('greets with error', function () {
    cy.contains('p', this.auth.verifyAccount.errTokenGreeting)
  })

  it('links to log in', function () {
    cy.contains('a', this.auth.verifyAccount.buttonText)
      .should('have.attr', 'href', '/login')
  })
})

describe('/change-password', function () {
  const randomPassword = chance.string({ length: 8 });
  beforeEach(function (){
    cy.visit('/change-password');
    cy.fixture('global-data').then((globalData) => {
        this.globalData = globalData
    })
    cy.fixture('auth').then((auth) => {
        this.auth = auth
    })
  })

  it('greets with change password', function () {
    cy.contains('p', this.auth.changePassword.greeting)
  })

  it('requires valid password', function () {
    cy.get('[id=password]')
      .type(this.globalData.improperPassword)
      .should('have.value', this.globalData.improperPassword)

    cy.get('[id=password-helper-text]')
      .should('contain', this.globalData.passwordErrMessage)

    cy.contains('button[type="button"]', this.auth.changePassword.buttonText)
      .should('be.disabled')
  })

  it('requires valid confirm password', function () {
    cy.get('[id=confirmPassword]')
      .type(this.globalData.improperPassword)
      .should('have.value', this.globalData.improperPassword)

    cy.contains('button[type="button"]', this.auth.changePassword.buttonText)
      .should('be.disabled')
  })

  it('requires password and confirm password', function () {
    cy.contains('button[type="button"]', this.auth.changePassword.buttonText)
      .should('be.disabled')
  })

  it('requires both password and confirm password to match', function () {
    cy.get('[id=password]')
      .type(this.globalData.password)
      .should('have.value', this.globalData.password)
      
    cy.get('[id=confirmPassword]')
      .type(randomPassword)
      .should('have.value', randomPassword)

    cy.contains('button[type="button"]', this.auth.changePassword.buttonText)
      .should('be.disabled')
  })

  it('requires mongodb id as a token for successful password change', function () {
    cy.get('[id=password]')
      .type(this.globalData.password)
      .should('have.value', this.globalData.password)
      
    cy.get('[id=confirmPassword]')
      .type(this.globalData.password)
      .should('have.value', this.globalData.password)

    cy.contains('button[type="button"]', this.auth.changePassword.buttonText)
      .should('not.be.disabled')
      .click()

    cy.get('[id^=notistack]')
      .should('have.text', this.auth.changePassword.errTokenMessage)
  })
})