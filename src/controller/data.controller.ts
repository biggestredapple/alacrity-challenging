import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { generateEncryptionKey, encryption, decryption } from 'utils/crypto';
import { SECRET_KEY } from 'consts';

export const storeDataHandler = (req: Request, res: Response) => {
  const { id, encryption_key, value } = req.body;

  const key = generateEncryptionKey(encryption_key, SECRET_KEY, 32);
  const { iv, encryptedValue } = encryption(key, value);

  res.status(httpStatus.OK).json({ id, iv, encryptedValue });
};

export const retrieveDataHandler = (req: Request, res: Response) => {
  const { id, decryption_key, iv, encryptedValue } = req.body;

  const decryptionKey = generateEncryptionKey(decryption_key, SECRET_KEY, 32);

  const decryptedValue = decryption(decryptionKey, iv, encryptedValue);

  res
    .status(httpStatus.OK)
    .json({ id, decryptedData: JSON.parse(decryptedValue) });
};
