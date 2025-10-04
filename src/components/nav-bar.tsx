import React from "react";

type PageTemplateProps = {
    children: React.ReactNode;
};

export default function PageTemplate({ children }: PageTemplateProps) {
    return (
        <div>
            <header style={{ backgroundColor: '#640a22ff' }} className="flex items-center justify-between">
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="ml-2 p-2"
                    width={125}
                    height={50}
                />
                <div className="flex items-center space-x-3 mr-4">
                    <img
                        src="/profile.png"
                        alt="Profile"
                        width={24}
                        height={24}
                    />
                    <span className="text-white font-medium">Hello, User</span>
                </div>
            </header>

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
                        <img
                            src="/cart.png"
                            alt="Cart"
                            width={24}
                            height={24}
                        />
                    </span>
                    <span className="text-sm font-medium">(0)</span>
                </div>
            </header>
            {children}
        </div>
    );
}
