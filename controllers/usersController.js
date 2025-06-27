const Users = require('../models/Users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();                          // Cargar variables del archivo .env

const JWT_SECRET = process.env.JWT_SECRET;  

const UsersController = {
    // 1 - Endpoint para registrar un usuario utilizando bcrypt
    // 1. REGISTRO DE USUARIO
    async register(req, res) {
        try 
        {
            // 1- Validación de campos obligatorios usando función externa
            const { username, email, password } = req.body;      
            
            // 2. Encriptar la contraseña
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            // 4. Crear el nuevo usuario
            const newUser = await Users.create({
                username,
                email,
                password: hashedPassword
            });

            // 3. Devolver el usuario sin mostrar la contraseña
            // Es una convención: en muchos lenguajes, _ se usa para variables que no importan.
            const { password: _, ...userData } = newUser.toObject();
            res.status(201).send({ message: 'Usuario registrado', users: userData });

        } 
        catch (error) 
        {
            console.error(error);
            return res.status(500).json({ message: 'Error al registrar usuario' });
        }
    },

    // 2 - Endpoint para login(utilizando bcrypt +JWT)
    async login(req, res) {
        try 
        {
            // Extraemos email y password del body de la petición
            const { email, password } = req.body;

            // Validamos que no estén vacíos
            if (!email || !password) {
                return res.status(400).json({ message: 'Email y contraseña son requeridos' });
            }

            // Buscamos al usuario en la base de datos por su email
            const users = await Users.findOne({ email });
            
            // Si no existe, devolvemos un error 404
            if (!users) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // Comparamos la contraseña ingresada con la almacenada en la base de datos (ya encriptada)
            const passwordMatch = await bcrypt.compare(password, users.password);
            
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            // Generamos un token JWT con el ID del usuario y una expiración de 1 hora
            const token = jwt.sign(
                { _id: users._id },
                process.env.JWT_SECRET
            );

            // 8️⃣ Devolvemos el token al cliente
            return res.json({ message: 'Login exitoso', token });

        } 
        catch (error) {
            return res.status(500).json({ message: 'Error al iniciar sesión' });
        }
    },

    // 3 - Endpoint que nos traiga la información del usuario conectado
    async getProfile(req, res) {
        try 
        {
            if (!req.user || !req.user.id) {
                return res.status(401).json({ message: 'No autorizado' });
            }

            const user = await Users.findById(req.user.id); // <- Cambiado
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const userData = user.toObject();
            delete userData.password;

            res.status(200).json(userData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener usuario conectado' });
        }
    },

    // 4 - Endpoint para el logout
    async logout(req, res){
        try 
        {
            // Aquí solo damos un mensaje al frontend para que borre el token manualmente
            res.status(200).json({
            message: "Sesión cerrada. Borra el token del cliente"
            });
        } 
        catch (error) {
            console.log();
            res.status(500).json({message: "Error al cerrar sesión"})
            
        }
    }
    
}

module.exports = UsersController;