const jwt = require("jsonwebtoken");

exports.generateToken = (user)=>{
return jwt.sign({_id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin},
    "secret", {expiresIn:"30d"}
)
};

exports.isAuth = (req, res, next)=>{
const authorization = req.headers.authorization;
if(authorization){
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, "secret", (err, decode)=>{
        if(err){
            res.status(401).send({message: "Token is Invalid"});
        }else{
            req.user = decode;
            next();
        }
    })
}
else{
    res.status(401).send({message: "No Token Provided"});

}
};


exports.isAdmin = (req, res, next) =>{
    if (req.user && req.user.isAdmin) {
        next();
      } else {
        res.status(401).send({ message: 'Invalid Admin Token' });
      }

}

