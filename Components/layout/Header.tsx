"use client";

import { useState } from "react";
import Logo from "@/Components/global/Logo";
import Link from "next/link";
import { Button } from "@/Components/Ui/button";
import { PhoneIcon } from "@/Components/global/Icons";
import { ChevronDown } from "lucide-react";
import MobileHeader from "@/Components/layout/MobileHeader";
import { HeaderSettings } from "@/types/wp-options";
import Container from "@/Components/global/Sections/Container";

interface Props {
    headerSettings: HeaderSettings | null;
}

export default function Header({ headerSettings }: Props) {
    const [megaOpen, setMegaOpen] = useState(false);

    const nav = headerSettings?.navigation ?? [];
    const btn = headerSettings?.btn_num;

    const navWithChildren = nav.filter(
        (item) => item.children && item.children.length > 0
    );
    const hasAnyChildren = navWithChildren.length > 0;

    return (
        <>
            <header className="sticky top-0 z-50 border-b border-neutral-30 bg-white" onMouseLeave={() => setMegaOpen(false)}>
                <Container>
                    <div className="desktop-header hidden px-4 2xl:px-0 lg:flex py-5 w-full justify-between items-center">
                        <div className="header__right-side flex items-center 2xl:gap-10 gap-6">
                            <div className="Header__logo">
                                <Logo  className="2xl:text-[56px] text-[40px]" />
                            </div>
                            <nav className="navigation flex gap-4 2xl:gap-6">
                                {nav.map((item, index) => (
                                    <div
                                        key={index}
                                        onMouseEnter={() => {
                                            if (item.children && item.children.length > 0) {
                                                setMegaOpen(true);
                                            } else {
                                                setMegaOpen(false);
                                            }
                                        }}
                                    >
                                        <Link
                                            className="2xl:text-lg text-sm flex items-center gap-1 hover:text-primary-6 transition"
                                            href={item.children && item.children.length > 0 ? `/services/${item.slug}` : `/${item.slug}`}
                                        >
                                            {item.name}
                                            {item.children && item.children.length > 0 && (
                                                <ChevronDown className="w-3 h-3" />
                                            )}
                                        </Link>
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
                </Container>

                {hasAnyChildren && megaOpen && (
                    <div className="hidden lg:block absolute left-0 right-0 top-full max-w-[900px] xl:max-w-[1100px] mx-auto 2xl:px-0 pb-4">
                        <div className="">
                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 px-10 py-8">
                                <div
                                    className="grid gap-8"
                                    style={{
                                        gridTemplateColumns: `repeat(${navWithChildren.length}, 1fr)`,
                                    }}
                                >
                                    {navWithChildren.map((item, index) => (
                                        <div key={index} className="flex flex-col gap-2">
                                            <Link
                                                href={`/services/${item.slug}`}
                                                className="text-sm font-bold text-neutral-100 mb-2"
                                            >
                                                {item.name}
                                            </Link>
                                            {(item.children as { name: string; slug: string }[]).map(
                                                (child, childIndex) => (
                                                    <Link
                                                        key={childIndex}
                                                        href={`/services/${child.slug}`}
                                                        className="text-sm text-neutral-700 hover:text-primary-6 transition py-1"
                                                    >
                                                        {child.name}
                                                    </Link>
                                                )
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <MobileHeader headerSettings={headerSettings} />
            </header>

            {megaOpen && (
                <div
                    className="hidden lg:block fixed inset-0 bg-black/20 z-40"
                    onClick={() => setMegaOpen(false)}
                />
            )}
        </>
    );
}