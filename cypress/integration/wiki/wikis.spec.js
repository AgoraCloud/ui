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

    //add test: 'contains test wiki section'
  
    it('displays existing wiki page name', function () {
      cy.get('[id=showWikiPages]', {timeout: 9000})
        .click()
      cy.contains(this.wiki.testWikiPageName)
    })

    it('displays existing wiki page content', function () {
      cy.get('[id=showWikiPages]', {timeout: 9000})
        .click()
      cy.contains('a', this.wiki.testWikiPageName)
        .click()
      cy.contains('h3', this.wiki.testWikiPageName)
      cy.contains('h1', this.wiki.testWikiContent)
    })

    it('adds and edits new wiki section and page', function () {
      cy.get('button[title="Add Section"]', {timeout: 9000})
        .click()
      cy.wait(5000)
      cy.get('button[title="Add Page To Section"]:last', {timeout: 9000})
        .click()
      cy.get('[id=showWikiPages]:last', {timeout: 9000})
        .click()
      cy.contains('a', 'New Page')
        .click()
      cy.get('button[title="Edit Selected Wiki Page"]', {timeout: 9000})
        .click()
      cy.wait(3000)
      cy.get('input[value="New Page"]')
        .clear()
        .type(this.wiki.create.newWikiName)
      cy.get('textarea')
        .clear()
        .type("# " + this.wiki.create.newWikiContent)
      cy.get('button[id="saveWiki"]', {timeout: 9000})
        .click()
      cy.reload()
      cy.wait(25000)
      cy.contains('a', this.wiki.create.newWikiName)
      cy.contains('h3', this.wiki.create.newWikiName)
      cy.contains('h1', this.wiki.create.newWikiContent)
    })

    //test below to be completed once delete context menu can be grabbed

    // it('deletes wiki page and section', function () {
    //   cy.get('[id=showWikiPages]:last', {timeout: 9000})
    //     .click()
    //   cy.contains('a', this.wiki.create.newWikiName)
    //     .rightclick()
    //   cy.contains('li', this.wiki.deleteBtnText)
    //     .last()
    //     .click({force: true})
    //   cy.get('input[id="name"]')
    //     .type(this.wiki.create.newWikiName)
    // })
    
  })