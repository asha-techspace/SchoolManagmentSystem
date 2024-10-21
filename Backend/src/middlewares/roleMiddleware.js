
const authorizeRoles = (requiredRoles) => (req, res, next) => {
    if (!requiredRoles.includes(req.user.role)) {
        return res.status(403).json({ message: `Insufficient privileges to access this resource - ${req.user.role} not in ${requiredRoles}` });
    }
    next();
};

export default authorizeRoles;