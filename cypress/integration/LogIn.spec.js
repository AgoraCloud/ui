describe('Log In Flow', function () {
    it('Log in with valid credentials', function () {
        //Arrange - setup initial app state
        // - visit a web page
        // - query for an element
        //Act - take an action
        // - interact with that element
        //Assert - make an assertion
        //- make an assertion about page content

        cy.visit('http://localhost:3000/');

        cy.get('[id=email]')
          .type('admin@admin.com')
          .should('have.value', 'admin@admin.com')

        cy.get('[id=password]')
          .type('M4F4fptt8TMVQZ9Y')
          .should('have.value', 'M4F4fptt8TMVQZ9Y')

        cy.get('button[type=submit]')
          .contains('Log In')
          .click()

        cy.url().should('include', '/w/')
    })

    it('Log in with invalid credentials', function () {

        cy.visit('http://localhost:3000/');

        cy.get('[id=email]')
          .type('admin@admin.com')
          .should('have.value', 'admin@admin.com')

        cy.get('[id=password]')
          .type('12345678')
          .should('have.value', '12345678')

        cy.get('button[type=submit]')
          .contains('Log In')
          .click()
          
        cy.url().should('include', '/login')
    })
})