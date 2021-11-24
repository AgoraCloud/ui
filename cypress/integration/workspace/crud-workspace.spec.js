/* eslint-disable */
/// <reference types="cypress" />

describe('/create-workspace', function () {
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

    it('successfully creates new workspace', function () {
      cy.get('[id=name]')
        .type(this.workspace.create.newWorkspaceName)
        .should('have.value', this.workspace.create.newWorkspaceName)

      cy.get('[id=cpuCount]')
        .type(this.workspace.create.newWorkspaceCpuCount)
        .should('have.value', this.workspace.create.newWorkspaceCpuCount)

      cy.get('[id=memoryCount]')
        .type(this.workspace.create.newWorkspaceMemoryCount)
        .should('have.value', this.workspace.create.newWorkspaceMemoryCount)

      cy.get('[id=storageCount]')
        .type(this.workspace.create.newWorkspaceStorageCount)
        .should('have.value', this.workspace.create.newWorkspaceStorageCount)

      cy.contains('button[type="button"]', this.workspace.create.createBtnText)
        .should('not.be.disabled')
        .click()
    })
})

describe('/edit-workspace', function () {
    beforeEach(function () {
      cy.fixture('global-data').then((globalData) => {
        this.globalData = globalData
        })
      cy.fixture('workspace').then((workspace) => {
        this.workspace = workspace
      })
      cy.visitWorkspaces()
      cy.wait(6000)
    })

    it('edits a workspace', function () {
      cy.get('[id=combo-box-demo]')
        .click()

      cy.contains(this.workspace.create.newWorkspaceName)
        .click()

      cy.get('a[id="edit-workspace-btn"]')
        .click()

      cy.get('[id=name]')
        .clear()
        .type(this.workspace.edit.newWorkspaceName)
        .should('have.value', this.workspace.edit.newWorkspaceName)

      cy.get('[id=cpuCount]')
        .clear()
        .type(this.workspace.edit.newWorkspaceCpuCount)
        .should('have.value', this.workspace.edit.newWorkspaceCpuCount)

      cy.get('[id=memoryCount]')
        .clear()
        .type(this.workspace.edit.newWorkspaceMemoryCount)
        .should('have.value', this.workspace.edit.newWorkspaceMemoryCount)

      cy.get('[id=storageCount]')
        .clear()
        .type(this.workspace.edit.newWorkspaceStorageCount)
        .should('have.value', this.workspace.edit.newWorkspaceStorageCount)

      cy.contains('button[type="button"]', this.workspace.edit.saveBtnText)
        .should('not.be.disabled')
        .click()
    })
})

describe('/delete-workspace', function () {
    beforeEach(function () {
      cy.fixture('global-data').then((globalData) => {
        this.globalData = globalData
        })
      cy.fixture('workspace').then((workspace) => {
        this.workspace = workspace
      })
      cy.visitWorkspaces()
      cy.wait(6000)
    })

    it('deletes a workspace', function () {
      cy.get('[id=combo-box-demo]')
        .click()

      cy.contains(this.workspace.edit.newWorkspaceName)
        .click()

      cy.get('a[id="edit-workspace-btn"]')
        .click()

      cy.contains('button[type="button"]', this.workspace.edit.deleteBtnText)
        .should('not.be.disabled')
        .click()

      cy.get('input[id=name]:last')
        .type(this.workspace.edit.newWorkspaceName)
        .should('have.value', this.workspace.edit.newWorkspaceName)

      cy.get('div[role="dialog"]')
        .children()
        .contains('button', this.workspace.edit.deleteBtnText)
        .click()

      cy.wait(6000)

      cy.get('[id=combo-box-demo]', {timeout: 9000})
        .click()

      cy.get('div')
        .should('not.contain', this.workspace.create.newWorkspaceName)
    })
})