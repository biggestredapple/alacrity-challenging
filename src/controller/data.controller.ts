import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { generateEncryptionKey, encryption, decryption } from 'utils/crypto';
import { SECRET_KEY } from 'consts';
import { DataService } from 'services';

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

export const retrieveDataHandler = async (req: Request, res: Response) => {
  const { id, decryption_key } = req.body;

  const idPattern = id.replace(/\*/g, '%');

  const results = await DataService.findData(idPattern);
  if (!results.length)
    res
      .status(httpStatus.NOT_FOUND)
      .json({ message: `No Data with this ${id}` });

  const decryptionKey = generateEncryptionKey(decryption_key, SECRET_KEY, 32);

  const data = results.map((result) => {
    const decryptedValue = decryption(decryptionKey, result.iv, result.value);

    return {
      id: result.id,
      data: JSON.parse(decryptedValue),
    };
  });
  res.status(httpStatus.OK).json({ data });
};
