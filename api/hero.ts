// lib/api.ts
export async function getHeroSection() {
    // ابتدا ID صفحه خانه رو بگیر
    const homeResponse = await fetch('http://sitenmae.local/wp-json/wp/v2/pages?slug=home');
    const homePages = await homeResponse.json();
    const homePage = homePages[0]; // فرض می‌کنیم slug = home فقط یک صفحه داره
    const pageId = homePage.id;

    // حالا دیتاهای متای hero
    const metaResponse = await fetch(`http://sitenmae.local/wp-json/wp/v2/pages/${pageId}`);
    const pageData = await metaResponse.json();

    // Map متاها
    const data = {
        badge: pageData.meta.hero_badge,
        title: pageData.meta.hero_title,
        highlight: pageData.meta.hero_highlight,
        description: pageData.meta.hero_description,
        buttons: [
            { text: pageData.meta.hero_btn1_text, link: pageData.meta.hero_btn1_link },
            { text: pageData.meta.hero_btn2_text, link: pageData.meta.hero_btn2_link },
        ],
    };

    return data;
}
