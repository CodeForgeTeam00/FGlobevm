import React from 'react';
import { Instagram, Twitter, Linkedin, Facebook, LucideIcon } from 'lucide-react';


export interface SocialCardProps {
    name: string;
    prefix?: string;
    icon: LucideIcon;
}

// کامپوننت کارت تکی
export function SocialCard({ name, prefix = "Globe VM in", icon: Icon }: SocialCardProps) {
    return (
        <div className="relative overflow-hidden flex items-center justify-between p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 min-w-[220px] cursor-pointer group border border-white/10">
            <div className="z-10 flex flex-col gap-1">
                <span className="text-white/70 text-xs font-medium">{prefix}</span>
                <span className="text-white font-bold text-base">{name}</span>
            </div>
            <div className="z-10 bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                <Icon className="text-white w-5 h-5" />
            </div>

            <Icon className="absolute -bottom-4 -right-4 w-24 h-24 text-white/5 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
        </div>
    );
}

