/// <reference types="Cypress" />
describe('01 Check Site Homepage', function() {
  it('Open homepage', function() {
    // Go to site
    cy.visit('https://storedemo.coffeemakerideas.com/')

    // Check browser title
    cy.title().should('eq', 'Store Demo – Just another WordPress site')

    // Check title
    cy.get('div.site-title').should('contain', 'Store Demo')

    // Check that menu is visible
    cy.get('ul.nav-menu').should('be.visible')

    // Check that banner is visible
    cy.get('div.wp-block-cover').should('be.visible')

    // Interactive mode with Cypress runner
    //cy.pause()

    // Check that menu has 5 items using should()
    cy.get('ul.nav-menu')
      .children('li')
      .should('have.length', 5)
      .should('contain', 'Home')
      .should('contain', 'Cart')
      .should('contain', 'Checkout')
      .should('contain', 'My account')
      .should('contain', 'Shop')

    // Check that menu has 5 items using expect()
    cy.get('ul.nav-menu li').then($items => {
      expect($items.length).to.be.equal(5)
    })

    // Check that menu has 5 items using assert.equal()
    cy.get('ul.nav-menu li').then($items => {
      assert.equal($items.length, 5, 'We should have 5 menu items')
    })

    // Check that we have 3 categories
    cy.get('.product-category').should('have.length', 3)

    // Check that we have at least 1 product on the homepage
    cy.get('.wc-block-grid__product').should('have.length.gte', 1)

    // Check that I have at least 1 product on sale
    cy.get('[class$="product-onsale"]').should('have.length.greaterThan', 1)

    // Check cart widget
    cy.get('.cart-contents')
      .should('be.visible')
      .should('contain', '$')
      .should('contain', '0.00')
      .should('contain', '0 items')

    // Check searchbox
    cy.get('.site-header .search-field').should('be.visible')

    // Cypress doesn't have a hover() function, this workaround didn't work
    // cy.get('.site-header-cart').trigger('mouseover')
    // cy.get('.widget_shopping_cart')
    //   .should('be.visible')
    //   .should('contain', 'No products in the cart')
  })
})
