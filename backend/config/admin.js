module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'eEvUYssHNDf8WR51oaMM1A=='),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'hx5BSGJxYmx5w68AaI+Tpg=='),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'V0SOwSAjQiHicl7adFdt8A=='),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
