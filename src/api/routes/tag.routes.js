import controller from '../controllers/tag.controllers'
import { registerRoutes } from 'base-repository'

export default function registerRoute(router) {
  registerRoutes(router, controller, 'tag')
}
