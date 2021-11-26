/* eslint-disable */
/// <reference types="cypress" />
import * as data from "../fixtures/global-data.json"
import * as projectData from "../fixtures/project.json"
import * as deploymentData from "../fixtures/deployment.json"
import '@4tw/cypress-drag-drop'

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginAsAdmin', () => {
  cy.request({
    method:'POST',
    url:'http://localhost:3000/api/auth/login',
    body:{
      email: 'admin@admin.com',
      password: 'U3Q59yZqWeCM9Nhf'
    }
  })
  .then((resp) => {
    window.localStorage.setItem('jwt', resp.body.token)
  })
})

Cypress.Commands.add('loginAsAdminOWD', () => {
  cy.request({
    method:'POST',
    url:'https://waleed.agoracloud.saidghamra.com/api/auth/login',
    body:{
      email: 'admin@admin.com',
      password: 'U3Q59yZqWeCM9Nhf'
    }
  })
  .then((resp) => {
    window.localStorage.setItem('jwt', resp.body.token)
  })
})

Cypress.Commands.add('visitWorkspaces', () => { 
  cy.loginAsAdmin()
  cy.visit('/')
})

Cypress.Commands.add('visitWorkspaceMetrics', () => { 
  cy.loginAsAdmin()
  cy.visit('/w/' + data.testWorkspaceId + '/metrics')
})

Cypress.Commands.add('visitCreateWorkspace', () => { 
  cy.loginAsAdmin()
  cy.visit('/w/new')
})

Cypress.Commands.add('visitEditWorkspace', () => { 
  cy.loginAsAdmin()
  cy.visit('/w/' + data.testWorkspaceId + '/edit')
})

Cypress.Commands.add('visitDeployments', () => { 
  cy.loginAsAdmin()
  cy.visit('/w/' + data.testWorkspaceId)
})

Cypress.Commands.add('visitCreateDeployment', () => { 
  cy.loginAsAdmin()
  cy.visit('/w/' + data.testWorkspaceId + '/new')
})

Cypress.Commands.add('visitEditDeployment', () => { 
  cy.loginAsAdmin()
  cy.visit('/w/' + data.testWorkspaceId + '/d/' + deploymentData.testDeploymentId + '/edit')
})

Cypress.Commands.add('visitDeploymentInfo', () => { 
  cy.loginAsAdmin()
  cy.visit('/w/' + data.testWorkspaceId + '/d/' + deploymentData.testDeploymentId + '/Info')
})

Cypress.Commands.add('visitDeploymentProxy', () => { 
  cy.loginAsAdminOWD()
  cy.visit('https://waleed.agoracloud.saidghamra.com/w/' + data.testWorkspaceId + '/d/' + deploymentData.testDeploymentId)
})

Cypress.Commands.add('visitProjects', () => { 
  cy.loginAsAdmin()
  cy.visit('/w/' + data.testWorkspaceId + '/p')
})

Cypress.Commands.add('visitWikis', () => { 
  cy.loginAsAdmin()
  cy.visit('/w/' + data.testWorkspaceId + '/wiki')
})

Cypress.Commands.add('visitLanes', () => { 
  cy.loginAsAdmin()
  cy.visit('/w/' + data.testWorkspaceId + '/p/' + projectData.testProjectId + '/lanes')
})

Cypress.Commands.add('visitCreateNewProject', () => { 
  cy.loginAsAdmin()
  cy.visit('/w/' + data.testWorkspaceId + '/p/new')
})

Cypress.Commands.add('visitEditProject', () => { 
  cy.loginAsAdmin()
  cy.visit('/w/' + data.testWorkspaceId + '/p')
  cy.get('button[aria-label="more"]')
    .last()
    .click()
  cy.focused()
    .contains('[role="menuitem"][tabindex=0]', projectData.editBtnText)
    .click()
})

Cypress.Commands.add('openEditLaneDialog', () => { 
  cy.visitLanes()
  cy.get('button[aria-label="more"]', {timeout: 6000})
    .last()
    .click()
  cy.focused()
    .contains('[role="menuitem"][tabindex=0]', projectData.editBtnText)
    .click()
})

Cypress.Commands.add('openEditTaskDialog', () => { 
  cy.visitLanes()
  cy.get('[id="moreMenuTask"]', {timeout: 6000})
    .last()
    .click()
  cy.focused()
    .contains('[role="menuitem"][tabindex=0]', projectData.editBtnText)
    .click()
})