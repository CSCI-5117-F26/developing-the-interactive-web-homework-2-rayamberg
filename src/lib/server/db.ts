/* Following instructions from https://www.mongodb.com/docs/drivers/node/current/connect/mongoclient/, although ignoring the stableapi params */
import type { Todo } from '#lib/types.js';
import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '$app/env/private';

const client =  new MongoClient(MONGODB_URI);
const DB_NAME = 'faire';

export const db = client.db(DB_NAME);
export const todosColl = db.collection('todos');