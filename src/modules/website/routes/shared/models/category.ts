export interface Category {
    id: number;
    name: string;
    hasChildren: boolean;
    url: string;
    children: Category[];
    Title: string;
    MetaTagDescription: string;
    opacity?: number;
    father?: Category;
    bread?: Category;
    show?: boolean;
    hover?: boolean;
    block?: boolean;
}