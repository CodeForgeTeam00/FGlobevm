"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/Components/global/Logo";
import { Search, X } from "lucide-react";
import Container from "@/Components/global/Sections/Container";

const BLOG_CATEGORIES = [
    { name: "Categories", href: "/blog/category/test1" },
    { name: "Categories", href: "/blog/category/test2" },
    { name: "Categories", href: "/blog/category/test3" },
    { name: "Categories", href: "/blog/category/test4" },
];

interface SearchResult {
    id: number;
    slug: string;
    title: string;
    image: { url: string; alt: string };
    category_name: string;
    date: string;
}

export default function BlogHeader() {
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (query.length < 2) {
            setResults([]);
            return;
        }

        const timer = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `/api/wp?endpoint=${encodeURIComponent(`/gvm/v1/posts?q=${query}&per_page=5`)}`
                );
                const data = await res.json();
                setResults(data?.posts ?? []);
            } catch {
                setResults([]);
            }
            setLoading(false);
        }, 400);

        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setSearchOpen(false);
                setQuery("");
                setResults([]);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header>
            <Container>
                <div className="hidden lg:flex px-4 2xl:px-0 py-8 w-full justify-between items-center">
                    <div className="flex items-center 2xl:gap-10 gap-6">
                        <Link href="/blog" className="flex items-center gap-2">
                            <Logo className="2xl:text-[56px] text-[40px]" />
                            <span className="text-sm text-gray-400 mt-1">blog</span>
                        </Link>

                        {!searchOpen && (
                            <nav className="flex gap-4 2xl:gap-6">
                                {BLOG_CATEGORIES.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="2xl:text-lg text-sm text-gray-700 hover:text-[#00a0e9] transition"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        )}
                    </div>

                    <div ref={dropdownRef} className="relative">
                        {searchOpen ? (
                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search articles..."
                                    autoFocus
                                    className="border-b border-gray-300 bg-transparent px-2 py-1 text-sm outline-none focus:border-[#00a0e9] w-64 transition"
                                />
                                <button
                                    onClick={() => {
                                        setSearchOpen(false);
                                        setQuery("");
                                        setResults([]);
                                    }}
                                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                                    aria-label="Close search"
                                >
                                    <X className="w-5 h-5 text-gray-700" />
                                </button>

                                {(results.length > 0 || loading) && (
                                    <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                                        {loading ? (
                                            <div className="p-4 text-center text-sm text-gray-400">
                                                Searching...
                                            </div>
                                        ) : (
                                            <div className="flex flex-col">
                                                {results.map((post) => (
                                                    <Link
                                                        key={post.id}
                                                        href={`/blog/${post.slug}`}
                                                        onClick={() => {
                                                            setSearchOpen(false);
                                                            setQuery("");
                                                            setResults([]);
                                                        }}
                                                        className="flex gap-3 p-3 hover:bg-gray-50 transition"
                                                    >
                                                        <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                                            <Image
                                                                src={post.image?.url || ""}
                                                                alt={post.image?.alt || post.title}
                                                                fill
                                                                className="object-cover"
                                                                unoptimized
                                                            />
                                                        </div>
                                                        <div className="flex flex-col gap-1 min-w-0">
                                                        <span className="text-[10px] text-[#00a0e9] font-medium">
                                                            {post.category_name}
                                                        </span>
                                                            <p className="text-sm font-medium text-gray-900 line-clamp-1">
                                                                {post.title}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {query.length >= 2 && !loading && results.length === 0 && (
                                    <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50">
                                        <p className="text-sm text-gray-400 text-center">
                                            No results found
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                                aria-label="Search"
                            >
                                <Search className="w-5 h-5 text-gray-700" />
                            </button>
                        )}
                    </div>
                </div>
            </Container>
        </header>
    );
}