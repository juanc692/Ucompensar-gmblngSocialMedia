const jswt = require("jsonwebtoken");

const authMiddelware = (req, res, next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({message: "Acceso denegado, token no proporcionado"});
    }

    const token = authHeader.split(' ')[1]; //extrae el token del string usando split
    
    try{
        const decoded = jswt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        res.status(400).json({message: "Token no valido"});
    }
}

module.exports = authMiddelware;