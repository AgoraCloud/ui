/* eslint-disable */
/// <reference types="cypress" />

describe('create project', function () {
    beforeEach(function () {
      cy.fixture('global-data').then((globalData) => {
        this.globalData = globalData
      })
      cy.fixture('project').then((project) => {
        this.project = project
      })
      cy.visitCreateNewProject()
      cy.wait(6000)
    })

    it('successfully creates new project', function () {
      cy.get('[id=name]')
        .type(this.project.create.newProjectName)
        .should('have.value', this.project.create.newProjectName)

      cy.get('[id=description]')
        .type(this.project.create.newProjectDescription)
        .should('have.value', this.project.create.newProjectDescription)

      cy.contains('button[type="button"]', this.project.create.createBtnText)
        .should('not.be.disabled')
        .click()

      cy.url()
        .should('include', '/w/' + this.globalData.testWorkspaceId + '/p')

      cy.get('table')
        .children()
        .should('contain', this.project.create.newProjectName)
        .and('contain', this.project.create.newProjectDescription)
    })
  })

describe('edit project', function () {
    beforeEach(function () {
      cy.fixture('global-data').then((globalData) => {
        this.globalData = globalData
      })
      cy.fixture('project').then((project) => {
        this.project = project
      })
      cy.visitEditProject()
    })

    it('successfully edits project', function () {
      cy.get('[id=name]')
        .clear()
        .type(this.project.edit.newProjectName)
        .should('have.value', this.project.edit.newProjectName)

      cy.get('[id=description]')
        .clear()
        .type(this.project.edit.newProjectDescription)
        .should('have.value', this.project.edit.newProjectDescription)

      cy.contains('button[type="button"]', this.project.edit.saveBtnText)
        .should('not.be.disabled')
        .click()

      cy.url()
        .should('include', '/w/' + this.globalData.testWorkspaceId + '/p')

      cy.get('table')
        .children()
        .should('contain', this.project.edit.newProjectName)
        .and('contain', this.project.edit.newProjectDescription)
    })
  })

describe('delete project', function () {
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
  
    it('successfully deletes project', function () {
      cy.get('button[id="more"]:last')
        .click()

      cy.get('li[id="Delete"]:last')
        .click()
    
      cy.get('input[id=name]:last')
        .type(this.project.edit.newProjectName)
        .should('have.value', this.project.edit.newProjectName)

      cy.get('div[role="dialog"]')
        .children()
        .contains('button', this.project.deleteBtnText)
        .click({force: true})

      cy.get('table', {timeout: 9000})
        .children()
        .should('not.contain', this.project.edit.newProjectName)
        .and('not.contain', this.project.edit.newProjectDescription)
    })
})