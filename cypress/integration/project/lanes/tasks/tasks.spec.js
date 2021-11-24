/* eslint-disable */
/// <reference types="cypress" />

describe('/lanes', function () {
    beforeEach(function () {
      cy.fixture('task').then((task) => {
        this.task = task
      })
      cy.visitLanes()
    })
  
    it('Task displays title and description', function () {
      cy.contains('h4', this.task.testTaskTitle)
      cy.contains('p', this.task.testTaskDescription)
    })


    // Unable to move task cards with cypress even after I installed and tried
    // using the cypress-drag-and-drop plugin:

    // it('can move task from one lane to another', function () {
    //     cy.get('.MuiCardContent-root')
    //       .first()
    //       .drag('[data-rbd-droppable-id="6177650e689e2c00191626b7"]')
    // })
})