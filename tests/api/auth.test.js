import { request, setUpAndTearDown } from './config-test'
import { expect } from 'chai'

describe('Auth', () => {
  setUpAndTearDown()

  it('successfully', (done) => {
    request.post(`/login`)
      .type('form')
      .send({ username: 'admin', password: '123456' })
      .expect(200)
      .expect(response => {
        expect(response.body.token).to.be.a('string')
      })
      .end(done)
  })

  it('missing username', (done) => {
    request.post(`/login`)
      .type('form')
      .send({ password: '123456' })
      .expect(400)
      .end((error, response) => {
        expect(response.error.text).to.equal('Require username')
        done()
      })
  })

  it('missing password', (done) => {
    request.post(`/login`)
      .type('form')
      .send({ username: 'admin' }).expect(400)
      .end((error, response) => {
        expect(response.error.text).to.equal('Require password')
        done()
      })
  })

  it('invalid password', (done) => {
    request.post(`/login`)
      .type('form')
      .send({ username: 'admin', password: 'invalid' })
      .expect(400)
      .end((error, response) => {
        expect(response.error.text).to.equal('Invalid password')
        done()
      })
  })

  it('not exists account', (done) => {
    request.post(`/login`)
      .type('form')
      .send({ username: 'notexists', password: '123456' })
      .expect(400)
      .expect(response => {
        expect(response.error.text).to.equal('Account is not exists')
      })
      .end(done)
  })
})
