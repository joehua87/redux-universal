import { createController } from 'base-repository'
import TagRepository from '../repositories/tag.repository.js'

const repository = new TagRepository()

export default createController(repository)
