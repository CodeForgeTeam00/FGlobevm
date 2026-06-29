import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ServiceArea } from "./ServiceAreaMap";
import {LocationIcon} from "@/components/global/Icons";

interface Props {
    area: ServiceArea;
    title?:string

}

export default function ServiceAreaCard({ area  , title}: Props) {
    return (
        <Link href={`/service-area/${area.slug}`}>
            <div
                className={`rounded-2xl border p-6 bg-white   transition-all group hover:border-primary-6 `}
            >
                <div className="flex items-start justify-between mb-3">
                    <div>
                    <span className="text-xs text-primary-6 font-medium">
                        Region: {area.region}
                    </span>
                        <h3 className="text-lg font-bold text-gray-900 mt-1">
                            {area.name ?? title}
                        </h3>
                    </div>
                    <div className="p-3 rounded-xl group-hover:bg-primary-6 transition-all bg-neutral-20 flex items-center justify-center">
                        <LocationIcon className={'w-6 h-6 group-hover:text-neutral-0  transition-alltext-neutral-100'} />
                    </div>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                    {area.services} Services
                </p>
                <p

                    className="text-primary-6 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
                >
                    More Details
                    <ArrowRight size={14} />
                </p>
            </div>
        </Link>
    );
}