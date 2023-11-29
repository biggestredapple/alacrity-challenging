import { generateEncryptionKey, encryption, decryption } from './crypto';

describe('Generate Encryption Key', () => {
  it('Generate Encryption Key from normal string', () => {
    const password = 'password';

    const encryptedKey = generateEncryptionKey(password, 'alacrity', 32);
    expect(encryptedKey.toString('hex')).toStrictEqual(
      '4f8c46ef49486fb528edbe049b992d584b2160745c93c10281b856f071e85b08',
    );
  });

  it('Generate Encryption Key from long string', () => {
    const password =
      '4f8c46ef49486fb528edbe049b992d584b2160745c93c10281b856f071e85b084f8c46ef49486fb528edbe049b992d584b2160745c93c10281b856f071e85b084f8c46ef49486fb528edbe049b992d584b2160745c93c10281b856f071e85b084f8c46ef49486fb528edbe049b992d584b2160745c93c10281b856f071e85b084f8c46ef49486fb528edbe049b992d584b2160745c93c10281b856f071e85b084f8c46ef49486fb528edbe049b992d584b2160745c93c10281b856f071e85b084f8c46ef49486fb528edbe049b992d584b2160745c93c10281b856f071e85b08';

    const encryptedKey = generateEncryptionKey(password, 'alacrity', 32);
    expect(encryptedKey.toString('hex')).toStrictEqual(
      '6f53c0f4f74fb98994bb270c44c6fa63339ca633bd0cd5048eaff154dd9f0d2f',
    );
  });
});

describe('Encrypt & Decrypt data', () => {
  it('Encrypt & Decrypt data with provided encryption key', () => {
    const password = 'password';
    const value = {
      name: 'alacrity',
    };
    const encryptionKey = generateEncryptionKey(password, 'alacrity', 32);

    const { iv, encryptedValue } = encryption(encryptionKey, value);

    const decryptedValue = decryption(encryptionKey, iv, encryptedValue);

    expect(value).toEqual(JSON.parse(decryptedValue));
  });
});
