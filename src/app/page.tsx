import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header style={{ backgroundColor: '#301d69ff'}}
       className="shadow-md p-4 flex items-center justify-between">
        <div className="w-24 h-8 bg-gray-300 flex items-center justify-center text-sm">
          Logo
        </div>

        <div className="flex-1 max-w-xl mx-4">
          <input
            type="text"
            placeholder="Search for products..."
            style={{ color: 'black' }}
            className="bg-white w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>

        <div className="flex items-center space-x-2 cursor-pointer">
          <span className="material-icons">shopping_cart</span>
          <span className="text-sm font-medium">(0)</span>
        </div>
      </header>

      <main className="p-6">
        <div className="text-gray-600 text-center">
          Placeholder for homepage content
        </div>
      </main>
    </div>
  );
}
