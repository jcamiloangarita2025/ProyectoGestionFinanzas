describe('Navegar a crear un nuevo evento', () => {
  it('Debe Navegar a crear un nuevo evento', () => {

    // 1. Login
    cy.visit('http://localhost:3000')

    cy.get('input').eq(0).type('camilo')
    cy.get('input').eq(1).type('camilo')
    cy.get('button').click()

    // 2. Verificar que está en el menú
    cy.url().should('include', '/menu')

    // 3. Entrar a Crear Registro Financiero
    cy.contains('Calendario Financiero').click()

    cy.contains('Calendario Financiero');              
    
    cy.get('button').contains('Crear nuevo Evento').click()

    cy.url().should('include', '/nuevoEvento')
  })
})
