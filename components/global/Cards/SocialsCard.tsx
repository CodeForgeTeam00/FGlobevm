import React from 'react';
import { Instagram, Twitter, Linkedin, Facebook, LucideIcon } from 'lucide-react';
import Image from "next/image";
import {WPImage} from "@/types/wp-common";
import Link from "next/link";
import {link} from "node:fs";


export interface SocialCardProps {
    name: string;
    icon: WPImage;
    link: string;
}

export function SocialCard({ name, icon , link }: SocialCardProps) {
    return (
        <Link href={link} passHref>
            <div className="relative overflow-hidden flex items-center justify-between p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 min-w-[220px] cursor-pointer group border border-white/10">
                <div className="z-10 flex flex-col gap-1">
                    <span className="text-white/70 text-xs font-medium">Globe VM In</span>
                    <span className="text-white font-bold text-base">{name}</span>
                </div>
                <div className="z-10 bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                    <Image alt={icon.alt} src={icon.url} className="text-white w-5 h-5" />
                </div>
                <Image alt={icon.alt} src={icon.url} className="absolute -bottom-4 -right-4 w-24 h-24 text-white/5 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
            </div>
        </Link>
    );
}

