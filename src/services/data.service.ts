import { Like } from 'typeorm';
import { DataEntity } from 'entities';
import { AppDataSource } from 'setups';

export const createData = async ({
  id,
  iv,
  value,
}: {
  id: string;
  iv: string;
  value: string;
}) => {
  const dataRepository = AppDataSource.getRepository(DataEntity);
  const newData = new DataEntity();
  newData.id = id;
  newData.iv = iv;
  newData.value = value;

  const result = await dataRepository.upsert(dataRepository.create(newData), {
    conflictPaths: ['id'],
  });

  return result;
};

export const findData = async (idPattern: string) => {
  const dataRepository = AppDataSource.getRepository(DataEntity);

  return await dataRepository.find({ where: { id: Like(idPattern) } });
};
