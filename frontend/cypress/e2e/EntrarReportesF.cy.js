describe('Navegar a reporte financiero', () => {
  it('Navegar a reporte financiero', () => {

    // 1. Login
    cy.visit('http://localhost:3000')

    cy.get('input').eq(0).type('camilo')
    cy.get('input').eq(1).type('camilo')
    cy.get('button').click()

    // 2. Verificar que está en el menú
    cy.url().should('include', '/menu')

    // 3. Entrar a Crear Registro Financiero
    cy.contains('Reportes Financieros').click()

    cy.contains('Reporte Financiero');              
    // 4. Verificar que entró a la ruta correcta
    cy.url().should('include', '/reportesF')
  })
})
