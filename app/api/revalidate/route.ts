import { revalidateTag} from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get('secret');
    const tag = request.nextUrl.searchParams.get('tag');

    if (secret !== process.env.WORDPRESS_REVALIDATION_SECRET) {
        return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    if (!tag) {
        return NextResponse.json({ message: 'Missing tag param' }, { status: 400 });
    }

    revalidateTag(tag ,'max' );

        return NextResponse.json({ revalidated: true, now: Date.now(), tag });
}