import jwt from "jsonwebtoken";

const secretToken = "danielleAlday2024";

function CreateToken(idUser){
    const token = jwt.sign({idUser}, secretToken, {
        expiresIn: 999999
    });

    return token;

}

function ValidateToken(req, res, next){
    const authToken = req.headers.authorization;

    if (!authToken)
        return res.status(401).json({error: "Token não informado"});

    const [bearer, token] = authToken.split(" ");

    jwt.verify(token, secretToken, (err, tokenDecoded) => {

        if (err)
            return res.status(401).json({error: "Token inválido"});

        req.idUser = tokenDecoded.idUser;

        next();

    });
}

export default { CreateToken, ValidateToken };