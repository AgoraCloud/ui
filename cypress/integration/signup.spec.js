/* eslint-disable */
/// <reference types="cypress" />
import Chance from 'chance';
const chance = new Chance();

describe('/signup', function () {
  const randomName = chance.name();
  const randomEmail = chance.email();
  const randomPassword = chance.string({ length: 8 });

  beforeEach(function (){
    cy.visit('/signup');
    cy.fixture('global-data').then((globalData) => {
      this.globalData = globalData
    })
    cy.fixture('signup').then((signup) => {
      this.signup = signup
    })
  })

  it('greets with sign up', function () {
    cy.contains('h1', this.signup.greeting)
  })

  it('links to log in', function () {
    cy.contains(this.signup.loginText)
      .should('have.attr', 'href', '/login')
  })

  it('requires valid full name', function () {
    cy.get('[id=fullName]')
      .type(this.signup.improperName)
      .should('have.value', this.signup.improperName)

    cy.get('[id=fullName-helper-text]')
      .should('contain', this.signup.nameErrMessage)

    cy.contains('button[type="button"]', this.signup.buttonText)
      .should('be.disabled')
  })

  it('requires valid email', function () {
    cy.get('[id=email]')
      .type(this.globalData.improperEmail)
      .should('have.value', this.globalData.improperEmail)

    cy.get('[id=email-helper-text]')
      .should('contain', this.globalData.emailErrMessage)

    cy.contains('button[type="button"]', this.signup.buttonText)
      .should('be.disabled')
  })

  it('requires valid password', function () {
    cy.get('[id=password]')
      .type(this.globalData.improperPassword)
      .should('have.value', this.globalData.improperPassword)

    cy.get('[id=password-helper-text]')
      .should('contain', this.signup.passwordErrMessage)

    cy.contains('button[type="button"]', this.signup.buttonText)
      .should('be.disabled')
  })

  it('requires full name, email and password', function () {
    cy.contains('button[type="button"]', this.signup.buttonText)
      .should('be.disabled')
  })

  it('displays a success message upon successful registration', function () {
    cy.get('[id=fullName]')
      .type(randomName)
      .should('have.value', randomName)

    cy.get('[id=email]')
      .type(randomEmail)
      .should('have.value', randomEmail)

    cy.get('[id=password]')
      .type(randomPassword)
      .should('have.value', randomPassword)

    cy.contains('button[type="button"]', this.signup.buttonText)
      .should('not.be.disabled')
      .click()

    cy.get('[id^=notistack]')
      .should('have.text', this.signup.successMessage)
  })

  it('displays a failure message upon unsuccessful registration', function () {
    cy.get('[id=fullName]')
      .type(this.globalData.fullName)
      .should('have.value', this.globalData.fullName)

    cy.get('[id=email]')
      .type(this.globalData.email)
      .should('have.value', this.globalData.email)

    cy.get('[id=password]')
      .type(this.globalData.password)
      .should('have.value', this.globalData.password)

    cy.contains('button[type="button"]', this.signup.buttonText)
      .should('not.be.disabled')
      .click()

    cy.get('[id^=notistack]')
      .contains("Failed to Signup")
  })
})