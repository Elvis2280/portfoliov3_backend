const bcrypt = require('bcrypt');

const genSecret = () => {
  const salt1 = bcrypt.genSaltSync();
  const salt2 = bcrypt.genSaltSync();
  const secret = bcrypt.hashSync(salt1 + salt2, 10);

  return secret;
};

export default genSecret;
