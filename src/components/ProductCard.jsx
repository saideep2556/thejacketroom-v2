import { Link } from 'react-router-dom'
import { urlFor } from '../lib/sanity'
import './ProductCard.css'

export default function ProductCard({ product }) {
  const { name, slug, price, originalPrice, mainImage, badge, inStock, category } = product
const imgUrl = mainImage || null
const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : null

  return (
    <Link to={`/product/${slug.current}`} className={`pcard${!inStock ? ' pcard--oos' : ''}`}>
      {/* Image */}
      <div className="pcard-img-wrap">
        {imgUrl
          ? <img src={imgUrl} alt={name} className="pcard-img" loading="lazy" />
          : <div className="pcard-img-placeholder" />
        }
        {badge && <span className="pcard-badge">{badge}</span>}
        {!inStock && <div className="pcard-oos">Sold Out</div>}
      </div>

      {/* Info */}
      <div className="pcard-info">
        <div className="pcard-category overline">{category}</div>
        <p className="pcard-name">{name}</p>
        <div className="pcard-price-row">
          <span className="pcard-price">₹{price.toLocaleString()}</span>
          {originalPrice && (
            <>
              <span className="pcard-original">₹{originalPrice.toLocaleString()}</span>
              <span className="pcard-discount">−{discount}%</span>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}
