'use strict';

const TokenServ = require('./token');
const { PermissionDeniedError } = require('../constants/errors');

// AllowedRoles --AccessLevel Needed TO Access resource
//  Actual Role -- Role Of user who is trying to access the resource
function hasPermission(allowedRoles, actualRole) {
  if (!allowedRoles) {
    return false;
  }

  return allowedRoles.includes(actualRole);
}

function authorize(allowedRoles = []) {
  return async (req, res, next) => {
    const token = (req.headers.authorization || req.headers.Authorization || '')
      .split('Bearer ').pop();
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

      // If no roles specified anyone loggedin can access
      if (allowedRoles.length === 0) {
        return next();
      }

      if (!hasPermission(allowedRoles, actualRole)) {
        const error = new PermissionDeniedError();
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
};
