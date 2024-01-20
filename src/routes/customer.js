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
 *     summary: Iniciar sesión
 *     description: Endpoint para que los clientes inicien sesión.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Dirección de correo electrónico del usuario.
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *     responses:
 *       200:
 *         description: Usuario autenticado correctamente.
 *         content:
 *           application/json:
 *             example:
 *               message: User logged successfully
 *               token: your_generated_token_here
 *       400:
 *         description: Datos de solicitud incorrectos.
 *         content:
 *           application/json:
 *             example:
 *               message: The password and email are required
 *       404:
 *         description: Usuario no encontrado o Email no registrado.
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid Credentials
 *       500:
 *         description: Error del servidor.
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
 *     summary: Registrar nuevo cliente
 *     description: Endpoint para que los clientes se registren.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del cliente.
 *               surname:
 *                 type: string
 *                 description: Apellido del cliente.
 *               email:
 *                 type: string
 *                 description: Dirección de correo electrónico del cliente.
 *               password:
 *                 type: string
 *                 description: Contraseña del cliente.
 *               phone:
 *                 type: string
 *                 description: Número de teléfono del cliente.
 *     responses:
 *       201:
 *         description: Cliente registrado correctamente.
 *         content:
 *           application/json:
 *             example:
 *               message: Customer registered successfully
 *               customer: { id: 1, name: 'John', surname: 'Doe', ... }
 *       401:
 *         description: El correo electrónico ya existe.
 *         content:
 *           application/json:
 *             example:
 *               message: Email already exist
 *       402:
 *         description: Parámetros requeridos faltantes.
 *         content:
 *           application/json:
 *             example:
 *               message: This params are requerited
 *       500:
 *         description: Error del servidor.
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
 *     summary: Obtener información del cliente autenticado
 *     description: Endpoint para obtener la información del cliente autenticado.
 *     responses:
 *       200:
 *         description: Información del cliente obtenida correctamente.
 *         content:
 *           application/json:
 *             example:
 *               customer_name: John
 *               customer_surname: Doe
 *               customer_code: WAS123
 *               customer_email: john.doe@example.com
 *               customer_phone: 123456789
 *       404:
 *         description: Cliente no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               message: Customer not found
 *       500:
 *         description: Error del servidor.
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
 *     summary: Obtener paquetes del cliente autenticado
 *     description: Endpoint para obtener los paquetes del cliente autenticado.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de paquetes obtenida correctamente.
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
 *         description: Cliente no tiene paquetes.
 *         content:
 *           application/json:
 *             example:
 *               message: You dont have packages
 *       500:
 *         description: Error del servidor.
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
 *     summary: Actualiza la contraseña del cliente
 *     description: Endpoint para actualizar la contraseña del cliente.
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
 *                 description: Contraseña actual del cliente.
 *               after:
 *                 type: string
 *                 description: Nueva contraseña del cliente.
 *     responses:
 *       201:
 *         description: Contraseña actualizada correctamente.
 *         content:
 *           application/json:
 *             example:
 *               message: Contraseña actualizada correctamente.
 *       401:
 *         description: Contraseña incorrecta.
 *         content:
 *           application/json:
 *             example:
 *               message: Contraseña incorrecta.
 *       404:
 *         description: Cliente no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               message: Cliente no encontrado.
 *       500:
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               message: Error interno del servidor.
 */
api.put('/updatePassword', ensureAuth, customerController.updatePassword)

/**
 * @swagger
 * /customer/updateProfile:
 *   put:
 *     summary: Actualiza la cuenta del cliente
 *     description: Endpoint para actualizar la cuenta del cliente.
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
 *         description: Cuenta actualizada correctamente.
 *         content:
 *           application/json:
 *             example:
 *               message: Cuenta actualizada correctamente.
 *               customerUpdate:
 *                 name: NuevoNombre
 *                 surname: NuevoApellido
 *                 email: nuevo@email.com
 *                 phone: nuevoTelefono
 *       500:
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               message: Error interno del servidor.
 */
api.put('/updateProfile', ensureAuth, customerController.editYourAccount)

/**
 * @swagger
 * /customer/deleteProfile:
 *   delete:
 *     summary: Elimina la cuenta del cliente
 *     description: Endpoint para eliminar la cuenta del cliente.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cuenta eliminada correctamente.
 *         content:
 *           application/json:
 *             example:
 *               message: Cuenta eliminada correctamente.
 *       400:
 *         description: No se puede eliminar la cuenta debido a paquetes pendientes.
 *         content:
 *           application/json:
 *             example:
 *               message: No se puede eliminar la cuenta porque tiene un paquete pendiente.
 *       404:
 *         description: Cuenta no encontrada.
 *         content:
 *           application/json:
 *             example:
 *               message: Cuenta no encontrada.
 *       500:
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               message: Error interno del servidor.
 */
api.delete('/deleteProfile', ensureAuth, customerController.deleteAccount)

module.exports = api