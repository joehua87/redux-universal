import jwt from 'koa-jwt'

export function* auth() {
  const { username, password } = this.request.body
  if (!username) this.throw(400, 'Require username')
  if (!password) this.throw(400, 'Require password')

  if (username !== 'admin') {
    this.throw(400, 'Account is not exists')
  }

  if (password !== '123456') {
    this.throw(400, 'Invalid password')
  }

  const token = jwt.sign({ username, password }, 'shared-secret')
  this.status = 200
  this.body = { token }
}
