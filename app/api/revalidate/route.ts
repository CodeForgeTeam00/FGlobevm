import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    // ۱. گرفتن پارامترها از وردپرس
    const secret = searchParams.get('secret');
    const path = searchParams.get('path'); // پلاگین مسیر را با نام path می‌فرستد
    const tag = searchParams.get('tag');   // اگر تگ هم فرستادی

    // ۲. چک کردن رمز امنیتی (بسیار مهم)
    if (secret !== process.env.WORDPRESS_REVALIDATE_SECRET) {
        return Response.json({ message: 'Invalid Token' }, { status: 401 });
    }

    // ۳. انجام عملیات پاکسازی کش
    try {
        if (path) {
            revalidatePath(path); // پاک کردن بر اساس آدرس صفحه
            return Response.json({ revalidated: true, now: Date.now(), path });
        }

        if (tag) {
            revalidateTag(tag , 'max'); // پاک کردن بر اساس تگ
            return Response.json({ revalidated: true, now: Date.now(), tag });
        }

        return Response.json({ message: 'Nothing to revalidate' }, { status: 400 });

    } catch (err) {
        return Response.json({ message: 'Error revalidating' }, { status: 500 });
    }
}

// برای اطمینان، متد POST را هم نگه می‌داریم
export async function POST(request: NextRequest) {
    return GET(request);
}