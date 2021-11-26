/* eslint-disable */
/// <reference types="cypress" />

describe('create-workspace form labels', function () {
    beforeEach(function () {
      cy.fixture('global-data').then((globalData) => {
        this.globalData = globalData
      })
      cy.fixture('workspace').then((workspace) => {
        this.workspace = workspace
      })
      cy.visitCreateWorkspace()
      cy.wait(6000)
    })
  
    it('contains greeting and labels', function () {
      cy.contains('h4', this.workspace.create.greeting)
      cy.contains('p', this.workspace.create.instruction)
      cy.contains('h6', this.workspace.global.labelResources)
      cy.contains('p', this.workspace.create.resourceInstruction)
    })
})

describe('edit-workspace form labels', function () {
  beforeEach(function () {
    cy.fixture('global-data').then((globalData) => {
      this.globalData = globalData
    })
    cy.fixture('workspace').then((workspace) => {
      this.workspace = workspace
    })
    cy.visitEditWorkspace()
    cy.wait(6000)
  })

  it('contains greeting and labels', function () {
    cy.contains('h4', this.workspace.edit.greeting)
    cy.contains('h6', this.workspace.global.labelResources)
    cy.contains('p', this.workspace.edit.resourceInstruction)
  })
})

describe('workspace forms validation', function () {
    beforeEach(function () {
      cy.fixture('global-data').then((globalData) => {
        this.globalData = globalData
      })
      cy.fixture('workspace').then((workspace) => {
        this.workspace = workspace
      })
      cy.visitCreateWorkspace()
      cy.wait(6000)
    })
    
    it('requires valid name', function () {
      cy.get('[id=name]')
        .type(this.workspace.global.improperName)
        .should('have.value', this.workspace.global.improperName)
  
      cy.get('[id=name-helper-text]')
        .should('contain', this.workspace.global.nameErrMessage)
  
      cy.contains('button[type="button"]', this.workspace.create.createBtnText)
        .should('be.disabled')

      cy.get('[id=cpuCount]')
        .type(this.workspace.global.invalidCpuCount)
        .should('have.value', this.workspace.global.invalidCpuCount)

      cy.get('[id=cpuCount-helper-text]')
        .should('contain', this.workspace.global.cpuErrMessage)

      cy.contains('button[type="button"]', this.workspace.create.createBtnText)
        .should('be.disabled')

      cy.get('[id=memoryCount]')
        .type(this.workspace.global.invalidMemoryCount)
        .should('have.value', this.workspace.global.invalidMemoryCount)

      cy.get('[id=memoryCount-helper-text]')
        .should('contain', this.workspace.global.memoryErrMessage)

      cy.contains('button[type="button"]', this.workspace.create.createBtnText)
        .should('be.disabled')
        
      cy.get('[id=storageCount]')
        .type(this.workspace.global.invalidStorageCount)
        .should('have.value', this.workspace.global.invalidStorageCount)

      cy.get('[id=storageCount-helper-text]')
        .should('contain', this.workspace.global.storageErrMessage)

      cy.contains('button[type="button"]', this.workspace.create.createBtnText)
        .should('be.disabled')
    })
})