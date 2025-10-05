"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth0 } from "@auth0/auth0-react";

type PageTemplateProps = {
    children: React.ReactNode;
};

export default function PageTemplate({ children }: PageTemplateProps) {
    const [input, setInput] = useState("");
    const router = useRouter();

    const { isAuthenticated, logout, loginWithRedirect, user, isLoading } = useAuth0();

    if (isLoading) {
        return <div className="p-6"> Loading authentication status...</div>;
    }

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        const q = input.trim();
        router.push(`/search?q=${encodeURIComponent(q)}`);
    }

    return (
        <div>
            <header style={{ backgroundColor: '#640a22ff' }} className="flex items-center justify-between">
                <button onClick={() => router.push('/')}>
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="ml-2 p-2"
                        width={125}
                        height={50}
                    />
                </button>

                {isAuthenticated ? (
                    <div className="flex items-center space-x-3 mr-4">
                        <span className="text-white font-medium">Hello, {user?.name}</span>
                        <img
                            src={user?.picture}
                            alt={user?.name}
                            width={24}
                            height={24}
                        />
                        <span onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className="text-white text-sm font-medium">Log Out</span>
                    </div>
                ) : (
                    <div className="flex items-center space-x-3 mr-4">
                        <span onClick={() => loginWithRedirect()} className="text-white font-medium">Log In</span>
                        <img
                            src="/profile.png"
                            alt="Profile"
                            width={24}
                            height={24}
                        />
                    </div>
                )}
            </header>

            <header style={{ backgroundColor: '#d8043cff' }}
                className="shadow-lg p-3 flex items-center justify-between">
                <form onSubmit={onSubmit} className="flex-1 max-w-xl">
                    <div className="flex">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            name="q"
                            type="text"
                            placeholder="Search for products..."
                            style={{ color: 'black' }}
                            className="bg-white w-full border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
                        />
                        <button
                            type="submit"
                            className="bg-white text-black border border-gray-300 rounded-r-md px-4 py-2 text-sm"
                        >
                            <img
                                src="/search.png"
                                alt="Search"
                                width={24}
                                height={24}
                            />
                        </button>
                    </div>
                </form>

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
