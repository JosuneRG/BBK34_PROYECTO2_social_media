const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/Users');

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).send({ message: 'Token no proporcionado' });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: payload._id }); // Puedes validar también si el token está en una lista si usas token rotation

    if (!user) {
      return res.status(401).send({ message: 'No estás autorizado' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Ha habido un problema con el token' });
  }
};

module.exports = auth;
