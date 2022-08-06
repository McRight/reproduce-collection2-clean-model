/* eslint-env mocha */

// Tests that collections exists

import { assert } from 'chai'

import { SimpleSchema } from 'meteor/aldeed:simple-schema'

import { Random } from 'meteor/random'
import { resetDatabase } from 'meteor/xolvio:cleaner'

import { createCollection } from './createCollection'

const Collection = createCollection({
  name: 'TestCollection',
  schemas: [
    new SimpleSchema({
      name: String,
    }),
  ],
})
const userId = Random.id()
const updateUserId = Random.id()
let _id

describe(__filename, function () {
  before(function (done) {
    resetDatabase(null, done)
  })

  context('Insert', function () {
    it('insert with options', function (done) {
      _id = Collection.insert({ name: 'Test Insert' }, { userId }, done)
    })

    it('check insert with options', function () {
      assert.ok(_id)

      const collection = Collection.find({ _id }).fetch()[0]

      assert.ok(collection)
      assert.equal(collection.name, 'Test Insert')
      assert.isDefined(collection.createdAt)
      assert.equal(collection.createdBy, userId)
      assert.isUndefined(collection.updatedAt)
      assert.isUndefined(collection.updatedBy)
      assert.lengthOf(collection.updateHistory, 0)
    })

    it('insert without options', function (done) {
      _id = Collection.insert({ name: 'Test Insert' }, done)
    })

    it('check insert without options', function () {
      assert.ok(_id)

      const collection = Collection.find({ _id }).fetch()[0]

      assert.ok(collection)
      assert.equal(collection.name, 'Test Insert')
      assert.isUndefined(collection.createdAt)
      assert.isUndefined(collection.createdBy)
      assert.isUndefined(collection.updatedAt)
      assert.isUndefined(collection.updatedBy)
      assert.lengthOf(collection.updateHistory, 0)
    })
  })

  context('Update', function () {
    it('update with options', function (done) {
      _id = Collection.insert({ name: 'Test Insert' }, { userId })

      assert.ok(_id)

      Collection.update(
        { _id },
        { $set: { name: 'Test Update' } },
        {
          userId: updateUserId,
          updatedFields: ['name'],
          addedFields: ['date', 'time'],
          removedFields: ['description'],
        },
        done
      )
    })

    it('check update with options', function () {
      const collection = Collection.find({ _id }).fetch()[0]

      assert.ok(collection)
      assert.equal(collection.name, 'Test Update')
      assert.isDefined(collection.createdAt)
      assert.equal(collection.createdBy, userId)
      assert.isDefined(collection.updatedAt)
      assert.equal(collection.updatedBy, updateUserId)
      assert.lengthOf(collection.updateHistory, 1)

      const { addedFields, updatedFields, removedFields } = collection.updateHistory[0]
      assert.lengthOf(addedFields, 2)
      assert.equal(addedFields[0], 'date')
      assert.equal(addedFields[1], 'time')
      assert.lengthOf(updatedFields, 1)
      assert.equal(updatedFields[0], 'name')
      assert.lengthOf(removedFields, 1)
      assert.equal(removedFields[0], 'description')
    })

    it('update without options', function (done) {
      _id = Collection.insert({ name: 'Test Insert' })

      assert.ok(_id)

      Collection.update({ _id }, { $set: { name: 'Test Update' } }, {}, done)
    })

    it('check update without options', function () {
      const collection = Collection.find({ _id }).fetch()[0]

      assert.ok(collection)
      assert.equal(collection.name, 'Test Update')
      assert.isUndefined(collection.createdAt)
      assert.isUndefined(collection.createdBy)
      assert.isUndefined(collection.updatedAt)
      assert.isUndefined(collection.updatedBy)
      assert.lengthOf(collection.updateHistory, 0)
    })
  })
})
