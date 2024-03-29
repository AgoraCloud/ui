/* eslint-disable */
/// <reference types="cypress" />

describe('create-project page: form validation and labels', function () {
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
  
    it('displays greeting and input labels', function () {
      cy.contains('h4', this.project.create.greeting)
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
        .type(this.project.global.improperName)
        .should('have.value', this.project.global.improperName)
  
      cy.get('[id=name-helper-text]')
        .should('contain', this.project.global.nameErrMessage)
  
      cy.contains('button[type="button"]', this.project.create.createBtnText)
        .should('be.disabled')
    })
  })

describe('edit-project page: form validation and labels', function () {
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
  })