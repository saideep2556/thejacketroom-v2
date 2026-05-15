import { client } from './sanity'

export const getFeaturedProducts = () =>
  client.fetch(`*[_type == "product" && featured == true] | order(_createdAt desc)[0...8]{
    _id, name, slug, price, originalPrice, category,
    "mainImage": images[0].asset->url,
    badge, inStock, sizes
  }`)

export const getAllProducts = () =>
  client.fetch(`*[_type == "product"] | order(_createdAt desc){
    _id, name, slug, price, originalPrice, category,
    "mainImage": images[0].asset->url,
    badge, inStock, sizes
  }`)

export const getProductBySlug = (slug) =>
  client.fetch(`*[_type == "product" && slug.current == $slug][0]{
    _id, name, slug, price, originalPrice, category, description,
    "mainImage": images[0].asset->url,
    "images": images[].asset->url,
    badge, inStock, sizes, featured
  }`, { slug })
