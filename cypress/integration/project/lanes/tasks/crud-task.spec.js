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
      cy.wait(6000)
      cy.get('[id="addTask"]', {timeout: 6000})
        .last()
        .click()
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

describe('edit task', function () {
    beforeEach(function () {
      cy.fixture('global-data').then((globalData) => {
        this.globalData = globalData
      })
      cy.fixture('task').then((task) => {
        this.task = task
      })
      cy.openEditTaskDialog()
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

describe('delete task', function () {
    beforeEach(function () {
      cy.fixture('global-data').then((globalData) => {
        this.globalData = globalData
      })
      cy.fixture('task').then((task) => {
        this.task = task
      })
      cy.visitLanes()
      cy.wait(6000)
    })

    it('successfully deletes task', function () {

      cy.get('button[id="moreMenuTask"]:last')
        .click()

      cy.get('li[id="Delete"]:last')
        .click()
    
      cy.get('input[id=name]:last')
        .type(this.task.edit.newTaskTitle)
        .should('have.value', this.task.edit.newTaskTitle)

      cy.get('div[role="dialog"]')
        .children()
        .contains('button', this.task.deleteBtnText)
        .click({force: true})

      cy.get('h4', {timeout: 6000})
        .should('not.contain', this.task.edit.newTaskTitle)
      cy.get('p', {timeout: 6000})
        .should('not.contain', this.task.edit.newTaskDescription)
    })
})