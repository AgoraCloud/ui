/* eslint-disable */
/// <reference types="cypress" />
import Chance from 'chance';
const chance = new Chance();

describe('/verify-account', function () {
  beforeEach(function (){
    cy.visit('/verify-account');
    cy.fixture('auth/verify-account').then((verifyAccount) => {
        this.verifyAccount = verifyAccount
    })
  })

  it('greets with error', function () {
    cy.contains('p', this.verifyAccount.errTokenGreeting)
  })

  it('links to log in', function () {
    cy.contains('a', this.verifyAccount.buttonText)
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
    cy.fixture('auth/change-password').then((changePassword) => {
        this.changePassword = changePassword
    })
  })

  it('greets with change password', function () {
    cy.contains('p', this.changePassword.greeting)
  })

  it('requires valid password', function () {
    cy.get('[id=password]')
      .type(this.globalData.improperPassword)
      .should('have.value', this.globalData.improperPassword)

    cy.get('[id=password-helper-text]')
      .should('contain', this.globalData.passwordErrMessage)

    cy.contains('button[type="button"]', this.changePassword.buttonText)
      .should('be.disabled')
  })

  it('requires valid confirm password', function () {
    cy.get('[id=confirmPassword]')
      .type(this.globalData.improperPassword)
      .should('have.value', this.globalData.improperPassword)

    cy.contains('button[type="button"]', this.changePassword.buttonText)
      .should('be.disabled')
  })

  it('requires password and confirm password', function () {
    cy.contains('button[type="button"]', this.changePassword.buttonText)
      .should('be.disabled')
  })

  it('requires both password and confirm password to match', function () {
    cy.get('[id=password]')
      .type(this.globalData.password)
      .should('have.value', this.globalData.password)
      
    cy.get('[id=confirmPassword]')
      .type(randomPassword)
      .should('have.value', randomPassword)

    cy.contains('button[type="button"]', this.changePassword.buttonText)
      .should('be.disabled')
  })

  it('requires mongodb id as a token for successful password change', function () {
    cy.get('[id=password]')
      .type(this.globalData.password)
      .should('have.value', this.globalData.password)
      
    cy.get('[id=confirmPassword]')
      .type(this.globalData.password)
      .should('have.value', this.globalData.password)

    cy.contains('button[type="button"]', this.changePassword.buttonText)
      .should('not.be.disabled')
      .click()

    cy.get('[id^=notistack]')
      .should('have.text', this.changePassword.errTokenMessage)
  })
})