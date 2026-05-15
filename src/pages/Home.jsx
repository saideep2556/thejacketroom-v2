import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getFeaturedProducts } from '../lib/queries'
import ProductCard from '../components/ProductCard'
import './Home.css'
import heroBanner from '../assets/video-home-banner.mp4'

const MOCK = [
  { _id:'1', name:'Milano Leather', slug:{current:'milano-leather'}, price:8999, category:'Leather', mainImage:null, badge:'New', inStock:true },
  { _id:'2', name:'Tokyo Bomber', slug:{current:'tokyo-bomber'}, price:5499, originalPrice:6999, category:'Bomber', mainImage:null, badge:'Sale', inStock:true },
  { _id:'3', name:'Heritage Overcoat', slug:{current:'heritage-overcoat'}, price:12999, category:'Overcoat', mainImage:null, inStock:true },
  { _id:'4', name:'Raw Denim Jacket', slug:{current:'raw-denim'}, price:4299, category:'Denim', mainImage:null, badge:'New', inStock:false },
]

export default function Home() {
  const [products, setProducts] = useState(MOCK)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFeaturedProducts()
      .then(d => { if (d?.length) setProducts(d) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="home">

      {/* ── HERO ── */}
      <section className="hero-video">
  <video
    className="hero-video__bg"
    src={heroBanner}
    autoPlay
    muted
    loop
    playsInline
  />
  <div className="hero-video__overlay" />

  <div className="hero-video__content">
    <motion.p
      className="hero-video__overline"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      Hyderabad · Est. 2026
    </motion.p>

    <motion.h1
      className="hero-video__title"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.35 }}
    >
      THE<br />
      <span className="hero-video__italic">Jacket</span>
      <br />
      ROOM
    </motion.h1>

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.65 }}
    >
      <Link to="/shop" className="hero-video__cta">SHOP NOW</Link>
    </motion.div>
  </div>
</section>
      {/* ── TICKER ── */}
      <div className="ticker">
        <div className="ticker-track">
          {Array(8).fill(null).map((_,i) => (
            <span key={i} className="ticker-item">
              LEATHER &nbsp;·&nbsp; BOMBER &nbsp;·&nbsp; DENIM &nbsp;·&nbsp; OVERCOAT &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── FEATURED ── */}
      <section className="section container">
        <div className="section-head">
          <h2 className="section-title">NEW IN</h2>
          <Link to="/shop" className="section-all overline">View All →</Link>
        </div>

        {loading ? (
          <div className="grid">
            {[1,2,3,4].map(i => <div key={i} className="skeleton" style={{aspectRatio:'3/4'}} />)}
          </div>
        ) : (
          <div className="grid">
            {products.slice(0,4).map((p, i) => (
              <motion.div key={p._id}
                initial={{ opacity:0, y:24 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, margin:'-60px' }}
                transition={{ duration:0.5, delay: i * 0.08 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ── EDITORIAL STRIP ── */}
      <section className="editorial">
        <div className="editorial-inner container">
          <div className="editorial-text">
            <p className="overline">The Philosophy</p>
            <h2 className="editorial-h2">
              Claim what<br />
              <em>can't be</em><br />
              recreated.
            </h2>
          </div>
          <div className="editorial-body-text">
            <p>
              Every jacket in our collection is sourced, curated, and verified.
              No replicas. No fast fashion. Only pieces that carry weight —
              in craft, in story, in the way they wear over time.
            </p>
            <a href="https://wa.me/917780140507" target="_blank" rel="noopener" className="btn-outline" style={{display:'inline-block', marginTop:'1.5rem'}}>
              Talk to us on WhatsApp ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── FULL GRID (all products) ── */}
      {/* {products.length > 4 && (
        <section className="section container">
          <div className="section-head">
            <h2 className="section-title">ALL PIECES</h2>
          </div>
          <div className="grid grid--5">
            {products.slice(4).map((p,i) => (
              <motion.div key={p._id}
                initial={{ opacity:0, y:24 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, margin:'-60px' }}
                transition={{ duration:0.5, delay: i * 0.06 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        </section>
      )} */}
      <h1 className="home-title">THE JACKET ROOM</h1>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner container">
          <a href="mailto:paarthivsai06@gmail.com" className="footer-link">Contact Us</a>
          <div className="footer-links">
            <Link to="/shop" className="footer-link">Shop</Link>
            <a href="https://wa.me/917780140507" target="_blank" rel="noopener" className="footer-link">WhatsApp</a>
            <a href="https://instagram.com" target="_blank" rel="noopener" className="footer-link">Instagram</a>
          </div>
          <p className="footer-copy">© 2024 The Jacket Room. Hyderabad.</p>
        </div>
      </footer>

    </main>
  )
}
