import { request, setUpAndTearDown } from './config-test'
import { expect } from 'chai'

describe('Routes', () => {
  setUpAndTearDown()
  const routes = ['post', 'category', 'tag']

  routes.forEach(route => {
    it(`${route} route should work`, done => {
      request.get(`/${route}/query`)
        .query({ key: 'hello' })
        .expect(200)
        .expect(response => {
          expect(response.body.count).to.equal(0)
          expect(response.body.entities).to.deep.equal([])
        })
        .end(done)
    })
  })
})
