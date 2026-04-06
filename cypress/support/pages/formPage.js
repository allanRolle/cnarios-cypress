class formPage {
  get nameInput() {
    return cy.get("[data-testid='input-fullname']")
  }
  get emailInput() {
    return cy.get("[data-testid='input-email']")
  }
  get phoneNumberInput() {
    return cy.get("[data-testid='input-phone']")
  }

  get eventSelectInput() {
    // On cible le div qui affiche le texte à l'utilisateur (role combobox)
    return cy.get('[role="combobox"][aria-labelledby="select-event-label"]')
  }

  get ticketsInput() {
    return cy.get("[data-testid='input-tickets']")
  }

  get errorMessage() {
    return cy.get('.css-nl47j')
  }

  get errorMessageEventField() {
    return cy.get("[data-testid='error-event']", { timeout: 8000 })
  }

  get registerButton() {
    return cy.get("[data-testid='btn-submit']")
  }

  get resetButton() {
    return cy.get("[data-testid='btn-reset']")
  }

  get confirmationModal() {
    return cy.get('.css-gjytzw')
  }

  get confirmName() {
    return this.confirmationModal.find('[data-testid="confirm-fullname"]')
  }
  get confirmEmail() {
    return this.confirmationModal.find('[data-testid="confirm-email"]')
  }
  get confirmPhone() {
    return this.confirmationModal.find('[data-testid="confirm-phone"]')
  }
  get confirmEvent() {
    return this.confirmationModal.find('[data-testid="confirm-event"]')
  }
  get confirmTotalTickets() {
    return this.confirmationModal.find('[data-testid="confirm-tickets"]')
  }
  get confirmTicketsList() {
    return this.confirmationModal.find("[data-testid='ticket-id-list']")
  }
  get confirmTicketsListItem() {
    return this.confirmationModal.find("[data-testid='ticket-id-item']")
  }
  get closeModalButton() {
    return this.confirmationModal.find('.css-j7n7h8')
  }
  get confirmButton() {
    return this.confirmationModal.find("[data-testid='btn-confirm']")
  }

  visitFormregistrationTestPage() {
    return cy.visit(`/concepts/form#try-it-yourself`)
  }

  setName(name) {
    this.nameInput.clear().type(name)
  }

  setEmail(email) {
    this.emailInput.clear().type(email)
  }

  setPhoneNumber(phone) {
    this.phoneNumberInput.clear().type(phone)
  }

  setEvent(eventName) {
    const isReset = eventName === '' || eventName === '-- Select --'

    // 1. On clique sur le champ pour lui donner le focus et on attend qu'il soit prêt
    cy.get('[role="combobox"]')
      .first()
      .should('be.visible')
      .click({ force: true })

    if (isReset) {
      // Cas de réinitialisation :
      // - {home} : remonte tout en haut de la liste (souvent l'option vide)
      // - {enter} : valide la sélection
      cy.focused().type(`{home}{enter}`, { delay: 100 })
      cy.contains('Event Registration').click({ force: true })
    } else {
      // Cas de sélection d'une option :
      // - On tape le texte de l'événement. MUI va automatiquement filtrer
      //   ou mettre en surbrillance l'option correspondante.
      // - On termine par {enter} pour valider.
      cy.focused().type(`${eventName}{enter}`, { delay: 100 })
      cy.contains('Event Registration').click({ force: true })
    }

    // 2. STABILISATION : On vérifie que la valeur a bien été prise en compte
    // Cela force Cypress à attendre le re-rendu de React
    if (!isReset) {
      cy.get('[role="combobox"]').first().should('contain.text', eventName)
    }

    // 3. DÉCLENCHEMENT DE LA VALIDATION (onBlur)
    // On clique en dehors (sur un élément neutre comme le titre) pour forcer
    // le formulaire à vérifier les erreurs.
    cy.contains('Event Registration').click({ force: true })
  }

  setNumberOfTickets(numberOfTickets) {
    // .clear() est crucial pour les types "number" afin d'éviter la concaténation
    this.ticketsInput.clear().type(numberOfTickets).blur() // Le blur déclenche souvent la validation instantanée sur MUI
  }

  clickRegisterButton() {
    this.registerButton.click()
  }

  clickResetButton() {
    this.resetButton.click()
  }

  clickCloseModalButton() {
    this.closeModalButton.click()
  }

  clickConfirmButton() {
    this.confirmButton.click()
  }
}

export default formPage
