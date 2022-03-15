describe('Typing test', () => {
    it('User can start test', () => {
        cy.visit('/');

        // change timer to 30
        cy.get('.timer-select > :nth-child(2)').click()
        // change timer to 45
        cy.get('.timer-select > :nth-child(3)').click()
        // change timer to 60
        cy.get('.timer-select > :nth-child(4)').click()
        // change timer to 15
        cy.get('.timer-select > :nth-child(1)').click()

        // start test with Enter
        // not working for some reason
        cy.document().trigger('keydown', 'Enter');
    })
})

describe('Navigate to each page', () => {
    it('User can navigate to each page', () => {
        cy.visit('/')

        // Training page
        cy.get('[href="/training"] > .tb-button').click()

        // Multiplayer page
        cy.get('[href="/multiplayer"] > .tb-button').click()

        // Account page
        cy.get('[href="/account"] > .tb-button').click()

        // Settings page
        cy.get('[href="/settings"] > .tb-button').click()

        // Back to typing test
        cy.get('[href="/"] > .tb-button').click()
    })
})