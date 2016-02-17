import mongoose from 'mongoose'
import faker from 'faker'
import slugify from 'slug'
import co from 'co'
import range from 'lodash/range'
import random from 'lodash/random'
import sampleSize from 'lodash/sampleSize'

import PostRepository from '../repositories/post.repository'
import CategorytRepository from '../repositories/category.repository'
import TagRepository from '../repositories/tag.repository'

const env = process.env.NODE_ENV || 'dev'
const config = require('../config')[env]

const postRepository = new PostRepository()
const categorytRepository = new CategorytRepository()
const tagRepository = new TagRepository()

const categoryNames = ['Beauty', 'Fashion', 'Travel', 'Technology', 'Computer', 'Fitness']
const tagNames = ['beauty', 'fashion', 'foods', 'drinks', 'build muscle', 'lose weight']

function generateCategories() {
  return categoryNames.map((name) => ({
    name,
    slug: slugify(name, { lower: true })
  }))
}

function generateTags() {
  return tagNames.map((name) => ({
    name,
    slug: slugify(name)
  }))
}

const categories = generateCategories()
const tags = generateTags()

// console.log(Object.keys(faker))

/**
 * Generate posts
 * @param count - Number of posts
 * @param _categories - categories returned from mongoose (has _id)
 * @param _tags - tags returned from mongoose (has _id)
 * @returns {Array|*}
 */
function generatePosts(count:Number, _categories, _tags) {
  return range(count).map(() => {
    const title = faker.lorem.words(random(3, 7)).join(' ')
    const slug = slugify(title, { lower: true })
    return {
      title,
      slug,
      body: faker.lorem.paragraphs(3),
      tags: sampleSize(_tags, random(1, 3)),
      categories: sampleSize(_categories, random(1, 3)),
      seo: {
        title,
        metaDescription: faker.lorem.sentences(3),
        focusKeyword: faker.lorem.words(random(1, 3)).join(' '),
        keywords: range(random(1, 3)).map(() => faker.lorem.words(random(1, 3)))
      }
    }
  })
}

co(function*() {
  // console.log(categories)
  // console.log(tags)

  mongoose.connect(config.db)

  // Drop all old data
  console.log('Remove old data')
  yield postRepository._Model.remove({})
  yield categorytRepository._Model.remove({})
  yield tagRepository._Model.remove({})

  // Import categories & tags first to get _id
  const returnedCategories = yield categorytRepository.insert(categories)
  console.log(`${returnedCategories.length} categories inserted`)

  const returnedTags = yield tagRepository.insert(tags)
  console.log(`${returnedTags.length} tags inserted`)

  const posts = generatePosts(100, returnedCategories, returnedTags)
  const returnedPosts = yield postRepository.insert(posts)
  console.log(`${returnedPosts.length} posts inserted`)

  mongoose.connection.close()
}).catch((err) => {
  mongoose.connection.close()
  console.log(err.stack)
  if (err.errors) { // Print mongoose errors
    console.log(err.errors)
  }
})
