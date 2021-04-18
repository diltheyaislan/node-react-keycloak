export default interface ILocale {
  app: {
    errors: {
      internalServer: string;
    };
  };

  /* Middlewares */
  middlewares: {
    ensureAuthenticated: {
      JWTtokenMissing: string;
      InvalidJWTToken: string;
    };
  };

  /* Auth */
  auth: {
    invalidCredentials: string;
    inactiveAccount: string;
  };

  /* Mail */
  mail: {
    errorSendingEmail: string;
    subject: {
      userActivation: string;
    };
  };

  /* Resources */
  resources: {
    post: string;
    posts: {
      notFound: string;
    };
  };

  /* Validation */
  validation: {
    invalidUUID: string;
    resourceNotFound: string;
    alreadyExists: string;
    invalidValue: string;
    emailAlreadyUsed: string;
    invalidCurrentPassword: string;
    oldPasswordIsRequired: string;
    oldPasswordNotMatch: string;
    onlyImageJpgPngAccepted: string;
  };
}
