/* eslint-disable */
/// <reference types="cypress" />

describe('create lane: form validation and labels', function () {
    beforeEach(function () {
      cy.fixture('global-data').then((globalData) => {
        this.globalData = globalData
      })
      cy.fixture('lane').then((lane) => {
        this.lane = lane
      })
      cy.visitLanes()
      cy.wait(6000)
      cy.get('button[aria-label="add"]', {timeout: 6000})
        .last()
        .click()
    })
  
    it('dialog displays greeting, instruction, and input label', function () {
      cy.contains('h2', this.lane.create.greeting)
      cy.contains('p', this.lane.create.instruction)
      cy.contains('h6', this.lane.global.labelName)
    })
  
    it('can close create lane dialog', function () {
      cy.contains('button', this.globalData.cancelBtnText)
        .click()

      cy.get('div[role="dialog"]')
        .should('not.exist')

      cy.get('[id="form-dialog-title"]')
        .should('not.exist')
    })
  
    it('requires name', function () {
      cy.get('.MuiDialogActions-root>button')
        .eq(1)
        .should('contain', this.lane.create.createBtnText)
        .should('be.disabled')
    })
})

describe('edit lane: form validation and labels', function () {
    beforeEach(function () {
      cy.fixture('global-data').then((globalData) => {
        this.globalData = globalData
      })
      cy.fixture('lane').then((lane) => {
        this.lane = lane
      })
      cy.openEditLaneDialog()  
    })
  
    it('dialog displays greeting, instruction, and input label', function () {
      cy.contains('h2', this.lane.edit.greeting)
      cy.contains('p', this.lane.edit.instruction)
      cy.contains('h6', this.lane.global.labelName)
    })
  
    it('can close edit lane dialog', function () {
      cy.contains('button', this.globalData.cancelBtnText)
        .click()

      cy.get('div[role="dialog"]')
        .should('not.exist')

      cy.get('[id="form-dialog-title"]')
        .should('not.exist')
    })
  
    it('requires name', function () {
      cy.get('[id=name]')
        .clear()

      cy.get('.MuiDialogActions-root>button')
        .eq(1)
        .should('contain', this.lane.edit.saveBtnText)
        .should('be.disabled')
    })
})