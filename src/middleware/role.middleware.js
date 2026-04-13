import { AppError } from '../utils/AppError.js';

const checkRol = (roles) => (req, res, next) => {
  try {
    const { user } = req;

    if (!user) {
      throw AppError.unauthorized('USUARIO NO AUTENTIFICADO', 'NOT_AUTHENTICATED');
    }

    const userRol = user.role;

    if (!roles.includes(userRol)) {
      throw AppError.forbidden('ERR', 'NOT_ALLOWED');
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default checkRol;
