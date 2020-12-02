describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'kevin',
      username: 'kel',
      password: '5677'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in').click()
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Log in').click()
      cy.get('#username').type('kel')
      cy.get('#password').type('5677')
      cy.get('#login-button').click()

      cy.contains('kevin logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('Log in').click()
      cy.get('#username').type('kel')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'kevind logged-in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'kel', password: '5677' })
    })

    it('A new blog can be created', function() {
      cy.contains('Add a blog').click()
      cy.get('.Title').type('Creating a new blog with cypress')
      cy.get('.Author').type('Cypress')
      cy.get('.Url').type('www.exampleurl.com')
      cy.contains('create').click()
      cy.contains('Creating a new blog with cypress')
    })

    describe('A blog exists', function() {
      beforeEach(function() {
        cy.contains('Add a blog').click()
        cy.get('.Title').type('Creating a new blog with cypress')
        cy.get('.Author').type('Cypress')
        cy.get('.Url').type('www.exampleurl.com')
        cy.contains('create').click()
        cy.contains('Creating a new blog with cypress')
      })

      it('A blog can be liked', function() {
        cy.contains('View').click()
        cy.contains('LikeBlog').click()

        cy.contains('Likes 1')
      })

      it('A blog can be deleted', function() {
        cy.visit('http://localhost:3000')
        cy.contains('View').click()
        cy.contains('Delete').click()

        cy.get('html').should('not.contain', 'Creating a new blog with cypress')
      })

      it('A blog can not be deleted by another user', function() {
        cy.contains('Log Out').click()
        const user = {
          name: 'anna',
          username: 'anna2647',
          password: '4568'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.login({ username: 'anna2647', password: '4568' })

        cy.contains('View').click()

        cy.get('html').should('not.contain', 'Delete')
      })

      describe('When multiple blogs exist', function() {
        beforeEach(function() {
          cy.contains('View').click()
          cy.contains('LikeBlog').click()
          cy.contains('Hide').click()
          cy.contains('View').click()
          cy.contains('LikeBlog').click()
          cy.createBlog({ title: 'Creating a new blog with cypress two', author: 'Cypress Two', url: 'www.urltwo.com' })
          cy.createBlog({ title: 'Creating a new blog with cypress three', author: 'Cypress Three', url: 'www.urlthree.com' })
        })

        it.only('blogs are ordered accroding to likes, most likes first', function() {
          cy.contains('Creating a new blog with cypress two')

          cy.get('button').then( buttons => {
            cy.wrap(buttons[12]).click()
            cy.wrap(buttons[14]).click()
            cy.wrap(buttons[4]).click()
            cy.wrap(buttons[8]).click()
          })

          cy.get('.BlogLikes').then( likes => {
            cy.wrap(likes[0]).contains('Likes 2')
            cy.wrap(likes[1]).contains('Likes 1')
            cy.wrap(likes[2]).contains('Likes 0')
          })
        })
      })


    })
  })
})
