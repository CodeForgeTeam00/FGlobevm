"use client";

import { useState, useMemo, useRef, useCallback, useEffect } from "react";
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

interface DropdownPosition {
    left: number;
    top: number;
}

const DROPDOWN_WIDTH = 320;
const VIEWPORT_MARGIN = 16;
const CLOSE_DELAY_MS = 150;

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
    if (n.startsWith("service-area") || n.startsWith("service_area")) {
        return false;
    }
    if (n === "industries" || n === "industry") return false;
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

function isIndustriesSlug(slug: string): boolean {
    const n = normalizeSlug(slug);
    return n === "industries" || n === "industry";
}

function buildNavigation(
    nav: HeaderNavItem[],
    serviceAreaPages: CPTHeaderItem[] | null,
    industriesNav: NavCategory | null
): HeaderNavItem[] {
    const serviceAreaChildren = cptToChildren(serviceAreaPages);

    const updated = nav.map((item) => {
        if (isServiceAreaSlug(item.slug) && serviceAreaChildren.length > 0) {
            return { ...item, children: serviceAreaChildren };
        }
        if (isIndustriesSlug(item.slug) && industriesNav) {
            return {
                ...item,
                children: industriesNav.services.map((s) => ({
                    name: s.name,
                    slug: s.slug,
                })),
            };
        }
        return item;
    });

    const hasIndustriesItem = updated.some((item) => isIndustriesSlug(item.slug));
    if (!hasIndustriesItem && industriesNav) {
        const industriesItem: HeaderNavItem = {
            name: industriesNav.name,
            slug: "industries",
            children: industriesNav.services.map((s) => ({
                name: s.name,
                slug: s.slug,
            })),
        };

        const serviceAreaIdx = updated.findIndex((item) =>
            isServiceAreaSlug(item.slug)
        );
        if (serviceAreaIdx !== -1) {
            updated.splice(serviceAreaIdx + 1, 0, industriesItem);
        } else {
            const blogIdx = updated.findIndex(
                (item) => normalizeSlug(item.slug) === "blog"
            );
            if (blogIdx !== -1) {
                updated.splice(blogIdx, 0, industriesItem);
            } else {
                updated.push(industriesItem);
            }
        }
    }

    return updated;
}

function getChildHref(parentSlug: string, childSlug: string): string {
    if (isServiceAreaSlug(parentSlug)) {
        return `/service-area/${childSlug}`;
    }
    if (isIndustriesSlug(parentSlug)) {
        return `/services/industries/${childSlug}`;
    }
    return `/services/${childSlug}`;
}

function getParentHref(slug: string): string {
    const clean = normalizeSlug(slug);
    if (isServicesSlug(slug)) return "/services";
    if (isServiceAreaSlug(slug)) return "/service-area";
    if (isIndustriesSlug(slug)) return "/services/industries";
    return `/${clean}`;
}

