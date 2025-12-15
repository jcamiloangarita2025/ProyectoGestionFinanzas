describe('Crear Evento Financiero', () => {
  it('Debe crear nuevo evento financiero', () => {

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

    //Llenar Formulario

    cy.get('input').eq(0).type('Evento Cypress')
    cy.get('input').eq(1).type('500000')
    cy.get('select').select('Ingreso')
    cy.get('input').eq(2).type('Pruebas')
    cy.get('input').eq(3).type('Camilo')
    cy.get('input').eq(4).type('2025-12-24')

    cy.get('button').contains('Guardar evento').click()

    cy.on('window:alert', (mensaje) => {
      expect(mensaje).to.contain('Evento creado con exito') 
    })

    //comprobar url
    cy.url().should('include', '/calendario')
  })
})
