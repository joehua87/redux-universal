import { createController } from 'base-repository'
import PostRepository from '../repositories/post.repository.js'

const repository = new PostRepository()

export default createController(repository)
