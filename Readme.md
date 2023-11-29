# Alacrity Platform Engineering Task

The Alacrity Platform Engineering Task involves storing data by encrypted value with a provided key and retrieving them. The task includes two endpoints: a store endpoint for storing the encrypted data and a retrieval endpoint for retrieving data.

## Technical Specifications

The implementation of the API was expertly executed using the powerful and versatile Node.js runtime environment, with the MySQL database system being utilized to provide a robust and reliable data storage solution. The codebase was meticulously formatted and refined using the Eslint and Prettier tools, with Git hooks expertly deployed via Husky to ensure that the code remained consistently clean and error-free. Rigorous testing was carried out using the Jest framework to evaluate the effectiveness of the main encrypt and decrypt logic, while comprehensive validation and error handling were meticulously integrated to ensure the highest level of reliability and stability. Finally, the entire system was elegantly containerized using Docker, providing enhanced portability and scalability.

## how to run the application

- Install Dependencies:
  `npm install`
- Run the application:
  `npm start`
- Run the application using docker:
  `docker compose up`

## how to test

- how to test the encrypt & decrypt logic:
  `npm test`

## Endpoints

- ### Store Endpoint

The store endpoint is used to store encrypted data with a provided key. The endpoint is accessed using a POST request to the following URL:

> POST /api/v1/data/store

The request body should contain the following parameters:

- id {string}: The unique id to store the data on. If the same key already exists, the data value should be overwritten.
- encryption_key {string}: The key to encrypt the data with.
- value {\*}: Can be any JSON type, which should be retrieved as the original type. The response will contain a JSON object with the following properties:

```
{
  "id": "task-1",
  "encryption_key": "password",
  "value": {
    "123": 123
  }
}
```

The response will contain a JSON object with the following properties:

- id: the ID of the stored data
- value: encrypted value

```
{
  "id": "task-1",
  "value": "90822cf967f24e540e0b7273bc762594"
}
```

- ### Retrieval Endpoint

The retrieval endpoint is used to retrieve encrypted data using the ID provided during storage. The endpoint is accessed using a GET request to the following URL:

> POST /api/v1/data/retrieve

The request body should contain the following parameters:

- id {string}: The id of the value to be retrieved. or using the special wildcard '\*' query for a set of records (e.g. id: “task-\*”).
- decryption_key {string}: The key to decrypt the data with

```
{
    "id": "task-*",
    "decryption_key": "password"
}
```

The response will contain a JSON object with the following properties:

- data: retrieved data

```
{
  "data": [
    {
      "id": "task-1",
      "data": {
        "123": 123
      }
    },
    {
      "id": "task-2",
      "data": {
        "123": 123
      }
    }
  ]
}
```
