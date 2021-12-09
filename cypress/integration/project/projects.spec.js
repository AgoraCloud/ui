/* eslint-disable */
/// <reference types="cypress" />

describe('/project', function () {
  beforeEach(function () {
    cy.fixture('global-data').then((globalData) => {
      this.globalData = globalData
    })
    cy.fixture('project').then((project) => {
      this.project = project
    })
    cy.visitProjects()
    cy.wait(6000)
  })

  it('greets with project', function () {
    cy.contains('h4', this.project.greeting)
  })

  it('contains list of projects', function () {
    cy.get('table')
      .children()
      .should('contain', this.project.global.labelName)
      .and('contain', this.project.global.labelDescription)
  })

  it('displays existing project with name and description', function () {
    cy.get('table')
      .children()
      .should('contain', this.project.testProjectName)
      .and('contain', this.project.testProjectDescription)
  })

  it('links to project', function () {
    cy.contains('button', this.project.testProjectName)
      .click()
    cy.url()
      .should('include', '/p/' + this.project.testProjectId + '/lanes')
  })

  it('links to create-new-project', function () {
    cy.get('button[aria-label="add"]')
      .click()
    cy.url()
      .should('include', this.globalData.testWorkspaceId + '/p/new')
  })

  it('links to edit-project', function () {
    cy.get('button[aria-label="more"]')
      .last()
      .click()
    cy.contains('li[role="menuitem"]', this.project.editBtnText)
      .click({force: true})
    cy.url()
      .should('include', '/p/' + this.project.testProjectId + '/edit')
  })

  it('opens delete project dialog', function () {
    cy.get('button[aria-label="more"]')
      .last()
      .click()
    cy.contains('li[role="menuitem"]', this.project.deleteBtnText)
      .click({force: true})
    cy.get('div[role="dialog"]')
      .children()
      .should('contain', this.project.deleteDiaglogGreeting)
  })
})