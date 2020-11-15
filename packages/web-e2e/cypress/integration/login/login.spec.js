describe('Login', () => {
    it('Logs in with the example account', () => {
        cy.visit(Cypress.env('CLIENT_URL'))

        cy.get('#email')
        .type('vehbi.iltan@gmail.com')
        cy.get('#password')
        .type('123456')
        cy.get('#login-button').click()

        cy.wait(1000)
        cy.url().should('include', '/dashboard')
    })
  })