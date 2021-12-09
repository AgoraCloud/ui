/* eslint-disable */
/// <reference types="cypress" />

describe('/lanes', function () {
    beforeEach(function () {
      cy.fixture('task').then((task) => {
        this.task = task
      })
      cy.visitLanes()
      cy.wait(6000)
    })
  
    it('Task displays title and description', function () {
      cy.contains('h4', this.task.testTaskTitle)
      cy.contains('p', this.task.testTaskDescription)
    })
})