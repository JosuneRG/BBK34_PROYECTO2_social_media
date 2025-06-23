const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token proporcionado' });
    }

    const token = authHeader.split(' ')[1];

    try 
    {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id: decoded._id }; // <- clave corregida
      next();
    } 
    catch (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = auth;
