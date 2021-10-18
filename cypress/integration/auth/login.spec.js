/* eslint-disable */
/// <reference types="cypress" />
import Chance from 'chance';
const chance = new Chance();

describe('/login', function () {
  const randomEmail = chance.email();
  const randomPassword = chance.string({ length: 8 });

  beforeEach(function (){
    cy.visit('/login');
    cy.fixture('global-data').then((globalData) => {
      this.globalData = globalData
    })
    cy.fixture('auth/login').then((login) => {
      this.login = login
    })
  })

  it('greets with log in', function () {
    cy.contains('h1', this.login.greeting)
  })

  it('links to sign up', function () {
    cy.contains(this.login.signupText)
      .should('have.attr', 'href', '/signup')
  })

  it('links to forgot password', function () {
    cy.contains(this.login.forgotPWText)
      .should('have.attr', 'href', '/forgotPassword')
  })

  it('requires valid email', function () {
    cy.get('[id=email]')
      .type(this.globalData.improperEmail)
      .should('have.value', this.globalData.improperEmail)

    cy.get('[id=email-helper-text]')
      .should('contain', this.globalData.emailErrMessage)

    cy.contains('button[type="submit"]', this.login.buttonText)
      .should('be.disabled')
  })

  it('requires valid password', function () {
    cy.get('[id=password]')
      .type(this.globalData.improperPassword)
      .should('have.value', this.globalData.improperPassword)

    cy.get('[id=password-helper-text]')
      .should('contain', this.globalData.passwordErrMessage)

    cy.contains('button[type="submit"]', this.login.buttonText)
      .should('be.disabled')
  })

  it('requires email and password', function () {
    cy.contains('button[type="submit"]', this.login.buttonText)
      .should('be.disabled')
  })

  it('navigates to dashboard upon successful login', function () {
    cy.get('[id=email]')
      .type(this.globalData.email)
      .should('have.value', this.globalData.email)

    cy.get('[id=password]')
      .type(this.globalData.password)
      .should('have.value', this.globalData.password)

    cy.contains('button[type="submit"]', this.login.buttonText)
      .should('not.be.disabled')
      .click()

    cy.url()
      .should('include', '/w/')
  })

  it('remains on login upon unsuccessful login', function () {
    cy.get('[id=email]')
      .type(randomEmail)
      .should('have.value', randomEmail)

    cy.get('[id=password]')
      .type(randomPassword)
      .should('have.value', randomPassword)

    cy.contains('button[type="submit"]', this.login.buttonText)
      .should('not.be.disabled')
      .click()

    cy.get('[id^=notistack]')
      .contains('Failed to Login')

    cy.url()
      .should('include', '/login')
  })
})