/* eslint-disable */
/// <reference types="cypress" />

describe('access to side-bar section 1', function () {
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
  })

  it('links to deployments, projects, wikis', function () {
    const deploymentsUrl = "/w/" + this.globalData.testWorkspaceId;
    cy.get('a[id="deployments-btn"]', {timeout: 9000})
      .should('have.attr', 'href', deploymentsUrl)
    const projectsUrl = "/w/" + this.globalData.testWorkspaceId + "/p";
    cy.get('a[id="projects-btn"]', {timeout: 9000})
      .should('have.attr', 'href', projectsUrl)
    const wikisUrl = "/w/" + this.globalData.testWorkspaceId + "/wiki"
    cy.get('a[id="wikis-btn"]', {timeout: 9000})
      .should('have.attr', 'href', wikisUrl)
  })
})

describe('access to side-bar section 2', function () {
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
  })

  it('links to create-new-workspace, edit-workspace, workspace-metrics, workspace-users and workspace-users', function () {
    cy.get('a[id="new-workspace-btn"]', {timeout: 9000})
      .should('have.attr', 'href', this.menu.newWorkspaceUrl) 
    const editWorkspaceUrl = "/w/" + this.globalData.testWorkspaceId + "/edit"
    cy.get('a[id="edit-workspace-btn"]', {timeout: 9000})
      .should('have.attr', 'href', editWorkspaceUrl)
    const workspaceMetricsUrl = "/w/" + this.globalData.testWorkspaceId + "/metrics"
    cy.get('a[id="workspace-metrics-btn"]', {timeout: 9000})
      .should('have.attr', 'href', workspaceMetricsUrl)
    const workspaceUsersUrl = "/w/" + this.globalData.testWorkspaceId + "/admin/users"
    cy.get('a[id="workspace-users-btn"]', {timeout: 9000})
      .should('have.attr', 'href', workspaceUsersUrl)
    cy.get('a[id="users-btn"]', {timeout: 9000})
    .should('have.attr', 'href', this.menu.usersUrl) 
  })
})

describe('access to side-bar section 3', function () {
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
  })

  it('links to users', function () {
    cy.get('a[id="users-btn"]', {timeout: 9000})
      .should('have.attr', 'href', this.menu.usersUrl) 
  })
})