import { auth } from '../controllers/auth.controllers'

export default function registerRoute(router) {
  router.post('/login', auth)
}
