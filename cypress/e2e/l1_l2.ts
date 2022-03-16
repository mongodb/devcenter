// describe('L1', () => {
//     it('should have all content heavy components', () => {
//         cy.visit('/product/atlas');
//         cy.viewport(1440, 900);
//         // Hero
//         cy.get('h2').should('have.text', 'Atlas');
//         cy.get('span')
//             .contains('consisting of a description of the title')
//             .should('exist');
//
//         // Side Nav
//         cy.get('nav:visible')
//             .find('a:contains(Articles)')
//             .should('have.length', 1);
//
//         // Topics
//         cy.get('h5').contains('Atlas Topics').should('exist');
//
//         // Featured
//
//         const featuredSection = cy.get('[data-testid="featured-card-section"]');
//         featuredSection.within(() => {
//             cy.get('[data-testid="card-large"]').should('have.length', 1);
//             cy.get('[data-testid="card-small"]').should('have.length', 2);
//         });
//
//         // Articles Section
//         const articlesSection = cy.get('[data-testid="articles-card-section"]');
//         articlesSection
//             .find('[data-testid="card-medium"]')
//             .should('have.length', 3);
//
//         // The rest of the sections should be present.
//         cy.get('[data-testid="tutorials-card-section"]').should('exist');
//         cy.get('[data-testid="demo-apps-card-section"]').should('exist');
//         cy.get('[data-testid="videos-card-section"]').should('exist');
//         cy.get('[data-testid="podcasts-card-section"]').should('exist');
//
//         // Search
//         cy.get('h5').contains('All Atlas Content').should('exist');
//         cy.get('input[name="search-text-input"]').type('abc');
//         cy.get('[data-testid="card-list"]').should('have.length', 10);
//         cy.get('button').contains('Load more').click();
//         cy.get('[data-testid="card-list"]').should('have.length', 20);
//     }),
//         it('should have all content medium components', () => {
//             cy.visit('/product/data-lake');
//             cy.viewport(1440, 900);
//             // Hero
//             cy.get('h2').should('have.text', 'Data Lake').should('exist');
//             cy.get('span')
//                 .contains('consisting of a description of the title')
//                 .should('exist');
//
//             // Side Nav
//             cy.get('nav:visible')
//                 .find('a:contains(Articles)')
//                 .should('have.length', 1);
//
//             // Topics
//             cy.get('h5').contains('Topics').should('not.exist');
//
//             // Featured
//             cy.get('[data-testid="featured-card-section"]').should('exist');
//
//             // The rest of the sections should be present.
//             cy.get('[data-testid="articles-card-section"]').should('not.exist');
//             cy.get('[data-testid="tutorials-card-section"]').should(
//                 'not.exist'
//             );
//             cy.get('[data-testid="demo-apps-card-section"]').should(
//                 'not.exist'
//             );
//             cy.get('[data-testid="videos-card-section"]').should('not.exist');
//             cy.get('[data-testid="podcasts-card-section"]').should('not.exist');
//
//             // Search
//             cy.get('h5').contains('All Data Lake Content').should('exist');
//         }),
//         it('should have all content light components', () => {
//             cy.visit('/product/vs-code');
//             cy.viewport(1440, 900);
//             // Hero
//             cy.get('h2').should('have.text', 'VS Code');
//             cy.get('span')
//                 .contains('consisting of a description of the title')
//                 .should('exist');
//
//             // Side Nav
//             cy.get('nav:visible')
//                 .find('a:contains(Articles)')
//                 .should('have.length', 1);
//
//             // Featured
//             cy.get('[data-testid="featured-card-section"]').should('not.exist');
//
//             // The rest of the sections should be present.
//             cy.get('[data-testid="articles-card-section"]').should('not.exist');
//             cy.get('[data-testid="tutorials-card-section"]').should(
//                 'not.exist'
//             );
//             cy.get('[data-testid="demo-apps-card-section"]').should(
//                 'not.exist'
//             );
//             cy.get('[data-testid="videos-card-section"]').should('not.exist');
//             cy.get('[data-testid="podcasts-card-section"]').should('not.exist');
//
//             // Search
//             cy.get('h5').contains('All VS Code Content').should('exist');
//
//             // Related Topics
//             cy.get('h5').contains('Related Topics').should('exist');
//         });
// });
