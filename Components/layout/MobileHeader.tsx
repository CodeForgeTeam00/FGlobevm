"use client";

import { useState } from "react";
import Logo from "@/Components/global/Logo";
import Link from "next/link";
import { MenuIcon, SearchIcon } from "@/Components/global/Icons";
import { ChevronRight, X } from "lucide-react";
import { HeaderSettings } from "@/types/wp-options";

interface Props {
    headerSettings: HeaderSettings | null;
}

export default function MobileHeader({ headerSettings }: Props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);

    const nav = headerSettings?.navigation ?? [];

    return (
        <>
            <div className="mobile-header flex lg:hidden py-1 px-4 h-12 w-full justify-between items-center border-b border-neutral-30">
                <button onClick={() => setMenuOpen(true)}>
                    <MenuIcon className="w-5" />
                </button>
                <div className="Header__logo">
                    <Logo className="text-[40px] flex " iconOnly={true} />
                </div>
            </div>
            {menuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/30"
                        onClick={() => {
                            setMenuOpen(false);
                            setActiveSubmenu(null);
                        }}
                    />

                    <div className="absolute left-0 top-0 h-full w-full bg-white shadow-xl flex flex-col">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <Logo className="text-[32px]" iconOnly />
                            <button
                                onClick={() => {
                                    setMenuOpen(false);
                                    setActiveSubmenu(null);
                                }}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {activeSubmenu === null ? (
                            <div className="flex flex-col py-2">
                                {nav.map((item, index) => (
                                    <button
                                        key={index}
                                        className="flex items-center justify-between px-6 py-4 text-sm text-gray-700 hover:bg-gray-50 transition"
                                        onClick={() => {
                                            if (item.children && item.children.length > 0) {
                                                setActiveSubmenu(index);
                                            } else {
                                                setMenuOpen(false);
                                                window.location.href = `/${item.slug}`;
                                            }
                                        }}
                                    >
                                        {item.name}
                                        {item.children && item.children.length > 0 && (
                                            <ChevronRight className="w-4 h-4 text-gray-400" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col py-2">
                                <button
                                    className="flex items-center gap-2 px-6 py-4 text-sm text-primary-6 font-medium border-b border-gray-100"
                                    onClick={() => setActiveSubmenu(null)}
                                >
                                    <ChevronRight className="w-4 h-4 rotate-180" />
                                    Back
                                </button>
                                <p className="px-6 py-3 text-xs font-bold text-gray-400 uppercase">
                                    {nav[activeSubmenu].name}
                                </p>
                                {nav[activeSubmenu].children &&
                                    Array.isArray(nav[activeSubmenu].children) &&
                                    (nav[activeSubmenu].children as { name: string; slug: string }[]).map(
                                        (child, childIndex) => (
                                            <Link
                                                key={childIndex}
                                                href={`/${child.slug}`}
                                                className="block px-6 py-4 text-sm text-gray-700 hover:bg-gray-50 transition"
                                                onClick={() => {
                                                    setMenuOpen(false);
                                                    setActiveSubmenu(null);
                                                }}
                                            >
                                                {child.name}
                                            </Link>
                                        )
                                    )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}