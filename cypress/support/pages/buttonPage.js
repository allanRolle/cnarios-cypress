class ButtonPage {
  get profile() {
    return cy.get('.css-12nllm1').eq(1)
  }
  get profiles() {
    return cy.get('.css-12nllm1')
  }
  get followButton() {
    return cy.get('.css-15q2cw4').eq(1).find('button')
  }
  get disabledButton() {
    return cy.get('.css-12nllm1').eq(0).find('button').eq(1)
  }
  get buttonIcon() {
    return this.followButton.find('svg')
  }
  get tooltip() {
    return cy.get('.css-1ydfzmo')
  }
  get removeButton() {
    return cy.get('.css-xz9haa').eq(1)
  }
  visitButtonTestPage() {
    return cy.visit(`/concepts/button#try-it-yourself`)
  }
  clickFollowButton() {
    this.followButton.click()
  }
}

export default ButtonPage
