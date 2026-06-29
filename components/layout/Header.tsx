"use client";

import { useState, useMemo } from "react";
import Logo from "@/components/global/Logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PhoneIcon } from "@/components/global/Icons";
import { ChevronDown } from "lucide-react";
import MobileHeader from "@/components/layout/MobileHeader";
import {
    HeaderSettings,
    HeaderNavItem,
    HeaderNavChild,
    CPTHeaderItem,
    NavCategory,
} from "@/types/wp-options";
import Container from "@/components/global/Sections/Container";
import Text from "@/components/global/text";

interface Props {
    headerSettings: HeaderSettings | null;
    servicePages: CPTHeaderItem[] | null;
    serviceAreaPages: CPTHeaderItem[] | null;
    serviceNav: NavCategory[] | null;
}

function normalizeSlug(slug: string): string {
    return slug
        .trim()
        .replace(/^\/+/, "")
        .replace(/\/+$/, "")
        .toLowerCase();
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

// More flexible: any slug starting with "service" (but NOT "service-area") = Services nav
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
    // Services is handled separately via the mega menu below.
    // Service Area still uses the simple dropdown (children).
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

export default function Header({
                                   headerSettings,
                                   servicePages,
                                   serviceAreaPages,
                                   serviceNav,
                               }: Props) {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    const rawNav = headerSettings?.navigation ?? [];
    const btn = headerSettings?.btn_num;

    const nav = useMemo(
        () => buildNavigation(rawNav, serviceAreaPages),
        [rawNav, serviceAreaPages]
    );

    const hasServiceNav = Array.isArray(serviceNav) && serviceNav.length > 0;

    const activeNavItem = activeMenu
        ? nav.find((item) => normalizeSlug(item.slug) === activeMenu)
        : null;
    const activeChildren = activeNavItem?.children as HeaderNavChild[] | undefined;
    const hasActiveChildren =
        Array.isArray(activeChildren) && activeChildren.length > 0;

    // Mega menu is active when the hovered item is a "services" item AND we have data
    const isServiceMegaActive =
        activeNavItem !== null &&
        isServicesSlug(activeNavItem.slug) &&
        hasServiceNav;


    return (
        <>
            <header
                className="sticky top-0 z-[1000] border-b border-neutral-30 bg-white"
                onMouseLeave={() => setActiveMenu(null)}
            >
                <Container>
                    <div className="desktop-header hidden px-4 2xl:px-0 lg:flex py-5 w-full justify-between items-center">
                        <div className="header__right-side flex items-center 2xl:gap-10 gap-6">
                            <div className="header__logo">
                                <Link href="/">
                                    <Logo className="2xl:text-[56px] text-[40px]" />
                                </Link>
                            </div>
                            <nav className="navigation flex gap-4 2xl:gap-6">
                                {nav.map((item, index) => {
                                    const isServiceParent = isServicesSlug(item.slug);
                                    const hasDropdownChildren =
                                        item.children &&
                                        Array.isArray(item.children) &&
                                        item.children.length > 0;
                                    const hasMega = isServiceParent && hasServiceNav;
                                    const opensSomething =
                                        hasDropdownChildren || hasMega;
                                    const isActive =
                                        activeMenu === normalizeSlug(item.slug);

                                    return (
                                        <div
                                            key={index}
                                            onMouseEnter={() => {
                                                setActiveMenu(
                                                    opensSomething
                                                        ? normalizeSlug(item.slug)
                                                        : null
                                                );
                                            }}
                                        >
                                            {isServiceParent ? (
                                                <span className="flex items-center gap-1 hover:text-primary-6 cursor-pointer transition-transform duration-200">
                                                    <Text
                                                        variant={"body-lg"}
                                                        as={"span"}
                                                        textColor={
                                                            isActive ? "primary" : "default"
                                                        }
                                                        className="transition-colors"
                                                    >
                                                        {item.name}
                                                    </Text>
                                                    {opensSomething && (
                                                        <ChevronDown
                                                            className={`w-3 h-3 transition-transform duration-200 ${
                                                                isActive
                                                                    ? "rotate-180 text-primary-6"
                                                                    : ""
                                                            }`}
                                                        />
                                                    )}
                                                </span>
                                            ) : (
                                                <Link
                                                    className="flex items-center gap-1 hover:text-primary-6 transition-transform duration-200"
                                                    href={getParentHref(item.slug)}
                                                >
                                                    <Text
                                                        variant={"body-lg"}
                                                        as={"span"}
                                                        textColor={
                                                            isActive ? "primary" : "default"
                                                        }
                                                        className="transition-colors"
                                                    >
                                                        {item.name}
                                                    </Text>
                                                    {opensSomething && (
                                                        <ChevronDown
                                                            className={`w-3 h-3 transition-transform duration-200 ${
                                                                isActive
                                                                    ? "rotate-180 text-primary-6"
                                                                    : ""
                                                            }`}
                                                        />
                                                    )}
                                                </Link>
                                            )}
                                        </div>
                                    );
                                })}
                            </nav>
                        </div>
                        <div className="header__left-side">
                            {btn && (
                                <a href={`tel:${btn.number}`}>
                                    <Button variant="primary" size="lg">
                                        <div className="flex gap-2 items-center text-white">
                                            <PhoneIcon className="2xl:w-6 w-5 h-5 2xl:h-6" />
                                            <Text
                                                variant={"body-md"}
                                                as={"span"}
                                                textColor={"white"}
                                            >
                                                Call {btn.number}
                                            </Text>
                                        </div>
                                    </Button>
                                </a>
                            )}
                        </div>
                    </div>
                </Container>
                {isServiceMegaActive && (
                    <div className="hidden lg:block absolute left-0 right-0 top-full max-w-[1100px] xl:max-w-[1560px]  mx-auto pb-4 px-4">
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 px-10 py-8">
                            <div className="grid grid-cols-6 lg:grid-cols-3 xl:grid-cols-6 gap-x-6 gap-y-8">
                                {serviceNav!.map((category) => (
                                    <div key={category.slug} className="flex flex-col gap-3">
                                        <Link
                                            href={`/services/${category.slug}/`}
                                            className="text-neutral-400 border-b text-sm font-medium hover:text-primary-6 transition"
                                        >
                                            {category.name}
                                        </Link>
                                        {category.services.length > 0 && (
                                            <div className="flex flex-col gap-2">
                                                {category.services.map((service) => (
                                                    <Link
                                                        key={service.slug}
                                                        href={`/services/${category.slug}/${service.slug}/`}
                                                        className="text-sm  text-neutral-900 hover:text-primary-6 transition"
                                                    >
                                                        {service.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {hasActiveChildren && activeNavItem && !isServiceMegaActive && (
                    <div className="hidden lg:block absolute left-0 right-0 top-full max-w-[900px] xl:max-w-[1560px] 2xl:max-w-[1560px] mx-auto 2xl:px-0 pb-4">
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 px-10 py-8">
                            <Text
                                variant="card-title-md"
                                textColor="black"
                                className="mb-4"
                            >
                                {activeNavItem.name}
                            </Text>
                            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-x-8 gap-y-2">
                                {activeChildren!.map((child, childIndex) => (
                                    <Link
                                        key={childIndex}
                                        href={getChildHref(activeNavItem.slug, child.slug)}
                                        className="text-sm text-neutral-700 hover:text-primary-6 transition py-1"
                                    >
                                        {child.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <MobileHeader
                    headerSettings={headerSettings}
                    servicePages={servicePages}
                    serviceAreaPages={serviceAreaPages}
                    serviceNav={serviceNav}
                />
            </header>
            {activeMenu && (
                <div
                    className="hidden lg:block fixed inset-0 bg-black/20 z-40"
                    onClick={() => setActiveMenu(null)}
                />
            )}
        </>
    );
}