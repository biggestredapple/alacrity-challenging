import crypto from 'crypto';

export const generateEncryptionKey = (
  password: string,
  salt: string,
  keyLength: number,
) => {
  return crypto.pbkdf2Sync(password, salt, 100000, keyLength, 'sha512');
};

export const encryption = (encryption_key: string, value: object) => {
  // Generate an initialization vector
  const iv = crypto.randomBytes(16);

  // Create a Cipher object with createCipheriv
  const cipher = crypto.createCipheriv('aes-256-cbc', encryption_key, iv);

  // Encrypt the value
  let encryptedValue = cipher.update(JSON.stringify(value), 'utf8', 'hex');
  encryptedValue += cipher.final('hex');

  return { iv: iv.toString('hex'), encryptedValue };
};

export const decryption = (
  decryption_key: string,
  iv: string,
  value: string,
) => {
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    decryption_key,
    Buffer.from(iv, 'hex'),
  );
  let decryptedData = decipher.update(value, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');

  return decryptedData;
};
