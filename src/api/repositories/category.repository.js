import mongoose from 'mongoose'
import * as CategorySchema from '../models/category.schema.js'
import { BaseRepository } from 'base-repository'

const Category = mongoose.model(CategorySchema.schemaName, CategorySchema.schema)

export default class CategoryRepository extends BaseRepository {
  constructor() {
    super(Category, CategorySchema.config)
  }
}
