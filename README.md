# Web and API challange

This is a testing project built with Cypress for learning propose.

## How to install

1. Download and install Node.js ( https://nodejs.org/en/download/ )
2. Pull this project
3. In the terminal type *npm install*
4. Wait all dependences be dowloaded
5. **Important** - There is a file called cypress.env.example.json that has int its content a key called PERSONAL_TOKEN.
For testing you must gerenerate your own token at the gorest website and put to this key.
**After that rename cypress.env.example.json to cypress.env.json.**

## How to run the tests
There are two scripts to run the tests:
1. *npm run cy:open* - Open the Cypress console and click on testing_challenges.spec.js.

2. *npm run test* - Run the tests in headless mode.