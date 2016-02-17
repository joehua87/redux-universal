import mongoose from 'mongoose'
import * as TagSchema from '../models/tag.schema.js'
import { BaseRepository } from 'base-repository'

const Tag = mongoose.model(TagSchema.schemaName, TagSchema.schema)

export default class TagRepository extends BaseRepository {
  constructor() {
    super(Tag, TagSchema.config)
  }
}
