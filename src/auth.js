
const jwt = require('jsonwebtoken');
exports.isUser = function(req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
        let token = req.headers.authorization;
        jwt.verify(token, 'secret', { algorithm: "HS256" }, (err, user) => {   
            
            if (err) { 
                return res.status(400).json({ error: "Not Authorized" });
                //throw new Error("Not Authorized");
            }
            return next();
        });
    } else {
        return res.status(500).json({ error: "Not Authorized" });
        //throw new Error("Not Authorized");
    }
}
exports.isAdmin = function(req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
        let token = req.headers.authorization;
        jwt.verify(token, 'secret', { algorithm: "HS256" }, (err, user) => {   
            
            if (err) { 
                return res.status(500).json({ error: "Not Authorized" });
                //throw Error("Not Authorized");
            }
            if(user.user.roles[0] != 'admin') {
                return res.status(500).json({ error: "Not Authorized" });
                //throw Error("Not Authorized");
            }
            return next();
        });
    } else {
        return res.status(500).json({ error: "Not Authorized" });
        //throw new Error("Not Authorized");
    }
}