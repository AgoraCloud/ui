/* eslint-disable */
/// <reference types="cypress" />

describe('/wiki', function () {
    beforeEach(function () {
      cy.fixture('global-data').then((globalData) => {
        this.globalData = globalData
      })
      cy.fixture('wiki').then((wiki) => {
        this.wiki = wiki
      })
      cy.visitWikis()
    })
  
    // it('greets with project', function () {
    //   cy.contains('h4', this.project.greeting)
    // })

    //add test: 'contains test wiki section'
  
    it('contains test wiki page', function () {
      cy.get('[id=showWikiPages]', {timeout: 9000})
        .click()
      cy.contains(this.wiki.testWikiPageName)
    })
  
    // it('displays existing project with name and description', function () {
    //   cy.get('table')
    //     .children()
    //     .should('contain', this.project.testProjectName)
    //     .and('contain', this.project.testProjectDescription)
    // })
  
    // it('links to project', function () {
    //   cy.contains('button', this.project.testProjectName)
    //     .click()
    //   cy.url()
    //     .should('include', '/p/' + this.project.testProjectId + '/lanes')
    // })
  
    // it('links to create-new-project', function () {
    //   cy.get('button[aria-label="add"]')
    //     .click()
    //   cy.url()
    //     .should('include', this.globalData.testWorkspaceId + '/p/new')
    // })
  
    // it('links to edit-project', function () {
    //   cy.get('button[aria-label="more"]')
    //     .last()
    //     .click()
    //   cy.contains('li[role="menuitem"]', this.project.editBtnText)
    //     .click({force: true})
    //   cy.url()
    //     .should('include', '/p/' + this.project.testProjectId + '/edit')
    // })
  
    // it('opens delete project dialog', function () {
    //   cy.get('button[aria-label="more"]')
    //     .last()
    //     .click()
    //   cy.contains('li[role="menuitem"]', this.project.deleteBtnText)
    //     .click({force: true})
    //   cy.get('div[role="dialog"]')
    //     .children()
    //     .should('contain', this.project.deleteDiaglogGreeting)
    // })
  })