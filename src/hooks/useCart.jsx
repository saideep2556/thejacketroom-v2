import { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const addItem = useCallback((product, size, quantity = 1) => {
    setItems(prev => {
      const key = `${product._id}-${size}`
      const existing = prev.find(i => i.key === key)
      if (existing) return prev.map(i => i.key === key ? { ...i, quantity: i.quantity + quantity } : i)
      return [...prev, { key, product, size, quantity }]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((key) => setItems(prev => prev.filter(i => i.key !== key)), [])

  const updateQty = useCallback((key, qty) => {
    if (qty < 1) return
    setItems(prev => prev.map(i => i.key === key ? { ...i, quantity: qty } : i))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const total = items.reduce((s, i) => s + i.product.price * i.quantity, 0)
  const count = items.reduce((s, i) => s + i.quantity, 0)

  const buildWhatsAppMessage = () => {
    const WHATSAPP_NUMBER = '917780140507'
    const lines = items.map(i =>
      `• ${i.product.name} (Size: ${i.size}) x${i.quantity} — ₹${(i.product.price * i.quantity).toLocaleString()}`
    )
    const message = [
      '*New Order — The Jacket Room*', '',
      ...lines, '',
      `*Total: ₹${total.toLocaleString()}*`, '',
      'Please confirm availability and share payment details.'
    ].join('\n')
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, count, isOpen, setIsOpen, buildWhatsAppMessage }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
