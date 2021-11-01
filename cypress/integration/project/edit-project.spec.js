/* eslint-disable */
/// <reference types="cypress" />

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
  
    it('displays greeting and input labels', function () {
      cy.contains('h4', this.project.edit.greeting)
      cy.contains('h6', this.project.global.labelName)
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
        .clear()
        .type(this.project.global.improperName)
        .should('have.value', this.project.global.improperName)
  
      cy.get('[id=name-helper-text]')
        .should('contain', this.project.global.nameErrMessage)
  
      cy.contains('button[type="button"]', this.project.edit.saveBtnText)
        .should('be.disabled')
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