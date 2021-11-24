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
    })
  
    it('greets with Create Project', function () {
      cy.contains('h4', this.project.create.greeting)
    })
  
    it('contains input label for name', function () {
      cy.contains('h6', this.project.global.labelName)
    })

    it('contains input label for description', function () {
      cy.contains('h6', this.project.global.labelDescription)
    })

    it('links to projects page', function () {
      cy.contains('button', this.globalData.cancelBtnText)
        .click()
      cy.url()
        .should('include', '/w/' + this.globalData.testWorkspaceId + '/p')
    })

    it('requires valid name', function () {
      cy.get('[id=name]')
        .type(this.project.global.improperName)
        .should('have.value', this.project.global.improperName)
  
      cy.get('[id=name-helper-text]')
        .should('contain', this.project.global.nameErrMessage)
  
      cy.contains('button[type="button"]', this.project.create.createBtnText)
        .should('be.disabled')
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