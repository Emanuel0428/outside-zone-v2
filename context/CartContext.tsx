import React, { createContext, useContext, useReducer, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

interface CartItem {
  id: string
  title: string
  price: number
  image: string
  quantity: number
  slug: string
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartState }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  isLoaded: boolean
} | null>(null)

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'LOAD_CART':
      return action.payload
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        const newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        return {
          items: newItems,
          total: state.total + action.payload.price,
          itemCount: state.itemCount + 1,
        }
      }
      const newItems = [...state.items, { ...action.payload, quantity: 1 }]
      return {
        items: newItems,
        total: state.total + action.payload.price,
        itemCount: state.itemCount + 1,
      }
    }
    case 'REMOVE_ITEM': {
      const item = state.items.find(item => item.id === action.payload)
      if (!item) return state
      return {
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - (item.price * item.quantity),
        itemCount: state.itemCount - item.quantity,
      }
    }
    case 'UPDATE_QUANTITY': {
      const item = state.items.find(item => item.id === action.payload.id)
      if (!item) return state
      if (action.payload.quantity <= 0) {
        return {
          items: state.items.filter(item => item.id !== action.payload.id),
          total: state.total - (item.price * item.quantity),
          itemCount: state.itemCount - item.quantity,
        }
      }
      const quantityDiff = action.payload.quantity - item.quantity
      return {
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.total + (item.price * quantityDiff),
        itemCount: state.itemCount + quantityDiff,
      }
    }
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
        itemCount: 0,
      }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
  })

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('outside-zone-cart')
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart)
          dispatch({ type: 'LOAD_CART', payload: parsedCart })
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
      setIsLoaded(true)
    }
  }, [])

  // Save cart to localStorage whenever state changes
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      try {
        localStorage.setItem('outside-zone-cart', JSON.stringify(state))
      } catch (error) {
        console.error('Error saving cart to localStorage:', error)
      }
    }
  }, [state, isLoaded])

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...item, quantity: 1 } })
  }

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <CartContext.Provider
      value={{ state, dispatch, addToCart, removeFromCart, updateQuantity, clearCart, isLoaded }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Export a dynamic version of CartProvider that only runs on client
export const DynamicCartProvider = dynamic(
  () => Promise.resolve(CartProvider),
  { ssr: false }
)

export const useCart = () => {
  if (typeof window === 'undefined') {
    return {
      state: { items: [], total: 0, itemCount: 0 },
      dispatch: () => {},
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      isLoaded: false,
    }
  }
  
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}