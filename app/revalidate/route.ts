import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
    const body = await req.json();

    // می‌تونی یه secret token برای امنیت اضافه کنی
    if (body.secret !== process.env.WP_REVALIDATE_SECRET) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    // مسیر صفحه اصلی که میخوای ریوالید بشه
    revalidatePath('/');

    return NextResponse.json({ revalidated: true });
}