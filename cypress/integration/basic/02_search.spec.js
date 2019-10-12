/// <reference types="Cypress" />
describe('02 Search for products', function() {
  it('Search for Ninja', function() {
    const searchTerm = 'Ninja'
    // Go to homepage (using baseUrl from cypress.json)
    cy.visit('/')

    // Type search term and press {enter} to submit form
    // https://docs.cypress.io/api/commands/type.html#Arguments
    cy.get('.site-header .search-field')
      .should('be.visible')
      .type(searchTerm + '{enter}')

    // Check search results page title
    cy.title().should('eq', 'Search Results for “Ninja” – Store Demo')

    // Check search results title
    cy.get('.woocommerce-products-header')
      .should('contain', 'Search results')
      .should('contain', searchTerm)

    // Check "Showing all X results"
    cy.get('.woocommerce-result-count')
      .should('contain', 'Showing all')
      .should('contain', 'results')

    // Use regex to confirm that the message is displayed as "Showing all <number> results"
    cy.contains(/Showing all \d+ results/).should('be.visible')

    // Check that we have at least 1 search results, and the word "Ninja" is displayed
    cy.get('.product')
      .should('have.length.greaterThan', 0)
      .each(($el, index, $list) => {
        cy.wrap($el).contains(searchTerm)
      })

    // Click on first result
    cy.get('.product')
      .first()
      .click()

    // Check page content
    cy.title().should('contain', searchTerm)
    cy.get('.product_title').should('contain', searchTerm)
  })

  it('Search for Foobar', function() {
    const searchTerm = 'Foobar'
    // Go to homepage (using baseUrl from cypress.json)
    cy.visit('/')

    // Type search term and press {enter} to submit form
    // https://docs.cypress.io/api/commands/type.html#Arguments
    cy.get('.site-header .search-field')
      .should('be.visible')
      .type(searchTerm + '{enter}')

    // Check search results page title
    cy.title().should('eq', 'Search Results for “Foobar” – Store Demo')

    // Check search results title
    cy.get('.woocommerce-products-header')
      .should('contain', 'Search results')
      .should('contain', searchTerm)

    cy.get('.woocommerce-info')
      .should('be.visible')
      .should('contain', 'No products were found matching your selection.')
  })
})
