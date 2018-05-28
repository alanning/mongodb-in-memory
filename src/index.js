import tingodb from 'tingodb'
import Collection from 'tingodb/lib/tcoll'
import Cursor from 'tingodb/lib/tcursor'
import Promise from 'bluebird'

// Add promise support to tingodb
  ;[
  'initM',
  'initFS',
  'compactCollection',
  'drop',
  'rename',
  'createIndex',
  'indexExists',
  'indexes',
  'insert',
  'count',
  'stats',
  'findOne',
  'update',
  'findAndModify',
  'save',
  'remove',
  'findAndRemove',
  'mapReduce',
  'group',
].forEach((methodName) => {
  Collection.prototype[methodName] = Promise.promisify(Collection.prototype[methodName])
})

const insert = Collection.prototype.insert

Collection.prototype.insertOne = async function (doc, options) {
  const document = (await insert.call(this, doc, options))[0]
  return {
    insertedId: document._id,
  }
}

Collection.prototype.insert = Collection.prototype.insertMany = async function (docs, options) {
  const documents = await insert.call(this, docs, options)
  return {
    insertedIds: documents.map(document => document._id),
  }
}

Collection.prototype.updateOne = Collection.prototype.update
Collection.prototype.updateMany = Collection.prototype.update

Collection.prototype.deleteOne = function (filter, options = {}) {
  options = Object.assign({}, options, {single: true})
  return Collection.prototype.remove.call(this, filter, options)
}
Collection.prototype.deleteMany = Collection.prototype.remove

;[
  'nextObject',
  'count',
  'close',
  'toArray',
].forEach((methodName) => {
  Cursor.prototype[methodName] = Promise.promisify(Cursor.prototype[methodName])
})

const inMemory = tingodb({memStore: true, searchInArray: true})
export const Db = inMemory.Db

export function createDb() {
  return new Db('db', {})
}
