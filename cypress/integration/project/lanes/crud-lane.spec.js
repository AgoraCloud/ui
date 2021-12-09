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
      cy.visitLanes()
      cy.wait(6000)
      cy.get('button[aria-label="add"]', {timeout: 6000})
        .last()
        .click()
    })

    it('successfully creates new lane', function () {
      cy.get('[id=name]')
        .type(this.lane.create.newLaneName)
        .should('have.value', this.lane.create.newLaneName)

      cy.get('.MuiDialogActions-root>button')
        .eq(1)
        .should('contain', this.lane.create.createBtnText)
        .should('not.be.disabled')
        .click()

      cy.contains('h5', this.lane.create.newLaneName, {timeout: 6000})
    })
})

describe('edit lane', function () {
    beforeEach(function () {
      cy.fixture('global-data').then((globalData) => {
        this.globalData = globalData
      })
      cy.fixture('lane').then((lane) => {
        this.lane = lane
      })
      cy.openEditLaneDialog()  
    })

    it('successfully edits lane', function () {
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

describe('delete lane', function () {
    beforeEach(function () {
      cy.fixture('global-data').then((globalData) => {
        this.globalData = globalData
      })
      cy.fixture('lane').then((lane) => {
        this.lane = lane
      })
      cy.visitLanes()
      cy.wait(6000)
    })

    it('successfully deletes lane', function () {
      cy.get('button[id="more"]:last')
        .click()

      cy.get('li[id="Delete"]:last')
        .click()
    
      cy.get('input[id=name]:last')
        .type(this.lane.edit.newLaneName)
        .should('have.value', this.lane.edit.newLaneName)

      cy.get('div[role="dialog"]')
        .children()
        .contains('button', this.lane.deleteBtnText)
        .click({force: true})

      cy.get('h5', {timeout: 6000})
        .should('not.contain', this.lane.edit.newLaneName)
    })
})