import { Schema } from 'mongoose'
import { constants, timePlugin } from 'base-repository'

export const schemaName = 'Post'
export const routeName = 'posts'

export const schemaDefinition = {
  slug: { type: String, required: true },
  title: { type: String, required: true },
  isFeatured: { type: Boolean, required: true, default: false },
  isShowed: { type: Boolean, required: true, default: true },
  summary: String,
  body: String,
  wordCount: Number,
  keywords: String,
  tags: [{
    slug: { type: String, required: true },
    name: String,
    _id: { type: Schema.ObjectId, ref: 'Tag' }
  }],
  categories: [{
    slug: { type: String, required: true },
    name: String,
    _id: { type: Schema.ObjectId, ref: 'Category' }
  }],
  images: {
    featured: {
      src: String,
      title: String,
      width: Number // 800, 400, 160, 80
    },
    default: {
      src: String,
      title: String,
      width: Number // 800, 400, 160, 80
    },
    imageSet: [{
      src: String,
      title: String,
      width: Number // 800, 400, 160, 80
    }]
  },
  seo: {
    title: String,
    metaDescription: String,
    focusKeyword: String,
    keywords: String
  }
}

export const schema = new Schema(schemaDefinition, { collection: schemaName })
schema.index({ 'tags.slug': 1 })
schema.index({ 'categories.slug': 1 })
schema.index(
  {
    title: 'text', summary: 'text', keywords: 'text', body: 'text'
  },
  {
    weights: { title: 10, summary: 5, keywords: 5, body: 3 }
  })
schema.plugin(timePlugin)

export const config = {
  key: 'slug',
  defaultLimit: 10,
  defaultSort: '-createdTime',
  queryProjection: 'slug title isShowed isFeatured summary tags seo categories images createdTime modifiedTime',
  detailProjection: 'slug title isShowed isFeatured summary body tags categories images seo createdTime modifiedTime',
  fields: [
    {
      filterField: 'keyword',
      compareType: constants.FULL_TEXT,
      dbType: constants.STRING
    },
    {
      filterField: 'isFeatured',
      dbField: 'isFeatured',
      compareType: constants.EQUAL,
      dbType: constants.BOOLEAN
    },
    {
      filterField: 'tag',
      dbField: 'tags.slug',
      compareType: constants.EQUAL,
      dbType: constants.STRING
    },
    {
      filterField: 'category',
      dbField: 'categories.slug',
      compareType: constants.EQUAL,
      dbType: constants.STRING
    },
    {
      filterField: 'slug',
      dbField: 'slug',
      compareType: constants.REG_EX_I,
      dbType: constants.STRING
    },
    {
      filterField: 'title',
      dbField: 'title',
      compareType: constants.REG_EX_I,
      dbType: constants.STRING
    },
    {
      filterField: 'text',
      compareType: constants.FULL_TEXT,
      dbType: constants.STRING
    }
  ]
}
