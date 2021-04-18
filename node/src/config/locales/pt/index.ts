export default {
  app: {
    errors: {
      internalServer: 'Erro interno de servidor',
    },
  },

  /* Middlewares */
  middlewares: {
    ensureAuthenticated: {
      JWTtokenMissing: 'O token JWT não foi encontrado',
      InvalidJWTToken: 'O token JWT é inválido',
    },
  },

  /* Auth */
  auth: {
    invalidCredentials: 'Crendenciais inválidas',
    inactiveAccount: 'Conta inativa',
  },

  /* Mail */
  mail: {
    errorSendingEmail: 'Ocorreu um erro ao enviar o email',
    subject: {
      userActivation: 'Ativação de conta',
    },
  },

  /* Resources */
  resources: {
    post: 'Post',
    posts: {
      notFound: 'Post não encontrado',
    },
  },

  /* Validation */
  validation: {
    invalidUUID: 'Valor UUID inválido',
    resourceNotFound: ':resource não encontrado',
    alreadyExists: 'Item já existe',
    invalidValue: 'Valor inválido',
    emailAlreadyUsed: 'Endereço de e-mail já está em uso',
    invalidCurrentPassword: 'Senha atual inválida',
    oldPasswordIsRequired:
      'Senha antiga é necessária para definir a nova senha',
    oldPasswordNotMatch: 'Senha antiga não confere',
    onlyImageJpgPngAccepted: 'Somente imagens JPG ou PNG são aceitas',
  },
};
