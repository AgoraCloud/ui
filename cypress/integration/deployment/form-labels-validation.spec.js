/* eslint-disable */
/// <reference types="cypress" />

describe('create-deployment form labels', function () {
    beforeEach(function () {
      cy.fixture('global-data').then((globalData) => {
        this.globalData = globalData
      })
      cy.fixture('deployment').then((deployment) => {
        this.deployment = deployment
      })
      cy.visitCreateDeployment()
      cy.wait(6000)
    })
  
    it('contains greeting and labels', function () {
      cy.contains('h4', this.deployment.create.greeting)
      cy.contains('h6', this.deployment.global.labelName)
      cy.contains('h6', this.deployment.global.labelPassword)
      cy.contains('h6', this.deployment.global.labelContainer)
      cy.contains('h6', this.deployment.global.labelScaling)
    })

})

describe('deployment forms validation', function () {
    beforeEach(function () {
      cy.fixture('global-data').then((globalData) => {
        this.globalData = globalData
      })
      cy.fixture('deployment').then((deployment) => {
        this.deployment = deployment
      })
      cy.visitCreateDeployment()
      cy.wait(6000)
    })
    
    it('requires valid name', function () {
      cy.get('[id=name]')
        .type(this.deployment.global.improperName)
        .should('have.value', this.deployment.global.improperName)
  
      cy.get('[id=name-helper-text]')
        .should('contain', this.deployment.global.nameErrMessage)
  
      cy.contains('button[type="button"]', this.deployment.create.createBtnText)
        .should('be.disabled')

      cy.get('[id=sudoPassword]')
        .type(this.globalData.improperPassword)
        .should('have.value', this.globalData.improperPassword)

      cy.get('[id=sudoPassword-helper-text]')
        .should('contain', this.deployment.global.sudoPasswordErrMessage)

      cy.contains('button[type="button"]', this.deployment.create.createBtnText)
        .should('be.disabled')

      cy.get('[id=cpuCount]')
        .type(this.deployment.global.invalidCpuCount)
        .should('have.value', this.deployment.global.invalidCpuCount)

      cy.get('[id=cpuCount-helper-text]')
        .should('contain', this.deployment.global.cpuErrMessage)

      cy.contains('button[type="button"]', this.deployment.create.createBtnText)
        .should('be.disabled')

      cy.get('[id=memoryCount]')
        .type(this.deployment.global.invalidMemoryCount)
        .should('have.value', this.deployment.global.invalidMemoryCount)

      cy.get('[id=memoryCount-helper-text]')
        .should('contain', this.deployment.global.memoryErrMessage)

      cy.contains('button[type="button"]', this.deployment.create.createBtnText)
        .should('be.disabled')
      
      cy.get('[name=checkedB')
        .click()
        
      cy.get('[id=storageCount]')
        .type(this.deployment.global.invalidStorageCount)
        .should('have.value', this.deployment.global.invalidStorageCount)

      cy.get('[id=storageCount-helper-text]')
        .should('contain', this.deployment.global.storageErrMessage)

      cy.contains('button[type="button"]', this.deployment.create.createBtnText)
        .should('be.disabled')
    })
})