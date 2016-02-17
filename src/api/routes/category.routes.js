import controller from '../controllers/category.controllers'
import { registerRoutes } from 'base-repository'

export default function registerRoute(router) {
  registerRoutes(router, controller, 'category')
}
