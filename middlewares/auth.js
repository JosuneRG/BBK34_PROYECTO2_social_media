const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const auth = async (req, res, next) => {
  try 
  {
        // 1. Obtener el token del header
        const token = req.headers.authorization?.split(" ")[1];

        // 2. Si no hay token, rechaza la petición
        if (!token) {
        return res.status(401).send({ message: "Token no proporcionado" });
        }

        // 3. Verifica el token con la clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Busca el usuario del token en la base de datos (sin la contraseña)
        req.user = await User.findById(decoded.id).select("-password");

        // 5. Pasa al siguiente middleware o controlador
        next();
  } 
  catch (err) 
  {
        res.status(401).send({ message: "Token inválido o expirado" });
  }
};

module.exports = auth;
