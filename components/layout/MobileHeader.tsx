"use client";

import { useState, useMemo } from "react";
import Logo from "@/components/global/Logo";
import Link from "next/link";
import { Menuicon } from "@/components/global/Icons";
import { ChevronRight, X } from "lucide-react";
import {
    HeaderSettings,
    HeaderNavItem,
    HeaderNavChild,
    CPTHeaderItem,
    NavCategory,
} from "@/types/wp-options";

interface Props {
    headerSettings: HeaderSettings | null;
    servicePages: CPTHeaderItem[] | null;
    serviceAreaPages: CPTHeaderItem[] | null;
    serviceNav: NavCategory[] | null;
}

type View =
    | { level: "root" }
    | { level: "section"; navIndex: number }
    | { level: "category"; navIndex: number; categorySlug: string };

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
    if (n.startsWith("service-area") || n.startsWith("service_area")) {
        return false;
    }
    return n.startsWith("service") || n === "our-services";
}

function isServiceAreaSlug(slug: string): boolean {
    const n = normalizeSlug(slug);
    return (
        n === "service-area" ||
        n === "service-areas" ||
        n === "service_area" ||
        n.startsWith("service-area")
    );
}

function buildNavigation(
    nav: HeaderNavItem[],
    serviceAreaPages: CPTHeaderItem[] | null
): HeaderNavItem[] {
    // Service is handled separately via serviceNav (3-level drill).
    // Service Area still uses the simple 2-level drill via children.
    const serviceAreaChildren = cptToChildren(serviceAreaPages);

    return nav.map((item) => {
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
                                         serviceNav,
                                     }: Props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [view, setView] = useState<View>({ level: "root" });

    const rawNav = headerSettings?.navigation ?? [];
    const hasServiceNav = Array.isArray(serviceNav) && serviceNav.length > 0;
    console.log("Mobile serviceNav:", serviceNav);
    console.log("Mobile hasServiceNav:", hasServiceNav);
    const nav = useMemo(
        () => buildNavigation(rawNav, serviceAreaPages),
        [rawNav, serviceAreaPages]
    );

    const closeMenu = () => {
        setMenuOpen(false);
        setView({ level: "root" });
    };

    // Determine whether a nav item opens a section drill (has any children to show)
    const itemOpensSection = (item: HeaderNavItem): boolean => {
        if (isServicesSlug(item.slug)) return hasServiceNav;
        return (
            Array.isArray(item.children) && (item.children as HeaderNavChild[]).length > 0
        );
    };

    // For the current view, find the active category (level === "category")
    const activeCategory =
        view.level === "category" && serviceNav
            ? serviceNav.find((c) => c.slug === view.categorySlug)
            : null;

    return (
        <>
            <div className="mobile-header flex lg:hidden py-1 px-4 h-12 w-full justify-between items-center border-b border-neutral-30">
                <button onClick={() => setMenuOpen(true)} aria-label="Open menu">
                    <Menuicon className="w-5" />
                </button>
                <div className="Header__logo">
                    <Logo className="text-[40px] flex" iconOnly={true} />
                </div>
            </div>

            {menuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/30"
                        onClick={closeMenu}
                    />
                    <div className="absolute left-0 top-0 h-full w-full bg-white shadow-xl flex flex-col">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <Logo className="text-[32px]" iconOnly />
                            <button onClick={closeMenu} aria-label="Close menu">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* LEVEL 0: ROOT NAV */}
                        {view.level === "root" && (
                            <div className="flex flex-col py-2 overflow-y-auto">
                                {nav.map((item, index) => {
                                    const opensSection = itemOpensSection(item);
                                    return (
                                        <button
                                            key={index}
                                            className="flex items-center justify-between px-6 py-4 text-sm text-gray-700 hover:bg-gray-50 transition"
                                            onClick={() => {
                                                if (opensSection) {
                                                    setView({ level: "section", navIndex: index });
                                                } else {
                                                    closeMenu();
                                                    window.location.href = getParentHref(item.slug);
                                                }
                                            }}
                                        >
                                            <span className="font-medium">{item.name}</span>
                                            {opensSection && (
                                                <ChevronRight className="w-4 h-4 text-gray-400" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {/* LEVEL 1: SECTION (categories of Service, or areas of Service Area) */}
                        {view.level === "section" && (
                            <div className="flex flex-col py-2 overflow-y-auto">
                                <button
                                    className="flex items-center gap-2 px-6 py-4 text-sm text-neutral-100 font-medium  border-gray-100"
                                    onClick={() => setView({ level: "root" })}
                                >
                                    <ChevronRight className="w-4 h-4 rotate-180" />
                                    Back
                                </button>
                                <p className="px-6 py-3 text-base font-bold text-gray-900">
                                    {nav[view.navIndex].name}
                                </p>

                                {/* If this is Service AND we have serviceNav, show categories */}
                                {isServicesSlug(nav[view.navIndex].slug) && hasServiceNav && (
                                    <>
                                        {serviceNav!.map((category) => {
                                            const hasServices = category.services.length > 0;
                                            return (
                                                <button
                                                    key={category.slug}
                                                    className="flex items-center justify-between px-6 py-4 text-sm text-gray-700 hover:bg-gray-50 transition"
                                                    onClick={() => {
                                                        if (hasServices) {
                                                            setView({
                                                                level: "category",
                                                                navIndex: view.navIndex,
                                                                categorySlug: category.slug,
                                                            });
                                                        } else {
                                                            // No services under this category — go directly to category page
                                                            closeMenu();
                                                            window.location.href = `/services/${category.slug}/`;
                                                        }
                                                    }}
                                                >
                                                    <span>{category.name}</span>
                                                    {hasServices && (
                                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </>
                                )}
                                {!isServicesSlug(nav[view.navIndex].slug) &&
                                    Array.isArray(nav[view.navIndex].children) &&
                                    (nav[view.navIndex].children as HeaderNavChild[]).map(
                                        (child, childIndex) => (
                                            <Link
                                                key={childIndex}
                                                href={getChildHref(
                                                    nav[view.navIndex].slug,
                                                    child.slug
                                                )}
                                                className="block px-6 py-4 text-sm text-gray-700 hover:bg-gray-50 transition"
                                                onClick={closeMenu}
                                            >
                                                {child.name}
                                            </Link>
                                        )
                                    )}
                            </div>
                        )}
                        {view.level === "category" && activeCategory && (
                            <div className="flex flex-col py-2 overflow-y-auto">
                                <button
                                    className="flex items-center gap-2 px-6 py-4 text-sm text-neutral-100 font-medium "
                                    onClick={() =>
                                        setView({ level: "section", navIndex: view.navIndex })
                                    }
                                >
                                    <ChevronRight className="w-4 h-4 rotate-180" />
                                    Back
                                </button>
                                <Link
                                    href={`/services/${activeCategory.slug}/`}
                                    className="block px-6 py-3 text-base text-neutral-black font-medium hover:bg-gray-50 transition"
                                    onClick={closeMenu}
                                >
                                    View all in {activeCategory.name}
                                </Link>

                                {activeCategory.services.map((service) => (
                                    <Link
                                        key={service.slug}
                                        href={`/services/${activeCategory.slug}/${service.slug}/`}
                                        className="block px-6 py-4 text-xs text-gray-700 hover:bg-gray-50 transition"
                                        onClick={closeMenu}
                                    >
                                        {service.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}