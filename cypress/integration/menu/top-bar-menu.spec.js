/* eslint-disable */
/// <reference types="cypress" />

describe('access to account menu', function () {
    beforeEach(function (){
      cy.fixture('menu').then((menu) => {
          this.menu = menu
      })
      cy.loginAsAdmin()
      cy.visit('/')
      cy.get('button[id="account-btn"]')
        .should('not.be.disabled')
        .click()
    })
  
    it('links to my-profile', function () {
      cy.contains(this.menu.myProfileBtnText)
        .should('have.attr', 'href', this.menu.editProfileUrl)
    })
  
    it('logs user out', function () {
      cy.contains(this.menu.signOutBtnText)
        .click()
      cy.url()
        .should('include', '/login')
    })
})
  
describe('access to workspace select menu', function () {
    beforeEach(function (){
      cy.fixture('global-data').then((globalData) => {
          this.globalData = globalData
      })
      cy.loginAsAdmin()
      cy.visit('/')
    })

    it('links to workspace', function () {
      cy.get('[id=combo-box-demo]')
        .should('have.attr', 'value', this.globalData.testWorkspaceName)
        .click()
      cy.contains(this.globalData.testWorkspaceName)
        .click()
      cy.url()
        .should('include', '/w/' + this.globalData.testWorkspaceId)
      cy.get('[id=combo-box-demo]')
        .should('have.attr', 'value', this.globalData.testWorkspaceName)
    })
})