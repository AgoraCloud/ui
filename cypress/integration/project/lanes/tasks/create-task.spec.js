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
      cy.visitLanes()
      cy.get('[id="addTask"]', {timeout: 6000})
        .last()
        .click()
    })
  
    it('dialog displays greeting, instruction, and input labels', function () {
      cy.contains('h2', this.task.create.greeting)
      cy.contains('p', this.task.create.instruction)
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
      cy.get('.MuiDialogActions-root>button')
        .eq(1)
        .should('contain', this.task.create.createBtnText)
        .should('be.disabled')
    })

    it('successfully creates new task', function () {
      cy.get('[id=title]')
        .type(this.task.create.newTaskTitle)
        .should('have.value', this.task.create.newTaskTitle)
        
      cy.get('[id=description]')
        .type(this.task.create.newTaskDescription)
        .should('have.value', this.task.create.newTaskDescription)

      cy.get('.MuiDialogActions-root>button')
        .eq(1)
        .should('contain', this.task.create.createBtnText)
        .should('not.be.disabled')
        .click()

      cy.contains('h4', this.task.create.newTaskTitle)
      cy.contains('p', this.task.create.newTaskDescription)
    })
})