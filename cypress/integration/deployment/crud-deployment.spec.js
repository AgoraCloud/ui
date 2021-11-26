/* eslint-disable */
/// <reference types="cypress" />

describe('/create-deployment', function () {
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

    it('successfully creates new deployment', function () {
      cy.get('[id=name]')
        .type(this.deployment.create.newDeploymentName)
        .should('have.value', this.deployment.create.newDeploymentName)

      cy.get('[id=sudoPassword]')
        .type(this.deployment.create.newDeploymentSP)
        .should('have.value', this.deployment.create.newDeploymentSP)

      cy.get('[id="imageType"]')
        .click()

      cy.get('[id="' + this.deployment.create.newImageType + '"]')
        .click()

      cy.get('[id="imageVersion"]')
        .click()

      cy.get('[id="' + this.deployment.create.newImageVersion + '"]')
        .click()

      cy.get('[id="scalingType"]')
        .click()

      cy.get('[id="' + this.deployment.create.newScalingType + '"]')
        .click()

      cy.get('[id=cpuCount]')
        .type(this.deployment.create.newDeploymentCpuCount)
        .should('have.value', this.deployment.create.newDeploymentCpuCount)

      cy.get('[id=memoryCount]')
        .type(this.deployment.create.newDeploymentMemoryCount)
        .should('have.value', this.deployment.create.newDeploymentMemoryCount)

      cy.get('[name=checkedB')
        .click()

      cy.get('[id=storageCount]')
        .type(this.deployment.create.newDeploymentStorageCount)
        .should('have.value', this.deployment.create.newDeploymentStorageCount)

      cy.contains('button[type="button"]', this.deployment.create.createBtnText)
        .should('not.be.disabled')
        .click()
    })
})

describe('/edit-deployment', function () {
    beforeEach(function () {
      cy.fixture('global-data').then((globalData) => {
        this.globalData = globalData
        })
      cy.fixture('deployment').then((deployment) => {
        this.deployment = deployment
      })
      cy.visitDeployments()
      cy.wait(6000)
    })

    it('displays existing deployment', function () {
        cy.contains('h4', this.deployment.create.newDeploymentName)
    })

    it('edits a deployment', function () {
      cy.get('button[id="more"]:last')
        .click()

      cy.get('li[id="Edit"]:last')
        .click()

      cy.get('[id=name]')
        .clear()
        .type(this.deployment.edit.newDeploymentName)
        .should('have.value', this.deployment.edit.newDeploymentName)

    //uncomment the code below when image version edit form bug is resolved

    //   cy.get('[id="imageVersion"]')
    //     .click()

    //   cy.get('[id="' + this.deployment.edit.newImageVersion + '"]')
    //     .click()

      cy.get('[id=cpuCount]')
        .clear()
        .type(this.deployment.edit.newDeploymentCpuCount)
        .should('have.value', this.deployment.edit.newDeploymentCpuCount)

      cy.get('[id=memoryCount]')
        .clear()
        .type(this.deployment.edit.newDeploymentMemoryCount)
        .should('have.value', this.deployment.edit.newDeploymentMemoryCount)

      cy.contains('button[type="button"]', this.deployment.edit.saveBtnText)
        .should('not.be.disabled')
        .click()
    })
})

describe('/delete-deployment', function () {
    beforeEach(function () {
      cy.fixture('global-data').then((globalData) => {
        this.globalData = globalData
        })
      cy.fixture('deployment').then((deployment) => {
        this.deployment = deployment
      })
      cy.visitDeployments()
      cy.wait(6000)
    })

    it('deletes a deployment', function () {
      cy.get('button[id="more"]:last')
        .click()

      cy.get('li[id="Delete"]:last')
        .click()

      cy.get('input[id=name]')
        .type(this.deployment.edit.newDeploymentName)
        .should('have.value', this.deployment.edit.newDeploymentName)

      cy.get('div[role="dialog"]')
        .children()
        .contains('button', this.deployment.deleteBtnText)
        .click()

      cy.get('h4', {timeout: 9000})
        .should('not.contain', this.deployment.edit.newDeploymentName)
    })
})