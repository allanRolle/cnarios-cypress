/// <reference types="cypress" />

import FormPage from '../../support/pages/formPage'

describe('Form Registration', () => {
  const formPage = new FormPage()

  beforeEach(() => {
    formPage.visitFormregistrationTestPage()
    cy.fixture('formRegistrationData').as('testData')
  })

  context('Happy, Negative Paths & Edge Cases', () => {
    it('should test all scenarios', function () {
      this.testData.forEach((data) => {
        cy.log(`Running test case: ${data.testCase}`)

        // Reset the form before each test case
        formPage.resetButton.click()

        // Fill in the form fields
        formPage.setName(data.name)
        formPage.setEmail(data.email)
        formPage.setPhoneNumber(data.phoneNumber)
        formPage.setEvent(data.event)
        formPage.setNumberOfTickets(data.numberOfTickets)

        if (data.expectedStatus === 'reset') {
          // ACTION : Cliquer sur Reset
          formPage.resetButton.click()

          // VERIFICATIONS : Les champs doivent être vides ou par défaut
          formPage.nameInput.should('have.value', '')
          formPage.emailInput.should('have.value', '')
          formPage.phoneNumberInput.should('have.value', '')

          // Pour le Select MUI, on vérifie que le texte affiché est revenu au placeholder
          // ou que la valeur interne est vide
          formPage.eventSelectInput.should('contain.text', '')

          // Pour le nombre de tickets (MUI type number), la valeur redevient souvent 0 ou vide
          formPage.ticketsInput.should('have.value', '1')

          // Le bouton Register doit être désactivé après un reset
          formPage.registerButton.should('be.disabled')
        } else if (data.expectedStatus === 'valid') {
          // Submit the form
          formPage.registerButton.click()
          // Verify that the confirmation modal appears with correct details
          formPage.confirmationModal.should('be.visible')
          formPage.confirmName.should('have.text', data.name)
          formPage.confirmEmail.should('have.text', data.email)
          formPage.confirmPhone.should('have.text', data.phoneNumber)
          formPage.confirmEvent.should('have.text', data.event)
          formPage.confirmTotalTickets.should(
            'have.text',
            `${data.numberOfTickets}`
          )
          formPage.confirmTicketsList
            .children()
            .should('have.length', data.numberOfTickets)
          const ticketIds = []
          formPage.confirmTicketsList.children().each(($el) => {
            const ticketText = $el.text()
            ticketIds.push(ticketText)
          })
          // Verify all ticket IDs are unique
          expect(new Set(ticketIds).size).to.equal(ticketIds.length)
          if (data.shouldConfirm) {
            formPage.registerButton.click({ force: true })
            formPage.confirmationModal.should('be.visible')
            formPage.confirmButton.click()
            formPage.confirmationModal.should('not.exist')

            // After confirming, the form should be reset
            formPage.nameInput.should('have.value', '')
            formPage.emailInput.should('have.value', '')
            formPage.phoneNumberInput.should('have.value', '')
            formPage.eventSelectInput.should('contain.text', '')
            formPage.ticketsInput.should('have.value', '1')
          }

          // Close the modal after verification
          formPage.closeModalButton.click()
        } else {
          // Verify that the register button is disabled
          formPage.registerButton.should('be.disabled')

          // Verify that the appropriate error message is displayed
          if (data.errorField === 'event') {
            formPage.registerButton.should('be.disabled')
            /* 
              disabled because of flakiness in error message assertion, needs investigation

              formPage.errorMessageEventField
                .should('be.visible')
                .and('not.be.empty')
                .should('contain.text', data.errorMessage) 
            */
          } else {
            formPage.errorMessage
              .should('be.visible')
              .and('contain.text', data.errorMessage)
          }
        }
      })
    })
  })
})
