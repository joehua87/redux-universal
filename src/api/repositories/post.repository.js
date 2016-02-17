import mongoose from 'mongoose'
import * as PostSchema from '../models/post.schema.js'
import { BaseRepository } from 'base-repository'

const Post = mongoose.model(PostSchema.schemaName, PostSchema.schema)

export default class PostRepository extends BaseRepository {
  constructor() {
    super(Post, PostSchema.config)
  }
}
