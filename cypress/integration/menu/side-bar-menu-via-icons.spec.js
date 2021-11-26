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
  })

  it('links to deployments', function () {
    const deploymentsUrl = "/w/" + this.globalData.testWorkspaceId;
    cy.get('a[id="deployments-btn"]')
      .should('have.attr', 'href', deploymentsUrl)
  })

  it('links to projects', function () {
    const projectsUrl = "/w/" + this.globalData.testWorkspaceId + "/p";
    cy.get('a[id="projects-btn"]')
      .should('have.attr', 'href', projectsUrl)
  })

  it('links to wikis', function () {
    const wikisUrl = "/w/" + this.globalData.testWorkspaceId + "/wiki"
    cy.get('a[id="wikis-btn"]')
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
  })

  it('links to create-new-workspace', function () {
    cy.get('a[id="new-workspace-btn"]')
      .should('have.attr', 'href', this.menu.newWorkspaceUrl) 
  })

  it('links to edit-workspace', function () {
    const editWorkspaceUrl = "/w/" + this.globalData.testWorkspaceId + "/edit-workspace"
    cy.get('a[id="edit-workspace-btn"]')
      .should('have.attr', 'href', editWorkspaceUrl)
  })

  it('links to workspace-metrics', function () {
    const workspaceMetricsUrl = "/w/" + this.globalData.testWorkspaceId + "/metrics"
    cy.get('a[id="workspace-metrics-btn"]')
      .should('have.attr', 'href', workspaceMetricsUrl)
  })

  it('links to workspace-users', function () {
    const workspaceUsersUrl = "/w/" + this.globalData.testWorkspaceId + "/admin/users"
    cy.get('a[id="workspace-users-btn"]')
      .should('have.attr', 'href', workspaceUsersUrl)
  })

  it('links to users', function () {
    cy.get('a[id="users-btn"]')
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
  })

  it('links to users', function () {
    cy.get('a[id="users-btn"]')
      .should('have.attr', 'href', this.menu.usersUrl) 
  })
})