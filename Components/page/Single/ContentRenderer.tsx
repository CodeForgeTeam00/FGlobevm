import {ParagraphBlock} from './Block/ParagraphBlock';
import {FaqBlock} from './Block/FaqBlock';
import {SelectedPostsBlock} from './Block/SelectedPostsBlock';
import {RelatedPostsBlock} from './Block/RelatedPostsBlock';
import {SingleRelatedPostBlock} from './Block/SingleRelatedPostBlock';
import {QuoteBlock} from './Block/QuoteBlock';
import {VideoBlock} from './Block/VideoBlock';

const BLOCK_MAP: Record<string, any> = {
    'core/paragraph': ParagraphBlock,
    'acf/custom-faq': FaqBlock,
    'acf/selected-posts': SelectedPostsBlock,
    'acf/related-posts': RelatedPostsBlock,
    'acf/singel-related-post': SingleRelatedPostBlock,
    'acf/custom-quote': QuoteBlock,
    'acf/custom-video': VideoBlock,
};

export default function ContentRenderer({ components }: { components: any[] }) {
    return (
        <div className="flex flex-col gap-4">
            {components.map((block, index) => {
                const Component = BLOCK_MAP[block.type];

                if (!Component) return null;

                // mapping props
                const props =
                    block.type === 'core/paragraph'
                        ? { html: block.html }
                        : block.type === 'acf/custom-faq'
                            ? { faqs: block.data }
                            : block.type === 'acf/singel-related-post'
                                ? { post: block.data[0] }
                                : block.type === 'acf/custom-quote'
                                    ? { text: block.data.text }
                                    : block.type === 'acf/custom-video'
                                        ? { data: block.data }
                                        : { posts: block.data };

                return <Component key={index} {...props} />;
            })}
        </div>
    );
}