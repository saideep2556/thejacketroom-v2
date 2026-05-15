import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import './Navbar.css'

export default function Navbar() {
  const { count, setIsOpen } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <div className="nav-inner">

        {/* Left */}
        <nav className="nav-links nav-links--left">
          <NavLink to="/shop" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Shop
          </NavLink>
          <a href="https://wa.me/917780140507" target="_blank" rel="noopener" className="nav-link">
            Custom
          </a>
        </nav>

        {/* Logo */}
        <Link to="/" className="nav-logo">
          THE JACKET ROOM
        </Link>

        {/* Right */}
        <div className="nav-links nav-links--right">
          <button className="nav-link nav-cart-btn" onClick={() => setIsOpen(true)}>
            Bag {count > 0 && <span className="nav-count">({count})</span>}
          </button>
          <button
            className={`nav-burger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
          >
            <span /><span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="nav-mobile">
          <Link to="/shop" className="nav-mobile-link">Shop All</Link>
          <a href="https://wa.me/917780140507" target="_blank" rel="noopener" className="nav-mobile-link">Custom Order</a>
          <button className="nav-mobile-link" onClick={() => { setIsOpen(true); setMenuOpen(false) }}>
            Bag {count > 0 && `(${count})`}
          </button>
        </div>
      )}
    </header>
  )
}
