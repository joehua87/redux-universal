import supertest from 'supertest'
import cheerio from 'cheerio'
import { expect } from 'chai'

let request
const rootDir = require('path').resolve(__dirname, '..')

// TODO Try to exit to end test
function config(root, callback) {
  const WebpackIsomorphicTools = require('webpack-isomorphic-tools')
  global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools'))
    .development(true)
    .server(root, () => {
      callback()
    })
}

describe('Server Rendering', () => {
  before((done) => {
    config(rootDir, () => {
      const app = require('../src/server/server.universal').default
      request = supertest(app)
      done()
    })
  })

  describe('/user', () => {
    let $

    before((done) => {
      request.get('/user')
        .end((err, res) => {
          if (err) throw err
          $ = cheerio.load(res.text)
          done()
        })
    })

    it('should has users rendered', (done) => {
      expect($('span.user').length).to.equal(30)
      done()
    })
  })

  describe('/user:username', () => {
    let $
    before((done) => {
      request.get('/user/tj')
        .end((err, res) => {
          if (err) throw err
          $ = cheerio.load(res.text)
          done()
        })
    })

    it('should has users rendered', (done) => {
      expect($('span.user').length).to.equal(30)
      done()
    })

    it('should has user detail rendered', (done) => {
      expect($('h1').text()).to.equal('tj')
      done()
    })
  })
})
