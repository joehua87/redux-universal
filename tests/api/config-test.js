import co from 'co'
import mongoose from 'mongoose'
import uuid from'uuid'

import app from '../../src/api/app.es6'

export function setUpAndTearDown(initialData) {
  before(co.wrap(function* () {
    const collection = uuid.v4()
    const host = `mongodb://localhost/${collection}`
    mongoose.connect(host)

    if (initialData) {
      for (const item of initialData) {
        const Model = mongoose.model(item.schemaName)
        yield Model.ensureIndexes()
        yield Model.create(item.entities)
      }
    }
  }))

  after((done) => {
    mongoose.connection.db.dropDatabase()
    mongoose.connection.close(done)
  })
}

export const request = require('supertest').agent(app.listen())

const chai = require('chai')
chai.use(require('chai-subset'))
chai.use(require('chai-things'))
export const expect = chai.expect
