const crumbs = [
    { text: 'MongoDB Developer Center', url: '/' },
    { text: 'Developer Topics', url: '/topics' },
    { text: 'Products', url: '/topics' },
];

const ctas = [
    { text: 'Primary CTA', url: 'https://www.mongodb.com/atlas' },
    {
        text: 'Secondary CTA',
        url: 'https://www.mongodb.com/cloud/atlas/register',
    },
];

describe('topic page (desktop/tablet)', () => {
    beforeEach(() => {
        cy.visit('/topics/atlas');
    });
    it('should have header.', () => {
        cy.get('h2').should('have.text', 'Atlas');
    });
    it('should have description', () => {
        cy.get('span').contains('consisting of a description of the title');
    });
    it('should have 3 breadcrumbs with correct links', () => {
        const crumb1 = cy.get('a').find('h1').eq(0);
        crumb1.should('have.text', crumbs[0].text);
        crumb1
            .parents('a')
            .should('have.attr', 'href')
            .should('not.be.empty')
            .and('equal', crumbs[0].url);

        const crumb2 = cy.get('a').find('h1').eq(1);
        crumb2.should('have.text', crumbs[1].text);
        crumb2
            .parents('a')
            .should('have.attr', 'href')
            .should('not.be.empty')
            .and('equal', crumbs[1].url);

        const crumb3 = cy.get('a').find('h1').eq(2);
        crumb3.should('have.text', crumbs[2].text);
        crumb3
            .parents('a')
            .should('have.attr', 'href')
            .should('not.be.empty')
            .and('equal', crumbs[2].url);
    });

    it('should have 2 CTA buttons with correct links', () => {
        const primaryCTA = cy.get('a').contains('Primary CTA');
        primaryCTA
            .should('have.attr', 'href')
            .should('not.be.empty')
            .and('equal', 'https://www.mongodb.com/atlas');

        const secondaryCTA = cy.get('span').contains('Secondary CTA');
        secondaryCTA
            .parents('a')
            .should('have.attr', 'href')
            .should('not.be.empty')
            .and('equal', 'https://www.mongodb.com/cloud/atlas/register');
    });

    it('should not have CTA buttons with mobile dimensions', () => {
        cy.viewport(375, 667); // iPhone SE
        cy.get('a').contains('Primary CTA').should('be.hidden');
        cy.get('span').contains('Secondary CTA').should('be.hidden');
    });
});
