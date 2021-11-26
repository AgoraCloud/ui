/* eslint-disable */
/// <reference types="cypress" />

describe('/deployment-info', function () {
    beforeEach(function () {
      cy.fixture('global-data').then((globalData) => {
        this.globalData = globalData
      })
      cy.fixture('deployment').then((deployment) => {
        this.deployment = deployment
      })
      cy.visitDeploymentInfo()
      cy.wait(6000)
    })
  
    it('contains greeting and labels', function () {
      cy.contains('h3', 'Deployment: ' + this.deployment.testDeploymentName) 
      cy.contains('h4', 'Metrics')
      cy.contains('h4', 'Logs')
    })
    
    it('contains CPU and Memory usage charts', function () {
      cy.get('.plot-container')
        .should('have.length', 2)
    }) 

    it('contains logs', function () {
      cy.get('[id="deploymentLogs"]')
    })
})

describe('/deployment-proxy', function () {
    beforeEach(function () {
      cy.fixture('global-data').then((globalData) => {
        this.globalData = globalData
      })
      cy.fixture('deployment').then((deployment) => {
        this.deployment = deployment
      })
      cy.visitDeploymentProxy()
      cy.wait(6000)
    })
  
    it('contains deployment iframe', function () {
      cy.get('iframe[src="' + this.deployment.proxyUrl + '"]')
    })   
})