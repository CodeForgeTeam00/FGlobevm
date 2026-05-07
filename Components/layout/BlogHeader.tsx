"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/Components/global/Logo";
import { Search, X, ChevronRight } from "lucide-react";
import { MenuIcon } from "@/Components/global/Icons";
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
    author: {
        name: string;
        avatar: { url: string; alt: string };
    };
}

export default function BlogHeader() {
    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const mobileInputRef = useRef<HTMLInputElement>(null);

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
        if (searchOpen && inputRef.current) inputRef.current.focus();
    }, [searchOpen]);

    useEffect(() => {
        if (searchOpen && mobileInputRef.current) mobileInputRef.current.focus();
    }, [searchOpen]);

    const closeSearch = () => {
        setSearchOpen(false);
        setQuery("");
        setResults([]);
    };

    const searchResults = (
        <>
            {query.length >= 2 && (
                <div className="py-4">
                    <p className="text-sm text-gray-500 mb-4">
                        Result For &apos;{query}&apos;
                    </p>

                    {loading && (
                        <p className="text-sm text-gray-400 text-center py-8">
                            Searching...
                        </p>
                    )}

                    {!loading && results.length === 0 && (
                        <p className="text-sm text-gray-400 text-center py-8">
                            No results found
                        </p>
                    )}

                    {!loading && results.length > 0 && (
                        <div className="flex flex-col">
                            {results.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    onClick={closeSearch}
                                    className="flex gap-4 py-3 hover:bg-gray-50 transition rounded-xl px-2 group"
                                >
                                    <div className="relative w-28 h-20 rounded-xl overflow-hidden flex-shrink-0">
                                        <Image
                                            src={post.image?.url || ""}
                                            alt={post.image?.alt || post.title}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 min-w-0 justify-center">
                                        <span className="text-xs text-primary-6 font-medium">
                                            {post.category_name}
                                        </span>
                                        <p className="text-sm font-bold text-gray-900 group-hover:text-primary-6 transition line-clamp-1">
                                            {post.title}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                            <span>By {post.author?.name}</span>
                                            <span>•</span>
                                            <span>{post.date}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );

    return (
        <>
            <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
                {/* ===== DESKTOP NORMAL ===== */}
                {!searchOpen && (
                    <Container>
                        <div className="hidden lg:flex px-4 2xl:px-0 py-8 w-full justify-between items-center">
                            <div className="flex items-center 2xl:gap-10 gap-6">
                                <Link href="/blog" className="flex items-center gap-2">
                                    <Logo className="2xl:text-[56px] text-[40px]" />
                                    <span className="text-sm text-gray-400 mt-1">blog</span>
                                </Link>
                                <nav className="flex gap-4 2xl:gap-6">
                                    {BLOG_CATEGORIES.map((item, index) => (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            className="2xl:text-lg text-sm text-gray-700 hover:text-primary-6 transition"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition cursor-pointer"
                                aria-label="Search"
                            >
                                <Search className="w-5 h-5 text-gray-700" />
                            </button>
                        </div>
                    </Container>
                )}

                {/* ===== DESKTOP SEARCH ===== */}
                {searchOpen && (
                    <div className="hidden lg:block">
                        <Container>
                            <div className="flex items-center gap-4 py-6">
                                <Link href="/blog" className="flex-shrink-0">
                                    <Logo className="text-[40px]" />
                                </Link>
                                <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-full px-5 py-3">
                                    <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Search articles..."
                                        className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
                                    />
                                    <button
                                        onClick={closeSearch}
                                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition cursor-pointer"
                                    >
                                        <X className="w-4 h-4 text-gray-500" />
                                    </button>
                                </div>
                            </div>
                        </Container>
                    </div>
                )}

                {/* ===== MOBILE NORMAL ===== */}
                {!searchOpen && (
                    <div className="flex lg:hidden py-1 px-4 h-12 w-full justify-between items-center">
                        <button onClick={() => setMobileMenuOpen(true)}>
                            <MenuIcon className="w-5" />
                        </button>
                        <Link href="/blog">
                            <Logo className="text-[40px]" iconOnly />
                        </Link>
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="w-10 h-10 flex items-center justify-center"
                            aria-label="Search"
                        >
                            <Search className="w-5 h-5 text-gray-700" />
                        </button>
                    </div>
                )}

                {/* ===== MOBILE SEARCH ===== */}
                {searchOpen && (
                    <div className="lg:hidden px-4 py-4">
                        <div className="flex items-center gap-3 bg-gray-50 rounded-full px-4 py-3">
                            <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            <input
                                ref={mobileInputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search articles..."
                                className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
                            />
                            <button
                                onClick={closeSearch}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
                            >
                                <X className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>
                    </div>
                )}
            </header>

            {/* ===== SEARCH RESULTS DROPDOWN ===== */}
            {searchOpen && query.length >= 2 && (
                <>
                    <div
                        className="fixed inset-0 bg-black/20 z-40"
                        onClick={closeSearch}
                    />
                    <div className="absolute left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-xl max-h-[60vh] overflow-y-auto">
                        <Container>
                            {searchResults}
                        </Container>
                    </div>
                </>
            )}

            {/* ===== MOBILE SIDEBAR MENU ===== */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/30"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    <div className="absolute left-0 top-0 h-full w-full bg-white shadow-xl flex flex-col">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <Logo className="text-[32px]" iconOnly />
                            <button onClick={() => setMobileMenuOpen(false)}>
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex flex-col py-2">
                            {BLOG_CATEGORIES.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="flex items-center justify-between px-6 py-4 text-sm text-gray-700 hover:bg-gray-50 transition"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}