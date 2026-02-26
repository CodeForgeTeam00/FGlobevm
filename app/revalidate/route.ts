import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get('secret');
    const tag = request.nextUrl.searchParams.get('tag');

    // 1. Verify the secret token matches your .env file
    if (secret !== process.env.WORDPRESS_REVALIDATION_SECRET) {
        return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    // 2. Ensure a tag was provided
    if (!tag) {
        return NextResponse.json({ message: 'Missing tag param' }, { status: 400 });
    }

    // 3. Purge the Vercel Cache for that specific tag
    revalidateTag(tag, 'max'); // ✅ FIX

    return NextResponse.json({ revalidated: true, now: Date.now() });
}