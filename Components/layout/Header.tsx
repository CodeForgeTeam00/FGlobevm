"use client";

import { useState, useMemo } from "react";
import Logo from "@/Components/global/Logo";
import Link from "next/link";
import { Button } from "@/Components/Ui/button";
import { PhoneIcon } from "@/Components/global/Icons";
import { ChevronDown } from "lucide-react";
import MobileHeader from "@/Components/layout/MobileHeader";
import {
    HeaderSettings,
    HeaderNavItem,
    HeaderNavChild,
    CPTHeaderItem,
} from "@/types/wp-options";
import Container from "@/Components/global/Sections/Container";
import Text from "@/Components/global/text";

interface Props {
    headerSettings: HeaderSettings | null;
    servicePages: CPTHeaderItem[] | null;
    serviceAreaPages: CPTHeaderItem[] | null;
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

function isServicesSlug(slug: string): boolean {
    const n = normalizeSlug(slug);
    return n === "services" || n === "service" || n === "our-services";
}

function isServiceAreaSlug(slug: string): boolean {
    const n = normalizeSlug(slug);
    return (
        n === "service-area" ||
        n === "service-areas" ||
        n === "service_area"
    );
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

export default function Header({
                                   headerSettings,
                                   servicePages,
                                   serviceAreaPages,
                               }: Props) {
    const [megaOpen, setMegaOpen] = useState(false);

    const rawNav = headerSettings?.navigation ?? [];
    const btn = headerSettings?.btn_num;

    const nav = useMemo(
        () => buildNavigation(rawNav, servicePages, serviceAreaPages),
        [rawNav, servicePages, serviceAreaPages]
    );

    const navWithChildren = nav.filter(
        (item) =>
            item.children &&
            Array.isArray(item.children) &&
            item.children.length > 0
    );
    const hasAnyChildren = navWithChildren.length > 0;

    return (
        <>
            <header
                className="sticky top-0 z-50 border-b border-neutral-30 bg-white"
                onMouseLeave={() => setMegaOpen(false)}
            >
                <Container>
                    <div className="desktop-header hidden px-4 2xl:px-0 lg:flex py-5 w-full justify-between items-center">
                        <div className="header__right-side flex items-center 2xl:gap-10 gap-6">
                            <div className="header__logo">
                                <Logo className="2xl:text-[56px] text-[40px]" />
                            </div>
                            <nav className="navigation flex gap-4 2xl:gap-6">
                                {nav.map((item, index) => {
                                    const hasChildren =
                                        item.children &&
                                        Array.isArray(item.children) &&
                                        item.children.length > 0;
                                    return (
                                        <div
                                            key={index}
                                            onMouseEnter={() => {
                                                if (hasChildren) {
                                                    setMegaOpen(true);
                                                } else {
                                                    setMegaOpen(false);
                                                }
                                            }}
                                        >
                                            <Link
                                                className="flex items-center gap-1"
                                                href={getParentHref(item.slug)}
                                            >
                                                <Text variant={"body-lg"} as={"span"}>
                                                    {item.name}
                                                </Text>
                                                {hasChildren && (
                                                    <ChevronDown className="w-3 h-3" />
                                                )}
                                            </Link>
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

                {hasAnyChildren && megaOpen && (
                    <div className="hidden lg:block absolute left-0 right-0 top-full max-w-[900px] xl:max-w-[1100px] mx-auto 2xl:px-0 pb-4">
                        <div>
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
                                                href={getParentHref(item.slug)}
                                                className="text-sm font-bold text-neutral-100 mb-2"
                                            >
                                                {item.name}
                                            </Link>
                                            {(item.children as HeaderNavChild[]).map(
                                                (child, childIndex) => (
                                                    <Link
                                                        key={childIndex}
                                                        href={getChildHref(item.slug, child.slug)}
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

                <MobileHeader
                    headerSettings={headerSettings}
                    servicePages={servicePages}
                    serviceAreaPages={serviceAreaPages}
                />
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