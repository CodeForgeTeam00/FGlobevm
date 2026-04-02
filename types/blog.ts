

export type BlogApiItem = {
    title: string;
    description?: string;
    categoryName: string;
    categoryUrl: string;
    date: string;
    author: {
        name: string;
        avatar: string;
    };
    imageUrl: string;
};

export type BlogMainItem = {
    title: string;
    description: string;
    categoryName: string;
    categoryUrl: string;
    date: string;
    author: {
        name: string;
        avatar: string;
    };
    imageUrl: string;
};

export type BlogGridItem = {
    title: string;
    categoryName: string;
    categoryUrl: string;
    date: string;
    imageUrl: string;
};

export type CategoryCardProps ={
    title: string;
    articleCount: number | string;
    imageUrl: {
        url: string;
        alt: string;
    };
}