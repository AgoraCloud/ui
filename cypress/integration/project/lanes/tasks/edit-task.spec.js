/* eslint-disable */
/// <reference types="cypress" />

describe('create task', function () {
    beforeEach(function () {
      cy.fixture('global-data').then((globalData) => {
        this.globalData = globalData
      })
      cy.fixture('task').then((task) => {
        this.task = task
      })
      cy.openEditTaskDialog()
    })
  
    it('dialog displays greeting, instruction, and input labels', function () {
      cy.contains('h2', this.task.edit.greeting)
      cy.contains('p', this.task.edit.instruction)
      cy.contains('h6', this.task.global.labelTitle)
      cy.contains('h6', this.task.global.labelDescription)
    })
  
    it('can close create task dialog', function () {
      cy.contains('button', this.globalData.cancelBtnText)
        .click()

      cy.get('div[role="dialog"]')
        .should('not.exist')

      cy.get('[id="form-dialog-title"]')
        .should('not.exist')
    })
  
    it('requires title', function () {
      cy.get('[id=title]')
        .clear()

      cy.get('.MuiDialogActions-root>button')
        .eq(1)
        .should('contain', this.task.edit.saveBtnText)
        .should('be.disabled')
    })

    it('successfully edits task', function () {
      cy.get('[id=title]')
        .clear()
        .type(this.task.edit.newTaskTitle)
        .should('have.value', this.task.edit.newTaskTitle)

      cy.get('[id=description]')
        .clear()
        .type(this.task.edit.newTaskDescription)
        .should('have.value', this.task.edit.newTaskDescription)

      cy.get('.MuiDialogActions-root>button')
        .eq(1)
        .should('contain', this.task.edit.saveBtnText)
        .should('not.be.disabled')
        .click()

      cy.contains('h4', this.task.edit.newTaskTitle)
      cy.contains('p', this.task.edit.newTaskDescription)
    })
})