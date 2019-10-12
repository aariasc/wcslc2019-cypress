/// <reference types="Cypress" />
import Chance from 'chance'
const chance = new Chance()

describe('03 Buy Product', function() {
  beforeEach(function() {
    cy.fixture('productData.json').as('productData')
  })
  it('Buy first product', function() {
    // Go to homepage (using baseUrl from cypress.json)
    cy.visit(`${this.productData.productUrl}`)

    // Breadcrumbs are visible and contain the product name
    cy.get('.woocommerce-breadcrumb')
      .should('be.visible')
      .should('contain', this.productData.productName)

    // Product title has expected name
    cy.get('.product_title').should('contain', this.productData.productName)

    // SKU is showing
    cy.get('.sku_wrapper')
      .should('be.visible')
      .should('contain', 'SKU')
      .should('contain', this.productData.productSku)

    // Price is showing
    cy.get('.woocommerce-Price-amount')
      .should('be.visible')
      .should('contain', '$')
      .should('contain', this.productData.productPrice)

    // Check that we have at least one thumbnail
    cy.get('.flex-control-thumbs')
      .children('li')
      .should('have.length.greaterThan', 0)

    // Check that all images in the product gallery are visible
    cy.get('.woocommerce-product-gallery img').should('be.visible')

    // Short description is visible
    cy.get('.woocommerce-product-details__short-description').should('be.visible')

    // Description is visible
    cy.get('#tab-description').should('contain', 'Description')

    // Related products are visible and are at least 1
    cy.get('.related').should('be.visible')
    cy.get('.related .product').should('have.length.greaterThan', 0)

    // Click on anything that says "Add to cart"
    cy.contains('Add to cart').click()

    // Check product added to cart message
    cy.get('.woocommerce-message')
      .should('be.visible')
      .should('contain', this.productData.productName)
      .should('contain', 'has been added to your cart')
      .children('.wc-forward')
      .should('contain', 'View cart')

    // Check cart widget
    cy.get('.cart-contents')
      .should('be.visible')
      .should('contain', '$')
      .should('contain', this.productData.productPrice)
      .should('contain', '1 item')

    // Click on anything that says "View cart"
    cy.contains('View cart').click()

    // Check cart title
    cy.get('.entry-title').should('contain', 'Cart')

    // Check table with products is visile
    cy.get('.shop_table').should('be.visible')

    // Check we have only one product in the cart
    cy.get('.cart_item')
      .should('have.length', 1)
      .should('contain', this.productData.productName)
      .should('contain', this.productData.productPrice)

    // Apply coupon is visible
    cy.contains('Apply coupon')
      .should('be.visible')
      .should('be.enabled')
    cy.get('#coupon_code')
      .should('be.visible')
      .should('be.enabled')

    // Update cart is visible but not enabled
    cy.contains('Update cart')
      .should('be.visible')
      .should('not.be.enabled')

    // Check cart totals
    cy.get('.cart_totals')
      .should('contain', 'Cart totals')
      .should('contain', 'Subtotal')
      .should('contain', this.productData.productPrice)
      .should('contain', this.productData.shippingPrice)
      .should('contain', 'Total')
      .should('contain', this.productData.totalPayment)

    // Go to checkout
    cy.contains('Proceed to checkout').click()

    // Check checkout title
    cy.get('.entry-title').should('contain', 'Checkout')

    // Check coupon notification
    cy.get('.woocommerce-info')
      .should('be.visible')
      .should('contain', 'Have a coupon?')

    //Fill form with ChanceJS
    cy.get('#billing_first_name').type(chance.first())
    cy.get('#billing_last_name').type(chance.last())
    cy.get('#billing_company').type(chance.company())
    cy.get('#billing_address_1').type(chance.address())
    cy.get('#billing_city').type(chance.city())
    cy.get('#billing_postcode').type(chance.zip())
    cy.get('#billing_phone').type(chance.phone())
    cy.get('#billing_email').type(chance.email())

    // Dropdown
    cy.get('#select2-billing_state-container').click()
    cy.get('input.select2-search__field').type('Utah')
    cy.get('.select2-results__option').click()

    // Submit form
    cy.get('#place_order')
      .should('be.visible')
      .should('be.enabled')
      .click({force: true})

    // Check for Woocomerce error
    cy.get('.woocommerce-error')
      .should('be.visible')
      .should('contain', 'Invalid payment method.')
  })
})
