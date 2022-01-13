describe('index page', () => {
    it('should have a descriptive header', () => {
        cy.visit('/').get('h1').should('have.text', 'TEST');
    });
});
