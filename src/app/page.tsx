
import Image from "next/image";
import Navbar from "../components/nav-bar";

export default function Home() {
  return (
    <Navbar>
      <div className="min-h-screen bg-gray-100">
        <div className="p-6">
          <h2 className="text-xl text-gray-700 font-bold">Tech Recommendations</h2>
          <p className="text-gray-500 mb-2">Tech products you may like</p>
        </div>

        <main className="p-2">
          <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 gap-6">
            {require("@/mock-data/shop-data.json")
              .filter((item: any) => [9, 10, 11, 12, 13].includes(item.id))
              .map((item: any) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
                >
                  <div className="h-48 w-full flex items-center justify-center mb-4">
                    <Image
                      src={item.image}
                      alt="Product Image"
                      width={150}
                      height={150}
                      className="object-contain max-h-full"
                    />
                  </div>
                  <h2 className="text-xl text-gray-700 font-bold mb-2 text-center">
                    {item.title}
                  </h2>
                  <p className="text-gray-700 mb-2">${item.price}</p>
                  <button
                    style={{ backgroundColor: "#d8043cff" }}
                    className="text-white px-4 py-2 rounded mt-auto"
                  >
                    View Item
                  </button>
                </div>
              ))}
          </div>
        </main>

        <div className="p-6">
          <h2 className="text-xl text-gray-700 font-bold">Fashion Recommendations</h2>
          <p className="text-gray-500 mb-2">Fashion clothing you may like</p>
        </div>
        <main className="p-2">
          <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 gap-6">
            {require("@/mock-data/shop-data.json")
              .filter((item: any) => [1, 2, 3, 15, 5].includes(item.id))
              .map((item: any) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
                >
                  <div className="h-48 w-full flex items-center justify-center mb-4">
                    <Image
                      src={item.image}
                      alt="Product Image"
                      width={150}
                      height={150}
                      className="object-contain max-h-full"
                    />
                  </div>
                  <h2 className="text-xl text-gray-700 font-bold mb-2 text-center">
                    {item.title}
                  </h2>
                  <p className="text-gray-700 mb-2">${item.price}</p>
                  <button
                    style={{ backgroundColor: "#d8043cff" }}
                    className="text-white px-4 py-2 rounded mt-auto"
                  >
                    View Item
                  </button>
                </div>
              ))}
          </div>
        </main>
      </div>
    </Navbar>
  );
}
