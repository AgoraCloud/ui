/* eslint-disable */
/// <reference types="cypress" />

describe('/lanes', function () {
    beforeEach(function () {
      cy.fixture('lane').then((lane) => {
        this.lane = lane
      })
      cy.visitLanes()
      cy.wait(6000)
    })
  
    it('greets with to-do, in-progress and done lanes', function () {
      cy.contains('h5', this.lane.toDoText)
      cy.contains('h5', this.lane.inProgressText)
      cy.contains('h5', this.lane.doneText)
    })
})