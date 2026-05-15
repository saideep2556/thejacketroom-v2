import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getAllProducts } from '../lib/queries'
import ProductCard from '../components/ProductCard'
import './Shop.css'

const SORT_OPTIONS = ['Newest', 'Price: Low to High', 'Price: High to Low']

export default function Shop() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [categories, setCategories] = useState(['All'])
  const [cat, setCat] = useState('All')
  const [sort, setSort] = useState('Newest')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllProducts()
      .then(d => {
        if (d?.length) {
          setProducts(d)
          setFiltered(d)
          // Build categories dynamically from Sanity data
          const unique = ['All', ...new Set(d.map(p => p.category).filter(Boolean))]
          setCategories(unique)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    let list = cat === 'All' ? [...products] : products.filter(p => p.category === cat)
    if (sort === 'Price: Low to High') list.sort((a,b) => a.price - b.price)
    if (sort === 'Price: High to Low') list.sort((a,b) => b.price - a.price)
    setFiltered(list)
  }, [cat, sort, products])

  return (
    <main className="shop">
      <div className="shop-header container">
        <h1 className="shop-title">ALL JACKETS</h1>
        <p className="overline">{filtered.length} pieces</p>
      </div>

      <div className="shop-toolbar container">
        <div className="shop-cats">
          {categories.map(c => (
            <button
              key={c}
              className={`shop-cat${cat === c ? ' active' : ''}`}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <select className="shop-sort" value={sort} onChange={e => setSort(e.target.value)}>
          {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
        </select>
      </div>

      <div className="container">
        {loading ? (
          <div className="shop-grid">
            {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton" style={{aspectRatio:'3/4'}} />)}
          </div>
        ) : filtered.length === 0 ? (
          <p className="shop-empty overline">No jackets in this category yet.</p>
        ) : (
          <div className="shop-grid">
            {filtered.map((p,i) => (
              <motion.div key={p._id}
                initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }}
                transition={{ duration:0.4, delay: i * 0.05 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}