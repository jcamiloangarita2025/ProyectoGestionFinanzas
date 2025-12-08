describe('Crear registro y volver al menú', () => {
  it('Debe crear un registro financiero y devolverse al menú', () => {

    // Login
    cy.visit('http://localhost:3000')
    cy.get('input').eq(0).type('camilo')
    cy.get('input').eq(1).type('camilo')
    cy.get('button').click()

    // Verificar menú
    cy.url().should('include', '/menu')

    // Ir a nuevo registro
    cy.contains('Crear').click()
    cy.url().should('include', '/nuevoregistroF')

    // Llenar formulario
    cy.get('input').eq(0).type('2025-12-07')
    cy.get('input').eq(1).type('Prueba Cypress')
    cy.get('input').eq(2).type('50000')
    cy.get('select').select('Ingreso')
    cy.get('input').eq(3).type('Pruebas')
    cy.get('input').eq(4).type('Camilo')

    // Enviar formulario
    cy.get('button').contains('Crear registro Financiero').click()

    // Capturar el alert del navegador
    cy.on('window:alert', (mensaje) => {
      expect(mensaje).to.contain('Registro financiero guardado correctamente') 
    })

    // Verificar que volvió al menú
    cy.url().should('include', '/menu')
  })
})
