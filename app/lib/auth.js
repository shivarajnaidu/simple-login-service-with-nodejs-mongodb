'use strict';
const TokenServ = require('./token');

const ROLES = {
    user: 'user',
    admin: 'admin',
    super_admin: 'super_admin'
};

function hasPermission(requiredRole, actualRole) {

    // RequiredRole -- AccessLevel Needed TO Access resource
    //  Actual Role -- Role Of user who is trying to access the resource
    const ROLE_WEIGHTS = {
        [ROLES.user]: 1,
        [ROLES.admin]: 2,
        [ROLES.super_admin]: 3
    };

    const requiredRoleWeight = ROLE_WEIGHTS[requiredRole];
    const actualRoleWeight = ROLE_WEIGHTS[actualRole];
    return (actualRoleWeight >= requiredRoleWeight);
}

function authorize(role = ROLES.user) {
    return async(req, res, next) => {
        const requiredRole = role;
        const token = (req.headers.authorization || req.headers.Authorization || '').split('Bearer ').pop();
        /*
         * If Token Not Exist Unauthorized Error;
         */
        if (!token) {
            const error = new Error('Token Not Exist');
            error.status = 401;
            return next(error);
        }

        try {
            const decodedData = await TokenServ.verify(token);
            req.tokenData = decodedData;
            const actualRole = decodedData.role;
            if (!hasPermission(requiredRole, actualRole)) {
                const error = new Error('You Don\'t Have Permission To Proceed');
                error.status = 401;
                return next(error);
            }

            next();
        } catch (error) {
            next(error);
        }
    };
}


module.exports = {
    authorize,
    hasPermission,
    ROLES
};