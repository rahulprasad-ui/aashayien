import { getPayload } from 'payload'
import configPromise from '@payload-config'

const debugBlogData = async () => {
  const payload = await getPayload({ config: configPromise })

  console.log('--- Debugging Blog Data ---')

  // Check Categories
  const categories = await payload.find({
    collection: 'categories',
    limit: 10,
  })
  console.log(`Total Categories: ${categories.totalDocs}`)
  if (categories.docs.length > 0) {
    console.log('Sample Category:', JSON.stringify(categories.docs[0], null, 2))
  } else {
    console.log('No categories found.')
  }

  // Check Posts
  const posts = await payload.find({
    collection: 'posts',
    limit: 10,
  })
  console.log(`Total Posts: ${posts.totalDocs}`)
  if (posts.docs.length > 0) {
    console.log('Sample Post (Title):', posts.docs[0].title)
    console.log('Sample Post (Categories):', JSON.stringify(posts.docs[0].categories, null, 2))
    console.log('Sample Post (Featured):', posts.docs[0].featured)
  } else {
    console.log('No posts found.')
  }

  process.exit(0)
}

debugBlogData()
