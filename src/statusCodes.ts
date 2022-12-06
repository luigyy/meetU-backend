const codeFor = {
  MISSING_DATA : { code: 401, message: 'Missing data! Make sure all fields are given, beware of the typos!'},
  EMAIL_UNAVAILABLE : { code: 401, message: 'Email is already taken'},
  INVALID_PASSWORD :  { code: 401, message: 'Invalid password'},  
  INVALID_EMAIL : { code: 401, message: 'Email is not linked to any account'},
  SUCCESS : { code: 200, message: 'Success'},
  SERVER_ERROR : { code: 503, message: 'Server error'},
  MISSING_TOKEN: { code: 401, message: 'Authentication token not found on auth header'},
  INVALID_TOKEN: { code: 401, message: 'Invalid authentication token'},
  UNAUTHORIZED: { code: 403, message: 'Service not available for your role'}//user does not have required role
}

export default codeFor;
