/* eslint-disable */
/// <reference types="cypress" />

describe('/deployment', function () {
    beforeEach(function () {
      cy.fixture('global-data').then((globalData) => {
        this.globalData = globalData
      })
      cy.fixture('deployment').then((deployment) => {
        this.deployment = deployment
      })
      cy.visitDeployments()
      cy.wait(6000)
    })
  
    it('displays existing deployment', function () {
      cy.contains('h4', this.deployment.testDeploymentName)
    })

    it('links to create-new-deployment', function () {
      cy.get('button[aria-label="add"]')
        .click()
      cy.url()
        .should('include', this.globalData.testWorkspaceId + '/new')
    })

    it('links to edit-deployment', function () {
        cy.get('button[id="more"]')
          .click()
        cy.contains('li[role="menuitem"]', this.deployment.editBtnText)
          .click()
        cy.url()
          .should('include', '/d/' + this.deployment.testDeploymentId + '/edit')
    })

    it('links to info-deployment', function () {
        cy.get('button[id="more"]')
          .click()
        cy.contains('li[role="menuitem"]', this.deployment.infoBtnText)
          .click()
        cy.url()
          .should('include', '/d/' + this.deployment.testDeploymentId + '/info')
    })

    it('opens delete deployment dialog', function () {
      cy.get('button[id="more"]')
        .click()
      cy.contains('li[role="menuitem"]', this.deployment.deleteBtnText)
        .click()
      cy.get('div[role="dialog"]')
        .children()
        .should('contain', this.deployment.deleteDiaglogGreeting)
    })

    it('favorites a deployment', function () {
        cy.get('button[id="more"]')
          .click()
        cy.contains('li[role="menuitem"]', this.deployment.favoriteBtnText)
          .click()
        cy.wait(3000)
        cy.get('button[id="more"]')
          .click()
        cy.contains('li[role="menuitem"]', this.deployment.unfavoriteBtnText)
          .click()
    })

    it('links to deployment proxy', function () {
      cy.get('a[href="' + '/w/' + this.globalData.testWorkspaceId + "/d/" + this.deployment.testDeploymentId +'"]')
    })    
})