export default function Header({
                                   headerSettings,
                                   servicePages,
                                   serviceAreaPages,
                                   serviceNav,
                               }: Props) {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [dropdownPos, setDropdownPos] = useState<DropdownPosition | null>(null);

    const navItemRefs = useRef<Map<string, HTMLDivElement>>(new Map());
    // Timer ref for delayed close — lets mouse travel from nav item to dropdown
    const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const rawNav = headerSettings?.navigation ?? [];
    const btn = headerSettings?.btn_num;

    const filteredServiceNav = useMemo(() => {
        if (!Array.isArray(serviceNav)) return null;
        return serviceNav.filter((cat) => !isIndustriesSlug(cat.slug));
    }, [serviceNav]);

    const industriesNav = useMemo(() => {
        if (!Array.isArray(serviceNav)) return null;
        return serviceNav.find((cat) => isIndustriesSlug(cat.slug)) ?? null;
    }, [serviceNav]);

    const nav = useMemo(
        () => buildNavigation(rawNav, serviceAreaPages, industriesNav),
        [rawNav, serviceAreaPages, industriesNav]
    );

    const hasServiceNav =
        Array.isArray(filteredServiceNav) && filteredServiceNav.length > 0;

    const activeNavItem = activeMenu
        ? nav.find((item) => normalizeSlug(item.slug) === activeMenu)
        : null;
    const activeChildren = activeNavItem?.children as HeaderNavChild[] | undefined;
    const hasActiveChildren =
        Array.isArray(activeChildren) && activeChildren.length > 0;

    const isServiceMegaActive =
        !!activeNavItem && isServicesSlug(activeNavItem.slug) && hasServiceNav;

    const showItemDropdown =
        !!activeNavItem &&
        hasActiveChildren &&
        !isServiceMegaActive &&
        !!dropdownPos;

    const updateDropdownPosition = useCallback((slug: string) => {
        const el = navItemRefs.current.get(slug);
        if (!el) {
            setDropdownPos(null);
            return;
        }
        const rect = el.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        let left = rect.left;
        if (left + DROPDOWN_WIDTH > viewportWidth - VIEWPORT_MARGIN) {
            left = viewportWidth - DROPDOWN_WIDTH - VIEWPORT_MARGIN;
        }
        if (left < VIEWPORT_MARGIN) {
            left = VIEWPORT_MARGIN;
        }

        setDropdownPos({
            left,
            top: rect.bottom,
        });
    }, []);

    // Cancel any pending close (called when mouse re-enters nav item or dropdown)
    const cancelClose = useCallback(() => {
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }
    }, []);

    // Schedule a delayed close (gives mouse time to travel between items)
    const scheduleClose = useCallback(() => {
        cancelClose();
        closeTimerRef.current = setTimeout(() => {
            setActiveMenu(null);
            setDropdownPos(null);
        }, CLOSE_DELAY_MS);
    }, [cancelClose]);

    const handleNavEnter = useCallback(
        (slug: string, opensSomething: boolean, isServiceParent: boolean) => {
            cancelClose();
            if (!opensSomething) {
                setActiveMenu(null);
                setDropdownPos(null);
                return;
            }
            setActiveMenu(normalizeSlug(slug));
            if (!isServiceParent) {
                updateDropdownPosition(normalizeSlug(slug));
            } else {
                setDropdownPos(null);
            }
        },
        [updateDropdownPosition, cancelClose]
    );

    // Clean up timer on unmount
    useEffect(() => {
        return () => {
            if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
        };
    }, []);

    // Recalculate position on window resize
    useEffect(() => {
        if (!activeMenu || isServiceMegaActive) return;
        const handleResize = () => updateDropdownPosition(activeMenu);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [activeMenu, isServiceMegaActive, updateDropdownPosition]);
    console.log(serviceAreaPages , servicePages)
    return (
        <>
            <header className="sticky top-0 z-[1000] border-b border-neutral-30 bg-white">
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
                                    const normalizedSlug = normalizeSlug(item.slug);

                                    return (
                                        <div
                                            key={index}
                                            ref={(el) => {
                                                if (el) {
                                                    navItemRefs.current.set(normalizedSlug, el);
                                                } else {
                                                    navItemRefs.current.delete(normalizedSlug);
                                                }
                                            }}
                                            onMouseEnter={() =>
                                                handleNavEnter(item.slug, opensSomething, isServiceParent)
                                            }
                                            onMouseLeave={scheduleClose}
                                        >
                                            {isServiceParent ? (
                                                <span className="flex items-center gap-1 hover:text-primary-6 cursor-pointer transition-transform duration-200">
                                                    <Text
                                                        variant={"body-md"}
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
                                                        variant={"body-md"}
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

                {/* MEGA MENU for Services — stays centered, full width */}
                {isServiceMegaActive && (
                    <div
                        className="hidden lg:block absolute left-0 right-0 top-full max-w-[1100px] xl:max-w-[1560px] mx-auto pb-4 px-4"
                        onMouseEnter={cancelClose}
                        onMouseLeave={scheduleClose}
                    >
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 px-10 py-8">
                            <div className="grid grid-cols-6 lg:grid-cols-3 xl:grid-cols-6 gap-x-6 gap-y-8">
                                {filteredServiceNav!.map((category) => (
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
                                                        className="text-sm text-neutral-900 hover:text-primary-6 transition"
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

                <MobileHeader
                    headerSettings={headerSettings}
                    servicePages={servicePages}
                    serviceAreaPages={serviceAreaPages}
                    serviceNav={serviceNav}
                />
            </header>

            {/* SMALL DROPDOWN — fixed, positioned via getBoundingClientRect */}
            {showItemDropdown && activeNavItem && dropdownPos && (
                <div
                    className="hidden lg:block fixed z-[999]"
                    style={{
                        left: `${dropdownPos.left}px`,
                        top: `${dropdownPos.top}px`,
                        width: `${DROPDOWN_WIDTH}px`,
                    }}
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                >
                    {/* Invisible bridge so mouse can travel from nav item to dropdown without gap */}
                    <div className="h-3 w-full" />

                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 px-6 py-6 overflow-hidden">
                        <Text
                            variant="card-title-md"
                            textColor="black"
                            className="mb-4"
                        >
                            {activeNavItem.name}
                        </Text>
                        <div className="flex flex-col gap-1">
                            {(activeNavItem.children as HeaderNavChild[]).map(
                                (child, childIndex) => (
                                    <Link
                                        key={childIndex}
                                        href={getChildHref(activeNavItem.slug, child.slug)}
                                        className="text-sm text-neutral-700 hover:text-primary-6 transition py-1"
                                    >
                                        {child.name}
                                    </Link>
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}

            {activeMenu && (
                <div
                    className="hidden lg:block fixed inset-0 bg-black/20 z-40"
                    onClick={() => {
                        cancelClose();
                        setActiveMenu(null);
                        setDropdownPos(null);
                    }}
                />
            )}
        </>
    );
}