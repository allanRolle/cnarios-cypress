/// <reference types="cypress" />

import ButtonPage from '../../support/pages/buttonPage'

describe('Button', () => {
  const buttonPage = new ButtonPage()

  beforeEach(() => {
    buttonPage.visitButtonTestPage()
  })

  context('Happy Paths', () => {
    it("Button text and icon should change to 'Following' with a check icon", () => {
      buttonPage.profile.should('be.visible')
      buttonPage.followButton.should('be.visible').and('have.text', 'Follow')
      buttonPage.buttonIcon
        .should('be.visible')
        .and('have.class', 'add-person-icon')
      buttonPage.clickFollowButton()
      buttonPage.followButton
        .should('be.visible')
        .and('have.text', 'Processing...')
      buttonPage.followButton.should('be.visible').and('have.text', 'Following')
      buttonPage.buttonIcon.should('be.visible').and('have.class', 'done-icon')
    })

    it("Tooltip should display 'Follow' or 'Unfollow' based on state", () => {
      buttonPage.followButton.trigger('mouseover')
      buttonPage.tooltip.should('be.visible').and('have.text', 'Follow')
      buttonPage.clickFollowButton()
      buttonPage.followButton.trigger('mouseover')
      buttonPage.tooltip.should('be.visible').and('have.text', 'Unfollow')
    })

    it("'Processing...' should appear before state changes and the button should be disabled", () => {
      buttonPage.clickFollowButton()
      buttonPage.followButton
        .should('be.disabled')
        .and('have.text', 'Processing...')
      buttonPage.followButton
        .should('not.be.disabled')
        .and('have.text', 'Following')
    })

    it("Clicking 'Following' should change it back to 'Follow'", () => {
      buttonPage.clickFollowButton()
      buttonPage.clickFollowButton()
      buttonPage.followButton.should('be.visible').and('have.text', 'Follow')
      buttonPage.buttonIcon
        .should('be.visible')
        .and('have.class', 'add-person-icon')
    })

    it('Remove button should remove the profile from the list', () => {
      buttonPage.profiles.should('have.length', 5)
      buttonPage.removeButton.click()
      buttonPage.profiles.should('have.length', 4)
    })
  })

  context('Negative Paths and Edge Cases', () => {
    it('Unable to follow if button is desabled', () => {
      buttonPage.disabledButton
        .should('be.visible')
        .and('be.disabled')
        .and('have.css', 'pointer-events', 'none')

      buttonPage.disabledButton
        .should('be.disabled')
        .and('have.text', 'Follow')
        .and('have.attr', 'disabled')
    })

    it('Ignore clicks near button (missed clicks)', () => {
      buttonPage.profile.click(0, 0) // Click near the top-left corner of the profile card
      buttonPage.followButton.should('be.visible').and('have.text', 'Follow')
    })

    it('Handles rapid clicks on the follow button without breaking', () => {
      buttonPage.clickFollowButton()
      buttonPage.clickFollowButton()
      buttonPage.clickFollowButton()
      buttonPage.followButton
        .should('be.visible')
        .and('have.text', 'Following')
        .and('not.be.disabled')
    })

    it('Button remains functional when visually hidden', () => {
      buttonPage.followButton.should('be.visible')
      buttonPage.followButton.invoke('hide')
      buttonPage.followButton.should('not.be.visible')
      buttonPage.followButton.click({ force: true })
      buttonPage.followButton
        .invoke('show')
        .should('be.visible')
        .and('have.text', 'Following')
    })
  })
})
