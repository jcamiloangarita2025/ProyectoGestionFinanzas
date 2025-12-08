describe('Navegación desde Registrar Usuario al Login', () => {
  it('Debe regresar al login al presionar el botón del header', () => {

    // 1. Ir a la página de login
    cy.visit('http://localhost:3000')

    // 2. Ir a la página de registrar usuario
    cy.contains('CREAR CUENTA').click()
    // o si usas ruta directa:
    // cy.visit('http://localhost:3000/register')

    // 3. Verificar que estamos en la página de registro
    cy.url().should('include', '/register')
    cy.contains('Registrar usuario')

    // 4. Presionar el botón del header para volver
    cy.get('header').find('button').click()

    // 5. Verificar que volvió al login
    cy.url().should('eq', 'http://localhost:3000/')
    cy.contains('Ingresar a cuenta')
  })
})
