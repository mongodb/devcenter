describe('index page', () => {
    beforeEach(() => {
        cy.visit('/');
    });
    it('should have a descriptive header.', () => {
        cy.get('h1').should('have.text', 'MongoDB Developer Center');
    });
});
