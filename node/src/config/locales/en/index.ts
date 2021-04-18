export default {
  app: {
    errors: {
      internalServer: 'Internal server error',
    },
  },

  /* Middlewares */
  middlewares: {
    ensureAuthenticated: {
      JWTtokenMissing: 'JWT token is missing',
      InvalidJWTToken: 'JWT token is invalid',
    },
    hasPermission: {
      accessDenied: 'Access denied',
    },
  },

  /* Auth */
  auth: {
    invalidCredentials: 'Invalid credentials',
    inactiveAccount: 'Inactive account',
  },

  /* Mail */
  mail: {
    errorSendingEmail: 'There was an error sending the email',
    subject: {
      userActivation: 'Account activation',
    },
  },

  /* Resources */
  resources: {
    post: 'Post',
    posts: {
      notFound: 'Post not found',
    },
  },

  /* Validation */
  validation: {
    invalidUUID: 'UUID value is invalid',
    resourceNotFound: ':resource not found',
    alreadyExists: 'Already exists',
    invalidValue: 'Invalid value',
    emailAlreadyUsed: 'E-mail address is already in use',
    invalidCurrentPassword: 'Ccurrent password is invalid',
    oldPasswordIsRequired: 'Old password is required to set the new password',
    oldPasswordNotMatch: 'Old password does not match',
    onlyImageJpgPngAccepted: 'Only JPG or PNG images are accepted',
  },
};
