describe('index page', () => {
    beforeEach(() => {
        cy.visit('/developer');
    });
    it('should have a descriptive header.', () => {
        cy.get('h1').should('have.text', 'MongoDB Developer Center');
    });

    it('should have secondary text.', () => {
        cy.get('h2').contains(
            'More than 100 open source projects, MongoDB tutorials, videos, and code examples. A global community of more than 7 million developers.'
        );
    });
});
