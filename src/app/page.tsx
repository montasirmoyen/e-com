
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="">
        <header style={{ backgroundColor: '#640a22ff' }}
          className="flex items-center justify-between">
          <Image
            src="/logo.png"
            alt="Logo"
            className="ml-2 p-2"
            width={125}
            height={50}
          />
        </header>
      </div>

      <header style={{ backgroundColor: '#d8043cff' }}
        className="shadow-lg p-3 flex items-center justify-between">
        <div className="flex-1 max-w-xl">
          <input
            type="text"
            placeholder="Search for products..."
            style={{ color: 'black' }}
            className="bg-white w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>

        <div className="flex items-center space-x-2 cursor-pointer">
          <span className="material-icons">
            <Image
              src="/cart.png"
              alt="Cart"
              width={24}
              height={24}
            />
          </span>
          <span className="text-sm font-medium">(0)</span>
        </div>
      </header>

      <main className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 gap-6">
          {require("@/mock-data/shop-data.json").map((item: any) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
            >
              <div className="h-48 w-full flex items-center justify-center mb-4">
                <Image
                  src={item.image}
                  alt={item.name || "Product Image"}
                  width={150}
                  height={150}
                  className="object-contain max-h-full"
                />
              </div>

              <h2 className="text-xl font-bold mb-2 text-center">{item.name}</h2>

              <p className="text-gray-700 mb-2">${item.price}</p>

              <button
                style={{ backgroundColor: "#d8043cff" }}
                className="text-white px-4 py-2 rounded mt-auto"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
}
