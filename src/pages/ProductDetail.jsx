import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductBySlug } from '../lib/queries'
import { useCart } from '../hooks/useCart'
import './ProductDetail.css'

export default function ProductDetail() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState(null)
  const [activeImg, setActiveImg] = useState(0)
  const [error, setError] = useState('')
  const { addItem } = useCart()

  useEffect(() => {
    getProductBySlug(slug)
      .then(d => { setProduct(d); setActiveImg(0) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug])

  const handleAdd = () => {
    if (!selectedSize) { setError('Please select a size'); return }
    if (!product.inStock) return
    addItem(product, selectedSize)
    setError('')
  }

  if (loading) return (
    <main className="pd" style={{paddingTop:'calc(var(--nav-h) + 3rem)'}}>
      <div className="container pd-skeleton">
        <div className="skeleton" style={{aspectRatio:'3/4'}} />
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="skeleton" style={{height:'2rem', width:'60%'}} />
          <div className="skeleton" style={{height:'1rem', width:'40%'}} />
        </div>
      </div>
    </main>
  )

  if (!product) return (
    <main className="pd" style={{paddingTop:'calc(var(--nav-h) + 3rem)'}}>
      <div className="container" style={{textAlign:'center', padding:'5rem 0'}}>
        <p className="overline" style={{marginBottom:'1.5rem'}}>Product not found</p>
        <Link to="/shop" className="btn-primary">Back to Shop</Link>
      </div>
    </main>
  )

  const images = product.images?.length ? product.images : product.mainImage ? [product.mainImage] : []
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null

  return (
    <main className="pd">
      <div className="pd-breadcrumb container">
        <Link to="/" className="overline pd-crumb">Home</Link>
        <span className="overline pd-crumb-sep">/</span>
        <Link to="/shop" className="overline pd-crumb">Shop</Link>
        <span className="overline pd-crumb-sep">/</span>
        <span className="overline">{product.name}</span>
      </div>

      <div className="pd-grid container">

        {/* ── Image Carousel ── */}
        <div className="pd-carousel">
          {/* Main image */}
          <div className="pd-main-img-wrap">
            {images[activeImg]
              ? <img src={images[activeImg]} alt={product.name} className="pd-img" />
              : <div className="pd-img-placeholder" />
            }
            {product.badge && <span className="pd-badge">{product.badge}</span>}

            {/* Arrow nav */}
            {images.length > 1 && (
              <>
                <button
                  className="pd-arrow pd-arrow--prev"
                  onClick={() => setActiveImg(i => (i - 1 + images.length) % images.length)}
                >‹</button>
                <button
                  className="pd-arrow pd-arrow--next"
                  onClick={() => setActiveImg(i => (i + 1) % images.length)}
                >›</button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="pd-thumbs">
              {images.map((img, i) => (
                <button
                  key={i}
                  className={`pd-thumb${activeImg === i ? ' active' : ''}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Info ── */}
        <div className="pd-info">
          <p className="overline pd-cat">{product.category}</p>
          <h1 className="pd-name">{product.name}</h1>

          <div className="pd-price-row">
            <span className="pd-price">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <>
                <span className="pd-original">₹{product.originalPrice.toLocaleString()}</span>
                <span className="pd-discount">−{discount}%</span>
              </>
            )}
          </div>

          {product.description && (
            <p className="pd-desc">{product.description}</p>
          )}

          {product.sizes?.length > 0 && (
            <div className="pd-sizes">
              <p className="overline pd-sizes-label">Select Size</p>
              <div className="pd-size-grid">
                {product.sizes.map(s => (
                  <button
                    key={s}
                    className={`pd-size${selectedSize === s ? ' active' : ''}`}
                    onClick={() => { setSelectedSize(s); setError('') }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && <p className="pd-error">{error}</p>}

          <div className="pd-actions">
            {product.inStock ? (
              <button className="pd-add" onClick={handleAdd}>Add to Bag</button>
            ) : (
              <button className="pd-add pd-add--oos" disabled>Sold Out</button>
            )}
            <a
              href={`https://wa.me/917780140507?text=${encodeURIComponent(`Hi, I'm interested in: ${product.name} (₹${product.price.toLocaleString()})`)}`}
              target="_blank" rel="noopener"
              className="pd-whatsapp"
            >
              Enquire on WhatsApp ↗
            </a>
          </div>

          <div className="pd-meta">
            <p className="overline">Free shipping across India</p>
            <p className="overline">WhatsApp payment accepted</p>
            <p className="overline">Genuine product guaranteed</p>
          </div>
        </div>
      </div>
    </main>
  )
}