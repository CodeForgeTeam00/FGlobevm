"use client";

import { useState, useMemo } from "react";
import Logo from "@/Components/global/Logo";
import Link from "next/link";
import { MenuIcon } from "@/Components/global/Icons";
import { ChevronRight, X } from "lucide-react";
import {
    HeaderSettings,
    HeaderNavItem,
    HeaderNavChild,
    CPTHeaderItem,
} from "@/types/wp-options";

interface Props {
    headerSettings: HeaderSettings | null;
    servicePages: CPTHeaderItem[] | null;
    serviceAreaPages: CPTHeaderItem[] | null;
}

function normalizeSlug(slug: string): string {
    return slug.trim().replace(/^\/+/, "").replace(/\/+$/, "").toLowerCase();
}

function slugToTitle(slug: string): string {
    return slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
}

function cptToChildren(items: CPTHeaderItem[] | null): HeaderNavChild[] {
    if (!items) return [];
    return items
        .filter((item) => item.slug)
        .map((item) => ({
            name: item.header_title || slugToTitle(item.slug),
            slug: item.slug,
        }));
}

function isServicesSlug(slug: string): boolean {
    const n = normalizeSlug(slug);
    return n === "services" || n === "service" || n === "our-services";
}

function isServiceAreaSlug(slug: string): boolean {
    const n = normalizeSlug(slug);
    return n === "service-area" || n === "service-areas" || n === "service_area";
}

function buildNavigation(
    nav: HeaderNavItem[],
    servicePages: CPTHeaderItem[] | null,
    serviceAreaPages: CPTHeaderItem[] | null
): HeaderNavItem[] {
    const serviceChildren = cptToChildren(servicePages);
    const serviceAreaChildren = cptToChildren(serviceAreaPages);

    return nav.map((item) => {
        if (isServicesSlug(item.slug) && serviceChildren.length > 0) {
            return { ...item, children: serviceChildren };
        }
        if (isServiceAreaSlug(item.slug) && serviceAreaChildren.length > 0) {
            return { ...item, children: serviceAreaChildren };
        }
        return item;
    });
}

function getChildHref(parentSlug: string, childSlug: string): string {
    if (isServiceAreaSlug(parentSlug)) {
        return `/service-area/${childSlug}`;
    }
    return `/services/${childSlug}`;
}

function getParentHref(slug: string): string {
    const clean = normalizeSlug(slug);
    if (isServicesSlug(slug)) return "/services";
    if (isServiceAreaSlug(slug)) return "/service-area";
    return `/${clean}`;
}

export default function MobileHeader({
                                         headerSettings,
                                         servicePages,
                                         serviceAreaPages,
                                     }: Props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null) ;

    const rawNav = headerSettings?.navigation ?? [];

    const nav = useMemo(
        () => buildNavigation(rawNav, servicePages, serviceAreaPages),
        [rawNav, servicePages, serviceAreaPages]
    );

    return (
        <>
            <div className="mobile-header flex lg:hidden py-1 px-4 h-12 w-full justify-between items-center border-b border-neutral-30">
                <button onClick={() => setMenuOpen(true)}>
                    <MenuIcon className="w-5" />
                </button>
                <div className="Header__logo">
                    <Logo className="text-[40px] flex" iconOnly={true} />
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
                                {nav.map((item, index) => {
                                    const hasChildren =
                                        item.children &&
                                        Array.isArray(item.children) &&
                                        item.children.length > 0;
                                    return (
                                        <button
                                            key={index}
                                            className="flex items-center justify-between px-6 py-4 text-sm text-gray-700 hover:bg-gray-50 transition"
                                            onClick={() => {
                                                if (hasChildren) {
                                                    setActiveSubmenu(index);
                                                } else {
                                                    setMenuOpen(false);
                                                    window.location.href = getParentHref(item.slug);
                                                }
                                            }}
                                        >
                                            {item.name}
                                            {hasChildren && (
                                                <ChevronRight className="w-4 h-4 text-gray-400" />
                                            )}
                                        </button>
                                    );
                                })}
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
                                    (nav[activeSubmenu].children as HeaderNavChild[]).map(
                                        (child, childIndex) => (
                                            <Link
                                                key={childIndex}
                                                href={getChildHref(
                                                    nav[activeSubmenu].slug,
                                                    child.slug
                                                )}
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