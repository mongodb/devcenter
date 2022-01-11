describe('index page', () => {
    it('should have a descriptive header', () => {
        cy.visit('http://localhost:3000')
            .get('h1')
            .should('have.text', 'MongoDB Developer Center')
    });
})

