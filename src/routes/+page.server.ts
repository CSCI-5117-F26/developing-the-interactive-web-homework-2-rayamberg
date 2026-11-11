//apparently we need to call this db.js even though it is TS
import { db, todosColl } from '#lib/server/db.js';

const result = await todosColl.insertOne(
    {
        description: 'my first nosql db entry',
        someNum: 67
    }
)