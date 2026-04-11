import { getBlogId } from '@/services/wp-single';
import {Hero} from '@/Components/page/Single/Block/HeroBlock';
import ContentRenderer from '@/Components/page/Single/ContentRenderer';
export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const data = await getBlogId(slug);

    return (
        <div className="min-h-screen bg-white">
            <main className="max-w-6xl mx-auto px-4 py-10">
                <Hero data={data} />
                <div className="mt-16 max-w-4xl mx-auto">
                    <ContentRenderer components={data.components} />
                </div>
            </main>
        </div>
    );
}