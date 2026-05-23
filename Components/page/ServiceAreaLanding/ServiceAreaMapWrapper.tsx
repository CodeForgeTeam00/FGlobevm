"use client";

import dynamic from "next/dynamic";
import type { ServiceArea } from "./ServiceAreaMap";

const ServiceAreaMap = dynamic(() => import("./ServiceAreaMap"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-300 lg:h-[600px] bg-gray-100 rounded-3xl animate-pulse" />
    ),
});

interface Props {
    areas: ServiceArea[];
}

export default function ServiceAreaMapWrapper({ areas }: Props) {
    return <ServiceAreaMap areas={areas} />;
}