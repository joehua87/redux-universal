import { createController } from 'base-repository'
import CategoryRepository from '../repositories/category.repository.js'

const repository = new CategoryRepository()

export default createController(repository)
