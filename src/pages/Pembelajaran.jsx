import React from "react";

export default function Pembelajaran() {
  return (
    <div className="p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Pembelajaran</h1>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 border rounded-md bg-white text-blue-500">
            <span className="mr-2">Urutkan</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-filter">
              <path d="M3 6h18"/>
              <path d="M7 12h10"/>
              <path d="M10 18h4"/>
            </svg>
          </button>
          <button className="flex items-center px-4 py-2 border rounded-md bg-white text-blue-500">
            <span className="mr-2">Filter</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-filter">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Subject Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 - Pendidikan Pancasila */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="relative h-[200px] bg-orange-100">
            <img 
              src="/placeholder.svg?height=200&width=400" 
              alt="Pendidikan Pancasila" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-sm">
              5 Modul
            </div>
          </div>
          <div className="p-4 text-center">
            <h3 className="font-medium text-gray-800">Pendidikan Pancasila dan Kewarganegaraan</h3>
          </div>
        </div>

        {/* Card 2 - Bahasa Indonesia */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="relative h-[200px] bg-red-100">
            <img 
              src="/placeholder.svg?height=200&width=400" 
              alt="Bahasa Indonesia" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-sm">
              5 Modul
            </div>
          </div>
          <div className="p-4 text-center">
            <h3 className="font-medium text-gray-800">Bahasa Indonesia</h3>
          </div>
        </div>

        {/* Card 3 - Matematika */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="relative h-[200px] bg-blue-100">
            <img 
              src="/placeholder.svg?height=200&width=400" 
              alt="Matematika" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-sm">
              5 Modul
            </div>
          </div>
          <div className="p-4 text-center">
            <h3 className="font-medium text-gray-800">Matematika</h3>
          </div>
        </div>

        {/* Card 4 - Pendidikan Jasmani */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="relative h-[200px] bg-yellow-100">
            <img 
              src="/placeholder.svg?height=200&width=400" 
              alt="Pendidikan Jasmani" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-sm">
              5 Modul
            </div>
          </div>
          <div className="p-4 text-center">
            <h3 className="font-medium text-gray-800">Pendidikan Jasmani, Olahraga, dan Kesehatan</h3>
          </div>
        </div>

        {/* Card 5 - Seni dan Budaya */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="relative h-[200px] bg-purple-100">
            <img 
              src="/placeholder.svg?height=200&width=400" 
              alt="Seni dan Budaya" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-sm">
              5 Modul
            </div>
          </div>
          <div className="p-4 text-center">
            <h3 className="font-medium text-gray-800">Seni dan Budaya</h3>
          </div>
        </div>

        {/* Card 6 - Bahasa Inggris */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="relative h-[200px] bg-green-100">
            <img 
              src="/placeholder.svg?height=200&width=400" 
              alt="Bahasa Inggris" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-sm">
              5 Modul
            </div>
          </div>
          <div className="p-4 text-center">
            <h3 className="font-medium text-gray-800">Bahasa Inggris</h3>
          </div>
        </div>
      </div>
    </div>
  );
}