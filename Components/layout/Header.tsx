"use client";

import { useState } from "react";
import Logo from "@/Components/global/Logo";
import Link from "next/link";
import { Button } from "@/Components/Ui/button";
import { PhoneIcon } from "@/Components/global/Icons";
import { ChevronDown } from "lucide-react";
import MobileHeader from "@/Components/layout/MobileHeader";
import { HeaderSettings } from "@/types/wp-options";

interface Props {
    headerSettings: HeaderSettings | null;
}

export default function Header({ headerSettings }: Props) {
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);

    const nav = headerSettings?.navigation ?? [];
    const btn = headerSettings?.btn_num;

    return (
        <header>
            <div className="desktop-header hidden px-4 2xl:px-0 lg:flex py-8 w-full justify-between items-center">
                <div className="header__right-side flex items-center 2xl:gap-10 gap-6">
                    <div className="Header__logo">
                        <Logo className="2xl:text-[56px] text-[40px]" />
                    </div>
                    <nav className="navigation flex gap-4 2xl:gap-6">
                        {nav.map((item, index) => (
                            <div
                                key={index}
                                className="relative"
                                onMouseEnter={() =>
                                    item.children && item.children.length
                                        ? setOpenDropdown(index)
                                        : null
                                }
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                <Link
                                    className="2xl:text-lg text-sm flex items-center gap-1 hover:text-primary-6 transition"
                                    href={`/${item.slug}`}
                                >
                                    {item.name}
                                    {item.children && item.children.length > 0 && (
                                        <ChevronDown className="w-3 h-3" />
                                    )}
                                </Link>

                                {item.children &&
                                    item.children.length > 0 &&
                                    openDropdown === index && (
                                        <div className="absolute top-full left-0 pt-2 z-50">
                                            <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[220px]">
                                                {item.children.map((child, childIndex) => (
                                                    <Link
                                                        key={childIndex}
                                                        href={`/${child.slug}`}
                                                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-6 transition"
                                                    >
                                                        {child.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                            </div>
                        ))}
                    </nav>
                </div>
                <div className="header__left-side">
                    {btn && (
                        <a href={`tel:${btn.number}`}>
                            <Button variant="primary" size="lg">
                                <div className="flex gap-2 items-center text-white">
                                    <PhoneIcon className="2xl:w-6 w-5 h-5 2xl:h-6" />
                                    <span className="2xl:text-base text-sm">
                                        Call {btn.number}
                                    </span>
                                </div>
                            </Button>
                        </a>
                    )}
                </div>
            </div>
            <MobileHeader headerSettings={headerSettings} />
        </header>
    );
}