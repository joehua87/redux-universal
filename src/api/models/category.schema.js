import { Schema } from 'mongoose'
import { constants, timePlugin } from 'base-repository'

export const schemaName = 'Category'
export const routeName = 'category'

export const schemaDefinition = {
  slug: { type: String, required: true },
  name: { type: String, required: true },
  isFeatured: { type: Boolean, required: true, default: false },
  isShowed: { type: Boolean, required: true, default: true },
  description: String,
  style: String,
  parent: {
    slug: String,
    _id: { type: Schema.ObjectId, ref: 'Category' }
  },
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
  postCount: Number,
  seo: {
    title: String,
    keywords: String,
    metaDescription: String
  },
  note: String
}

export const schema = new Schema(schemaDefinition, { collection: schemaName })
schema.index({ slug: 1 }, { unique: true })
schema.index({ name: 'text', description: 'text' }, { weights: { name: 10, description: 3 } })
schema.plugin(timePlugin)

export const config = {
  key: 'slug',
  defaultLimit: 10,
  queryProjection: 'slug name isShowed style parent images',
  detailProjection: 'slug name isShowed style parent images description seo images createdTime modifiedTime',
  fields: [
    {
      filterField: 'keyword',
      compareType: constants.FULL_TEXT,
      dbType: constants.STRING
    },
    {
      filterField: 'website',
      dbField: 'website',
      compareType: constants.EQUAL,
      dbType: constants.STRING
    },
    {
      filterField: 'isFeatured',
      dbField: 'isFeatured',
      compareType: constants.EQUAL,
      dbType: constants.BOOLEAN
    },
    {
      filterField: 'slug',
      dbField: 'slug',
      compareType: constants.REG_EX_I,
      dbType: constants.STRING
    },
    {
      filterField: 'name',
      dbField: 'name',
      compareType: constants.REG_EX_I,
      dbType: constants.STRING
    },
    {
      filterField: 'parent',
      dbField: 'parent.slug',
      compareType: constants.EQUAL,
      dbType: constants.STRING
    }
  ]
}
