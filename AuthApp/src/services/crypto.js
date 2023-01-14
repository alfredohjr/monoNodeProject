import bcrypt from 'bcrypt';

import * as dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRET;

class Crypto {

    async crypto(text) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(text + secret, saltRounds);
      return hashedPassword;
    }
    
    async decrypto(text, hashedPassword) {
      const isMatch = await bcrypt.compare(text + secret, hashedPassword);
      return isMatch;
    }
}

export default Crypto;