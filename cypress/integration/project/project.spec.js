/* eslint-disable */
/// <reference types="cypress" />

describe('/project', function () {
  beforeEach(function (){
    cy.fixture('global-data').then((globalData) => {
      this.globalData = globalData
    })
    cy.fixture('project').then((project) => {
      this.project = project
    })
    cy.visitProjects()
  })

  it('greets with project', function () {
    cy.contains('h4', this.project.greeting)
  })

  it('contains list of projects', function () {
    cy.get('table')
      .children()
      .should('contain', this.project.tableHeader1)
      .and('contain', this.project.tableHeader2)
  })

  it('displays existing project with name and description', function () {
    cy.get('table')
      .children()
      .should('contain', this.project.testProjectName)
      .and('contain', this.project.testProjectDescription)
  })

  it('links to a project', function () {
    cy.contains('button', this.project.testProjectName)
      .click()
    cy.url()
      .should('include', '/p/' + this.project.testProjectId + '/lanes')
  })

  it('links to create-new-project', function () {
    cy.get('button[aria-label="add"]')
      .click()
    cy.url()
      .should('include', this.globalData.testWorkspaceId + '/p/new')
  })

  it('links to edit-project', function () {
    cy.get('button[aria-label="more"]')
      .click()
    cy.contains('li', this.project.editBtnText)
      .click()
    cy.url()
      .should('include', '/p/' + this.project.testProjectId + '/edit')
  })
})

// describe('add a project', function () {
//     beforeEach(function (){
//       cy.fixture('global-data').then((globalData) => {
//         this.globalData = globalData
//       })
//       cy.fixture('project').then((project) => {
//         this.project = project
//       })
//       cy.visitProjects()
//       cy.get('button[aria-label="add"]')
//         .click()
//     })
  
//     it('create a new project', function () {
//       cy.url()
//         .should('include', this.globalData.testWorkspaceId + '/p/new')
//       cy.contains('h4', this.project.createProjectGreeting)
//       cy.contains('button', this.project.createProjectBtnText)
//         .should('be.disabled')
//       cy.get('input[id="name"]')
//         .type('TP-')
//         .should('have.value', 'TP-')
//       cy.contains('p', this.project.createProjectNameErr)
//       cy.contains('button', this.project.createProjectBtnText)
//         .should('be.disabled')
//       cy.get('input[id="name"]')
//         .type('2')
//         .should('have.value', 'TP-2')
//       cy.contains('button', this.project.createProjectBtnText)
//         .should('not.be.disabled')
//         .click()
//       cy.url()
//         .should('include', this.globalData.testWorkspaceId + '/p')
//       cy.contains('td', 'TP-2')
//     })

//     it('allows to cancel creation of project', function () {
//         cy.get('input[id="name"]')
//           .type('TP-3')
//           .should('have.value', 'TP-3')
//         cy.contains('button', this.globalData.cancelBtnText)
//           .should('not.be.disabled')
//           .click()
//         cy.url()
//           .should('include', this.globalData.testWorkspaceId + '/p')
//         cy.should('not.include', 'TP-3')
//     })
// })

// describe('edit a project', function () {
//     beforeEach(function (){
//       cy.fixture('global-data').then((globalData) => {
//       this.globalData = globalData
//       })
//       cy.fixture('project').then((project) => {
//       this.project = project
//       })
//       cy.visitProjects()
//     })
// })

// describe('delete a project', function () {
//   beforeEach(function (){
//     cy.fixture('global-data').then((globalData) => {
//     this.globalData = globalData
//     })
//     cy.fixture('project').then((project) => {
//     this.project = project
//     })
//     cy.visitProjects()
//   })

//   it('deletes a project', function () {
//     cy.get('button[aria-label="more"]')
//     .last()
//     .click()
//     cy.contains('li', this.project.deleteBtnText)
//     .click()
//     cy.get('div[role="dialog"]')
//     .children()
//     .should('contain', this.project.deleteDiaglogGreeting)
//     .and('contain', 'type ' + this.project.testProjectName + ' to delete')
//     cy.contains('button', this.project.deleteBtnText)
//     .should('be.disabled')
//     cy.get('input[id="name"]')
//     .last()
//     .type(this.project.testProjectName)
//     .should('have.value', this.project.testProjectName)
//     cy.contains('button', this.project.deleteBtnText)
//     .should('not.be.disabled')
//     .click()
//   })
// })