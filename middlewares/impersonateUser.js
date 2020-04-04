function impersonate (requiredRole){
    return (req, res, next) => {
        if(req.currentUser.role === requiredRole){
            return next();
        }else{
            let errors = {
                notallowed: "Action not allowed"
            }
            return res.status(401).send({
                success: false,
                errors
            });
        }
    }
}

module.exports = impersonate;