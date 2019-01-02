# mongodb-in-memory

MongoDB compatible in-memory database for unit testing using TingoDB.

This package is a thin wrapper around TingoDB.
It converts TingoDb's API to Promise API
and adds methods that you can find in the MongoDB Node.js package to the collection.
`createDb` will return a fresh db instance each time rather than reuse existing.

## Usage

```js
import { createDb } from 'mongodb-in-memory'

demo()

async function demo () {
  const db = await createDb()
  const users = db.collection('users')
  const userId = (await users.insertOne({name: 'Jonas'})).insertedId
  const user = await users.findOne({_id: userId})
  await users.updateOne({_id: userId}, {$set: {name: 'Tom'}})
}
```
