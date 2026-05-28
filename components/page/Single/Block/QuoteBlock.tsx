export function QuoteBlock({ text }: { text: string }) {
    return (
        <div className="my-16 py-20 px-8 md:px-16 bg-gray-50/80 rounded-[2.5rem] relative flex items-center justify-center text-center overflow-hidden">
            <span className="absolute top-0 left-8 text-[12rem] text-gray-200/60 font-serif leading-none select-none rotate-180">"</span>
            <span className="absolute bottom-[-6rem] right-8 text-[12rem] text-gray-200/60 font-serif leading-none select-none">"</span>
            <p className="text-2xl md:text-3xl font-serif font-medium text-gray-900 max-w-3xl relative z-10 leading-relaxed">
                {text}
            </p>
        </div>
    );
}