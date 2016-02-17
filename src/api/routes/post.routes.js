import controller from '../controllers/post.controllers.js'
import { registerRoutes } from 'base-repository'

export default function registerRoute(router) {
  registerRoutes(router, controller, 'post')
}
