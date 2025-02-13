import { useState } from "react";
import { ShoppingCart, X, Plus, Minus } from "lucide-react";
import { SearchBar } from "@/components/SearchBar/SearchBar";


interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

const quickItems = [
  { id: "day-pass", name: "Day Pass", price: 10, category: "Passes" },
  {
    id: "locker-rental",
    name: "Locker Rental",
    price: 15,
    category: "Rentals",
  },
  {
    id: "towel-service",
    name: "Towel Service",
    price: 5,
    category: "Services",
  },
  { id: "gym-class", name: "Gym Class", price: 20, category: "Classes" },
  {
    id: "personal-training",
    name: "Personal Training",
    price: 50,
    category: "Services",
  },
  {
    id: "equipment-rental",
    name: "Equipment Rental",
    price: 25,
    category: "Rentals",
  },
];

export default function SalesTab() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState("quick");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSelectCustomer = (user: any) => {
    setSelectedCustomer(user);
  };

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((current) => {
      const exists = current.find((x) => x.id === item.id);
      if (exists) {
        return current.map((x) =>
          x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x
        );
      }
      return [...current, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((current) => current.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((current) =>
      current.map((item) => {
        if (item.id === itemId) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      })
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div className="flex flex-col h-[90vh]">
        {/* Top Bar */}
        <div className="p-4 border-b">
          <div className="flex gap-4 w-3/4">
            <div className="flex-1 relative mr-4 ">
              <SearchBar
                placeholder="Search customers or orders..."
                onSelect={(user) => handleSelectCustomer(user)} // Set selected user
                onClear={() => setSelectedCustomer(null)} // Clear selection
                variant="popup" // Use "popup" for dropdown style
                triggerSearchOnClick={true} // Search only on button click
              />
            </div>
            <div className="">

            </div>
            {/* // add new member button
            // add new org button */}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 h-full">
          <div className="mx-auto flex h-[100%]">
            {/* Left side - Sales items */}
            <div className="flex-1 p-4 border-r">
              <div className="flex mb-4">
                {["quick", "recreation", "bike", "adventure"].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 ${
                      activeTab === tab
                        ? "bg-blue-500 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    } rounded-md mr-2`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              {activeTab === "quick" && (
                <div className="grid grid-cols-3 gap-4">
                  {quickItems.map((item) => (
                    <div
                      key={item.id}
                      className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => addToCart(item)}
                    >
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">
                        {item.category}
                      </div>
                      <div className="text-lg font-bold text-green-600 mt-2">
                        ${item.price}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right side - Shopping Cart */}
            <div
              className={`w-96  rounded-lg p-4 ${
                isCartOpen ? "block" : "hidden"
              } lg:block`}
            >
              <div className="flex justify-between">
                <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
                <button
                  className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                  onClick={() => setIsCartOpen(!isCartOpen)}
                >
                  <ShoppingCart size={24} />
                  {cart.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cart.length}
                    </span>
                  )}
                </button>
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cart.length}
                  </span>
                )}
              </div>
              {selectedCustomer && (
                <div className="mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedCustomer.image}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-medium">
                        {selectedCustomer.firstName} {selectedCustomer.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {selectedCustomer.membershipType}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded inline-block">
                    {selectedCustomer.phoneNumber}
                  </div>
                </div>
              )}
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">
                        ${item.price} each
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="p-1 bg-gray-200 rounded"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        className="p-1 bg-gray-200 rounded"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        className="p-1 text-red-500"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Total</span>
                  <span className="text-2xl font-bold">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <button className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
