describe('index page', () => {
    beforeEach(() => {
        cy.visit('/');
    });
    it('should have a descriptive header.', () => {
        cy.get('h1').should('have.text', 'MongoDB Developer Center');
    });

    it('should have an h2 for articles.', () => {
        cy.get('h2').should('have.text', 'Articles');
    });

    it('should have a list of articles.', () => {
        cy.get('ul').find('> li').should('have.length.above', 0);
    });
});
