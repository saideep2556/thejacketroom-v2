import { useCart } from '../hooks/useCart'
import './Cart.css'

export default function Cart() {
  const { items, isOpen, setIsOpen, removeItem, updateQty, total, clearCart, buildWhatsAppMessage } = useCart()

  if (!isOpen) return null

  return (
    <>
      <div className="cart-overlay" onClick={() => setIsOpen(false)} />
      <aside className="cart">
        <div className="cart-header">
          <span className="cart-title">BAG ({items.length})</span>
          <button className="cart-close" onClick={() => setIsOpen(false)}>✕</button>
        </div>

        <div className="cart-body">
          {items.length === 0 ? (
            <p className="cart-empty">Your bag is empty.</p>
          ) : (
            items.map(item => (
              <div key={item.key} className="cart-item">
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.product.name}</p>
                  <p className="cart-item-meta">Size: {item.size}</p>
                  <p className="cart-item-price">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                </div>
                <div className="cart-item-actions">
                  <div className="cart-qty">
                    <button onClick={() => updateQty(item.key, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQty(item.key, item.quantity + 1)}>+</button>
                  </div>
                  <button className="cart-remove" onClick={() => removeItem(item.key)}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>TOTAL</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <a href={buildWhatsAppMessage()} target="_blank" rel="noopener" className="cart-checkout" onClick={clearCart}>
              ORDER ON WHATSAPP
            </a>
          </div>
        )}
      </aside>
    </>
  )
}
