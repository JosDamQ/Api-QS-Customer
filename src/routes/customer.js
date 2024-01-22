'use strict'

const customerController = require('../controllers/customer')
const { ensureAuth } = require('../services/authenticated')
const express = require('express')
const api = express.Router()

//Todas las rutas

/**
 * @swagger
 * /customer/login:
 *   post:
 *     summary: Login
 *     description: Endpoint for login customers.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email from the user.
 *               password:
 *                 type: string
 *                 description: Password from user.
 *     responses:
 *       200:
 *         description: User loggin succesfully.
 *         content:
 *           application/json:
 *             example:
 *               message: User logged successfully
 *               token: your_generated_token_here
 *       400:
 *         description: The user dont sende data.
 *         content:
 *           application/json:
 *             example:
 *               message: The password and email are required
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid Credentials
 *       500:
 *         description: Error in the server.
 *         content:
 *           application/json:
 *             example:
 *               message: Error creating account
 */
api.post('/login', customerController.login)

/**
 * @swagger
 * /customer/register:
 *   post:
 *     summary: Register new customer
 *     description: Endpoint for register customer.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Customer name.
 *               surname:
 *                 type: string
 *                 description: Customer surname.
 *               email:
 *                 type: string
 *                 description: Customer email.
 *               password:
 *                 type: string
 *                 description: Customer password.
 *               phone:
 *                 type: string
 *                 description: Customer phone.
 *     responses:
 *       201:
 *         description: Customer registred succesfully.
 *         content:
 *           application/json:
 *             example:
 *               message: Customer registered successfully
 *               customer: { id: 1, name: 'John', surname: 'Doe', ... }
 *       401:
 *         description: This email already exist.
 *         content:
 *           application/json:
 *             example:
 *               message: Email already exist
 *       402:
 *         description: Params required.
 *         content:
 *           application/json:
 *             example:
 *               message: This params are requerited
 *       500:
 *         description: Error in the server.
 *         content:
 *           application/json:
 *             example:
 *               message: Error in the register
 */
api.post('/register', customerController.register)

/**
 * @swagger
 * /customer/getInfo:
 *   get:
 *     summary: Get info from customer
 *     description: Endpoint to get the info from customer.
 *     responses:
 *       200:
 *         description: Info from customer.
 *         content:
 *           application/json:
 *             example:
 *               name: John
 *               surname: Doe
 *               code: WAS123
 *               email: john.doe@example.com
 *               phone: 123456789
 *       404:
 *         description: Customer not found.
 *         content:
 *           application/json:
 *             example:
 *               message: Customer not found
 *       500:
 *         description: Error in the server.
 *         content:
 *           application/json:
 *             example:
 *               message: Error getting your info
 *     security:
 *       - bearerAuth: []
 */
api.get('/getInfo', ensureAuth, customerController.getYourInfo)


/**
 * @swagger
 * /customer/getpackages:
 *   get:
 *     summary: Get packages from customer authenticated
 *     description: Endpoint to get the packages from customer authenticated.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of package is ok.
 *         content:
 *           application/json:
 *             example:
 *               - tracking: 123456
 *                 weight: "2kg"
 *                 description: "Electronics"
 *               - tracking: 789012
 *                 weight: "1.5kg"
 *                 description: "Clothing"
 *       202:
 *         description: Customer does not has packages.
 *         content:
 *           application/json:
 *             example:
 *               message: You dont have packages
 *       500:
 *         description: Error in the server.
 *         content:
 *           application/json:
 *             example:
 *               message: Error getting your packages
 */
api.get('/getPackages', ensureAuth, customerController.getYourPackages)

/**
 * @swagger
 * /customer/updatePassword:
 *   put:
 *     summary: Update password from customer
 *     description: Endpoint to update password from customer authenticated.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               before:
 *                 type: string
 *                 description: Current password from customer authenticated.
 *               after:
 *                 type: string
 *                 description: New password.
 *     responses:
 *       201:
 *         description: Password updated succesfully.
 *         content:
 *           application/json:
 *             example:
 *               message: Password updated succesfully.
 *       401:
 *         description: Incorrect password.
 *         content:
 *           application/json:
 *             example:
 *               message: Incorrect password.
 *       404:
 *         description: Customer not found.
 *         content:
 *           application/json:
 *             example:
 *               message: Customer not found.
 *       500:
 *         description: Error in the server.
 *         content:
 *           application/json:
 *             example:
 *               message: Error updating your password.
 */
api.put('/updatePassword', ensureAuth, customerController.updatePassword)

/**
 * @swagger
 * /customer/updateProfile:
 *   put:
 *     summary: Update profile from customer
 *     description: Endpoint to update information from customer auntheticated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Information updated succesfully.
 *         content:
 *           application/json:
 *             example:
 *               message: Information updated succesfully .
 *               customerUpdate:
 *                 name: NuevoNombre
 *                 surname: NuevoApellido
 *                 email: nuevo@email.com
 *                 phone: nuevoTelefono
 *       500:
 *         description: Error in the server.
 *         content:
 *           application/json:
 *             example:
 *               message: Error updating your information.
 */
api.put('/updateProfile', ensureAuth, customerController.editYourAccount)

/**
 * @swagger
 * /customer/deleteProfile:
 *   delete:
 *     summary: Delete customer account
 *     description: Endpoint to delete customer account.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deleted succesfully.
 *         content:
 *           application/json:
 *             example:
 *               message: Account deleted succesfully.
 *       400:
 *         description: You cannot delete yout account because yo have packages.
 *         content:
 *           application/json:
 *             example:
 *               message: You cannot delete yout account because yo have packages.
 *       404:
 *         description: Customer not found.
 *         content:
 *           application/json:
 *             example:
 *               message: Customer not found.
 *       500:
 *         description: Error in the server.
 *         content:
 *           application/json:
 *             example:
 *               message: Error in the server.
 */
api.delete('/deleteProfile', ensureAuth, customerController.deleteAccount)

module.exports = api