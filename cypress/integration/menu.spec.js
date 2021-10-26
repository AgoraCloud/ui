/* eslint-disable */
/// <reference types="cypress" />

describe('access to account menu', function () {
  beforeEach(function (){
    cy.fixture('menu').then((menu) => {
        this.menu = menu
    })
    cy.loginAsAdmin()
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
    cy.fixture('menu').then((menu) => {
        this.menu = menu
    })
    cy.loginAsAdmin()
  })

  it('links to workspace', function () {
    cy.get('[id=combo-box-demo]')
      .should('have.attr', 'value', this.menu.originalWorkspaceName)
      .click()
    cy.contains(this.menu.testWorkspaceName)
      .click()
    cy.url()
      .should('include', '/w/' + this.globalData.testWorkspaceId)
    cy.get('[id=combo-box-demo]')
      .should('have.attr', 'value', this.menu.testWorkspaceName)
  })
})

describe('access to side-bar via icons', function () {
  beforeEach(function (){
    cy.fixture('menu').then((menu) => {
        this.menu = menu
    })
    cy.loginAsAdmin()
  })

  it('links to deployments', function () {
    cy.url().then(url => {
        const deploymentsUrl =  url.substring(url.indexOf("/w"));
        cy.get('a[id="deployments-btn"]')
          .should('have.attr', 'href', deploymentsUrl)
    });
  })

  it('links to projects', function () {
    cy.url().then(url => {
        const projectsUrl =  url.substring(url.indexOf("/w")) + "/p";
        cy.get('a[id="projects-btn"]')
          .should('have.attr', 'href', projectsUrl)
    });
  })

  it('links to wikis', function () {
    cy.url().then(url => {
        const wikisUrl =  url.substring(url.indexOf("/w")) + "/wiki"
        cy.get('a[id="wikis-btn"]')
          .should('have.attr', 'href', wikisUrl)
    });
  })

  it('links to create-new-workspace', function () {
    cy.get('a[id="new-workspace-btn"]')
        .should('have.attr', 'href', this.menu.newWorkspaceUrl) 
  })

  it('links to edit-workspace', function () {
    cy.url().then(url => {
        const editWorkspaceUrl =  url.substring(url.indexOf("/w")) + "/edit-workspace"
        cy.get('a[id="edit-workspace-btn"]')
          .should('have.attr', 'href', editWorkspaceUrl)
    });
  })

  it('links to workspace-metrics', function () {
    cy.url().then(url => {
        const workspaceMetricsUrl =  url.substring(url.indexOf("/w")) + "/metrics"
        cy.get('a[id="workspace-metrics-btn"]')
          .should('have.attr', 'href', workspaceMetricsUrl)
    });
  })

  it('links to workspace-users', function () {
    cy.url().then(url => {
        const workspaceUsersUrl =  url.substring(url.indexOf("/w")) + "/admin/users"
        cy.get('a[id="workspace-users-btn"]')
          .should('have.attr', 'href', workspaceUsersUrl)
    });
  })

  it('links to users', function () {
    cy.get('a[id="users-btn"]')
        .should('have.attr', 'href', this.menu.usersUrl) 
  })
})

describe('access to side-bar via hamburger', function () {
  beforeEach(function (){
    cy.fixture('menu').then((menu) => {
      this.menu = menu
    })
    cy.loginAsAdmin()
    cy.get('button[id="hamburger-menu"]')
      .should('not.be.disabled')
      .click()
  })

  it('links to deployments', function () {
    cy.url().then(url => {
      const deploymentsUrl =  url.substring(url.indexOf("/w"));
      cy.contains('a[id="deployments-btn"]', this.menu.deploymentsBtnText)
        .should('have.attr', 'href', deploymentsUrl)
    });
  })

  it('links to projects', function () {
    cy.url().then(url => {
        const projectsUrl =  url.substring(url.indexOf("/w")) + "/p";
        cy.contains('a[id="projects-btn"]', this.menu.projectsBtnText)
          .should('have.attr', 'href', projectsUrl)
    });
  })

  it('links to wikis', function () {
    cy.url().then(url => {
        const wikisUrl =  url.substring(url.indexOf("/w")) + "/wiki"
        cy.contains('a[id="wikis-btn"]', this.menu.wikisBtnText)
          .should('have.attr', 'href', wikisUrl)
    });
  })

  it('links to create-new-workspace', function () {
    cy.contains('a[id="new-workspace-btn"]', this.menu.createWorkspaceBtnText)
      .should('have.attr', 'href', this.menu.newWorkspaceUrl) 
  })

  it('links to edit-workspace', function () {
    cy.url().then(url => {
        const editWorkspaceUrl =  url.substring(url.indexOf("/w")) + "/edit-workspace"
        cy.contains('a[id="edit-workspace-btn"]', this.menu.editWorkspaceBtnText)
          .should('have.attr', 'href', editWorkspaceUrl)
    });
  })

  it('links to workspace-metrics', function () {
    cy.url().then(url => {
        const workspaceMetricsUrl =  url.substring(url.indexOf("/w")) + "/metrics"
        cy.contains('a[id="workspace-metrics-btn"]', this.menu.workspaceMetricsBtnText)
          .should('have.attr', 'href', workspaceMetricsUrl)
    });
  })

  it('links to workspace-users', function () {
    cy.url().then(url => {
        const workspaceUsersUrl =  url.substring(url.indexOf("/w")) + "/admin/users"
        cy.contains('a[id="workspace-users-btn"]', this.menu.workspaceUsersBtnText)
          .should('have.attr', 'href', workspaceUsersUrl)
    });
  })

  it('links to users', function () {
    cy.contains('a[id="users-btn"]', this.menu.usersBtnText)
      .should('have.attr', 'href', this.menu.usersUrl) 
  })
})