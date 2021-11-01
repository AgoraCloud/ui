/* eslint-disable */
/// <reference types="cypress" />

describe('create lane', function () {
    beforeEach(function () {
      cy.fixture('global-data').then((globalData) => {
        this.globalData = globalData
      })
      cy.fixture('lane').then((lane) => {
        this.lane = lane
      })
      cy.visitEditLane()  
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

    it('successfully creates new lane', function () {
      cy.get('[id=name]')
        .clear()
        .type(this.lane.edit.newLaneName)
        .should('have.value', this.lane.edit.newLaneName)

      cy.get('.MuiDialogActions-root>button')
        .eq(1)
        .should('contain', this.lane.edit.saveBtnText)
        .should('not.be.disabled')
        .click()

      cy.contains('h5', this.lane.edit.newLaneName, {timeout: 6000})
    })
})