'use client'

import React, { useState, useEffect } from 'react'
import { Search, UserPlus, Building2, ShoppingCart, X, Plus, Minus, ChevronDown } from 'lucide-react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  category: string
}

interface Customer {
  id: string
  name: string
  email: string
  membershipType: string
  image?: string
}

const customers: Customer[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex@example.com', membershipType: 'Student', image: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'Sarah Wilson', email: 'sarah@example.com', membershipType: 'Faculty', image: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'Mike Brown', email: 'mike@example.com', membershipType: 'Student', image: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', name: 'Emily Davis', email: 'emily@example.com', membershipType: 'Staff', image: 'https://i.pravatar.cc/150?img=4' },
  { id: '5', name: 'Chris Lee', email: 'chris@example.com', membershipType: 'Alumni', image: 'https://i.pravatar.cc/150?img=5' },
]

const orders = [
  { id: 'ORD001', customerName: 'Alex Johnson', total: 50 },
  { id: 'ORD002', customerName: 'Sarah Wilson', total: 75 },
  { id: 'ORD003', customerName: 'Mike Brown', total: 100 },
]

const quickItems = [
  { id: 'day-pass', name: 'Day Pass', price: 10, category: 'Passes' },
  { id: 'locker-rental', name: 'Locker Rental', price: 15, category: 'Rentals' },
  { id: 'towel-service', name: 'Towel Service', price: 5, category: 'Services' },
  { id: 'gym-class', name: 'Gym Class', price: 20, category: 'Classes' },
  { id: 'personal-training', name: 'Personal Training', price: 50, category: 'Services' },
  { id: 'equipment-rental', name: 'Equipment Rental', price: 25, category: 'Rentals' },
]

export default function SalesTab() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Array<Customer | typeof orders[0]>>([])
  const [activeTab, setActiveTab] = useState('quick')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)

  useEffect(() => {
    if (searchQuery) {
      const filteredCustomers = customers.filter(customer => 
        customer.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      const filteredOrders = orders.filter(order => 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults([...filteredCustomers, ...filteredOrders])
      setShowSearchResults(true)
    } else {
      setSearchResults([])
      setShowSearchResults(false)
    }
  }, [searchQuery])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSearchSelect = (result: Customer | typeof orders[0]) => {
    if ('email' in result) {
      setSelectedCustomer(result)
    } else {
      // Handle order selection (you might want to add more functionality here)
      console.log('Selected order:', result)
    }
    setSearchQuery('')
    setShowSearchResults(false)
  }

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(current => {
      const exists = current.find(x => x.id === item.id)
      if (exists) {
        return current.map(x => 
          x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x
        )
      }
      return [...current, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId: string) => {
    setCart(current => current.filter(item => item.id !== itemId))
  }

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(current =>
      current.map(item => {
        if (item.id === itemId) {
          const newQuantity = item.quantity + delta
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
        }
        return item
      })
    )
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center gap-4 max-w-7xl mx-auto">
          <div className="flex-1 relative">
            <input
              type="search"
              placeholder="Search customers or orders..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border rounded-md bg-white "
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {showSearchResults && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                {searchResults.map((result) => (
                  <div
                    key={'email' in result ? result.id : result.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSearchSelect(result)}
                  >
                    {'email' in result ? (
                      <div className="flex items-center">
                        <img src={result.image} alt={result.name} className="w-8 h-8 rounded-full mr-2" />
                        <div>
                          <div className="font-medium">{result.name}</div>
                          <div className="text-sm text-gray-500">{result.email}</div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="font-medium">Order {result.id}</div>
                        <div className="text-sm text-gray-500">{result.customerName} - ${result.total}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="px-4 py-2 bg-green-500 text-white rounded-md flex items-center gap-2 hover:bg-green-600">
            <UserPlus size={20} />
            New Member
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2 hover:bg-blue-600">
            <Building2 size={20} />
            New Organization
          </button>
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full" onClick={() => setIsCartOpen(!isCartOpen)}>
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full flex gap-6">
          {/* Left side - Sales items */}
          <div className="flex-1 bg-white rounded-lg shadow p-4">
            <div className="flex mb-4">
              {['quick', 'recreation', 'bike', 'adventure'].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 ${activeTab === tab ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'} rounded-md mr-2`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            {activeTab === 'quick' && (
              <div className="grid grid-cols-3 gap-4">
                {quickItems.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => addToCart(item)}
                  >
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.category}</div>
                    <div className="text-lg font-bold text-green-600 mt-2">${item.price}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right side - Cart */}
          <div className={`w-96 bg-white rounded-lg shadow p-4 ${isCartOpen ? 'block' : 'hidden'} lg:block`}>
            <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
            {selectedCustomer && (
              <div className="mb-4 p-3 bg-gray-100 rounded-lg">
                <div className="flex items-center gap-3">
                  <img src={selectedCustomer.image} alt={selectedCustomer.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <div className="font-medium">{selectedCustomer.name}</div>
                    <div className="text-sm text-gray-500">{selectedCustomer.email}</div>
                  </div>
                </div>
                <div className="mt-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded inline-block">
                  {selectedCustomer.membershipType}
                </div>
              </div>
            )}
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">${item.price} each</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1 bg-gray-200 rounded" onClick={() => updateQuantity(item.id, -1)}>
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button className="p-1 bg-gray-200 rounded" onClick={() => updateQuantity(item.id, 1)}>
                      <Plus size={16} />
                    </button>
                    <button className="p-1 text-red-500" onClick={() => removeFromCart(item.id)}>
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Total</span>
                <span className="text-2xl font-bold">${total.toFixed(2)}</span>
              </div>
              <button className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}