import { request, setUpAndTearDown } from './config-test'
import { expect } from 'chai'

describe('Routes', () => {
  setUpAndTearDown()
  const routes = ['post', 'category', 'tag']

  routes.forEach(route => {
    it(`${route} - not authenticated`, done => {
      request.get(`/${route}/query`)
        .expect(401)
        .end(done)
    })
  })

  let token

  it('Get token', (done) => {
    request.post(`/login`)
      .type('form')
      .send({ username: 'admin', password: '123456' })
      .expect(200)
      .expect(response => {
        expect(response.body.token).to.be.a('string')
        token = response.body.token
      })
      .end(done)
  })

  routes.forEach(route => {
    it(`${route} - successfully`, done => {
      request.get(`/${route}/query`)
        .set('Authorization', `bearer ${token}`)
        .expect(200)
        .expect((response) => {
          expect(response.body).to.have.property('entities')
        })
        .end(done)
    })
  })
})
