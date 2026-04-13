// MIDDLEWARE DE AUTORIZACION POR ROLES

import { AppError } from '../utils/AppError.js';

const checkRol = (roles) => (req, res, next) => {
  try {
    const { user } = req;

    if (!user) {
      throw AppError.unauthorized('Usuario no autenticado', 'NOT_AUTHENTICATED');
    }

    const userRol = user.role;

    if (!roles.includes(userRol)) {
      throw AppError.forbidden('No tienes permisos para esta accion', 'NOT_ALLOWED');
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default checkRol;
