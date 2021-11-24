/* eslint-disable */
/// <reference types="cypress" />

describe('/workspace-metrics', function () {
    beforeEach(function () {
      cy.fixture('global-data').then((globalData) => {
        this.globalData = globalData
      })
      cy.fixture('workspace').then((workspace) => {
        this.workspace = workspace
      })
      cy.visitWorkspaceMetrics()
      cy.wait(6000)
    })
  
    it('contains greeting', function () {
      cy.contains('h4', this.globalData.testWorkspaceName + ' Metrics')
    })
    
    it('contains CPU, Memory and Storage usage charts', function () {
      cy.get('.plot-container')
        .should('have.length', 3)
    })
})