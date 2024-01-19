const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

//Info about my API
const options = {
    definition: {
      openapi: "3.0.0",
      info: { title: 'Customers QS API', version: '1.0.0'},
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ['src/routes/customer.js']
  };

//JSON format
const openapiSpecification = swaggerJSDoc(options)

//SetUp
const swaggerDocs = (app, port) => {
    app.use('/customer', swaggerUi.serve, swaggerUi.setup(openapiSpecification))
    app.get('/customer.json', (req, res) => {
        res.setHeader("Content-Type", "application/json")
        res.status(200).send(openapiSpecification);
    })

    console.log(`Version 1 Docs are available at http://localhost:${port}/customer`)
}

module.exports = { swaggerDocs }