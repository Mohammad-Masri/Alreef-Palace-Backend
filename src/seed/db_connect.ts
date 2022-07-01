/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import {
  DATABASE_PORT,
  DATABASE_HOST,
  DATABASE_NAME,
} from '../config/server_constant';

const url = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

const dbConnect = mongoose
  .connect(url)
  .then(() => {
    console.log('mongodb connected.');
  })
  .catch((err: Error) => console.log(err.message));

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to db');
});

mongoose.connection.on('error', (err: Error) => {
  console.log(err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection is disconnected.');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

export { dbConnect, mongoose };
