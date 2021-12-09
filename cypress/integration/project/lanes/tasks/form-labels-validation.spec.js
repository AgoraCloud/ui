/* eslint-disable */
/// <reference types="cypress" />

describe('create task: form validation and labels', function () {
    beforeEach(function () {
      cy.fixture('global-data').then((globalData) => {
        this.globalData = globalData
      })
      cy.fixture('task').then((task) => {
        this.task = task
      })
      cy.visitLanes()
      cy.wait(6000)
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
})

describe('edit task: form validation and labels', function () {
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
})