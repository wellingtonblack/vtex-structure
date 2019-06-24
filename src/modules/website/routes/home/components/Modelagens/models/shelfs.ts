export interface CustomShelf {
    items: ShelfItem[];
}

export interface ShelfItem {
    img: string;
    title: string;
    description: string;
    link: string;
    cta: string;
    classname?: string;
}