/* eslint-disable */
/// <reference types="cypress" />

describe('access to side-bar section 1 via hamburger', function () {
    beforeEach(function (){
      cy.fixture('global-data').then((globalData) => {
        this.globalData = globalData
      })
      cy.fixture('menu').then((menu) => {
        this.menu = menu
      })
      cy.loginAsAdmin()
      cy.visit('/')
      cy.wait(6000)
      cy.get('button[id="hamburger-menu"]')
        .should('not.be.disabled')
        .click()
    })
  
    it('links to deployments, projects, and wikis', function () {
      const deploymentsUrl = "/w/" + this.globalData.testWorkspaceId;
      cy.contains('a[id="deployments-btn"]', this.menu.deploymentsBtnText)
        .should('have.attr', 'href', deploymentsUrl)
      const projectsUrl = "/w/" + this.globalData.testWorkspaceId + "/p";
      cy.contains('a[id="projects-btn"]', this.menu.projectsBtnText)
        .should('have.attr', 'href', projectsUrl)
      const wikisUrl = "/w/" + this.globalData.testWorkspaceId + "/wiki"
      cy.contains('a[id="wikis-btn"]', this.menu.wikisBtnText)
        .should('have.attr', 'href', wikisUrl)
    })
})
  
describe('access to side-bar section 2 via hamburger', function () {
    beforeEach(function (){
      cy.fixture('global-data').then((globalData) => {
        this.globalData = globalData
      })
      cy.fixture('menu').then((menu) => {
        this.menu = menu
      })
      cy.loginAsAdmin()
      cy.visit('/')
      cy.wait(6000)
      cy.get('button[id="hamburger-menu"]')
        .should('not.be.disabled')
        .click()
    })
  
    it('links to create-new-workspace, edit-workspace, workspace-metrics and workspace-users', function () {
      cy.contains('a[id="new-workspace-btn"]', this.menu.createWorkspaceBtnText)
        .should('have.attr', 'href', this.menu.newWorkspaceUrl) 
      const editWorkspaceUrl = "/w/" + this.globalData.testWorkspaceId + "/edit"
      cy.contains('a[id="edit-workspace-btn"]', this.menu.editWorkspaceBtnText)
        .should('have.attr', 'href', editWorkspaceUrl)
      const workspaceMetricsUrl = "/w/" + this.globalData.testWorkspaceId + "/metrics"
      cy.contains('a[id="workspace-metrics-btn"]', this.menu.workspaceMetricsBtnText)
        .should('have.attr', 'href', workspaceMetricsUrl)
      const workspaceUsersUrl = "/w/" + this.globalData.testWorkspaceId + "/admin/users"
      cy.contains('a[id="workspace-users-btn"]', this.menu.workspaceUsersBtnText)
        .should('have.attr', 'href', workspaceUsersUrl)
    })
})
  
describe('access to side-bar section 3 via hamburger', function () {
    beforeEach(function (){
      cy.fixture('global-data').then((globalData) => {
        this.globalData = globalData
      })
      cy.fixture('menu').then((menu) => {
        this.menu = menu
      })
      cy.loginAsAdmin()
      cy.visit('/')
      cy.wait(6000)
      cy.get('button[id="hamburger-menu"]')
        .should('not.be.disabled')
        .click()
    })
  
    it('links to users', function () {
      cy.contains('a[id="users-btn"]', this.menu.usersBtnText)
        .should('have.attr', 'href', this.menu.usersUrl) 
    })
})