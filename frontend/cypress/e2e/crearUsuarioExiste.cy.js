describe('Registro de nuevo usuario', () => {
  it('Debe registrar un nuevo usuario correctamente', () => {

    cy.visit('http://localhost:3000/register')

    cy.get('input').eq(0).type('Juan')
    cy.get('input').eq(1).type('Angarita')
    cy.get('input').eq(2).type('juan@test.com')
    cy.get('input').eq(3).type('camilo')
    cy.get('input').eq(4).type('1234')

    cy.get('button').contains('REGISTRAR').click()

    cy.on('window:alert', (mensaje) => {
      expect(mensaje).to.contain('Usuario ya existe') 
    })

  })
})
