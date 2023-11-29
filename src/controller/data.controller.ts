import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { body } from 'express-validator';
import { generateEncryptionKey, encryption, decryption } from 'utils';
import { SECRET_KEY } from 'consts';
import { DataService } from 'services';
import { errorHandlerWrapper } from 'utils';
import { InValidKeyError, NotFoundError } from 'errors';

export const storeDataValidator = () => {
  return [
    body('id').notEmpty().withMessage('Id is required'),
    body('encryption_key').notEmpty().withMessage('Encryption key is required'),
    body('value').notEmpty().withMessage('Value is required'),
  ];
};

export const storeDataHandler = async (req: Request, res: Response) => {
  const { id, encryption_key, value } = req.body;

  const key = generateEncryptionKey(encryption_key, SECRET_KEY, 32);
  const { iv, encryptedValue } = encryption(key, value);

  await DataService.createData({
    id,
    iv,
    value: encryptedValue,
  });

  res.status(httpStatus.OK).json({ id, value: encryptedValue });
};

export const retrieveDataValidator = () => {
  return [
    body('id').notEmpty().withMessage('Id is required'),
    body('decryption_key').notEmpty().withMessage('Decryption key is required'),
  ];
};

export const retrieveDataHandler = async (req: Request, res: Response) => {
  const { id, decryption_key } = req.body;

  const idPattern = id.replace(/\*/g, '%');

  const results = await DataService.findData(idPattern);
  if (!results.length) throw new NotFoundError('Data is not found');

  const decryptionKey = generateEncryptionKey(decryption_key, SECRET_KEY, 32);

  try {
    const data = results.map((result) => {
      const decryptedValue = decryption(decryptionKey, result.iv, result.value);

      return {
        id: result.id,
        data: JSON.parse(decryptedValue),
      };
    });
    res.status(httpStatus.OK).json({ data });
  } catch (err) {
    throw new InValidKeyError('Invalid Decryption Key');
  }
};

export const storeData = errorHandlerWrapper(storeDataHandler);
export const retrieveData = errorHandlerWrapper(retrieveDataHandler);
