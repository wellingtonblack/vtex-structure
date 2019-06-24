export interface ItemsReturned {
    itemsReturned: ItemReturned[];
}

export interface ItemReturned {
    thumb: string;
    name: string;
    href: string;
    criteria: string;
    items: ProductItems[];
}


export interface ProductItems {
    imageUrl: string;
    itemId: string;
    name: string;
    nameComplete: string;
}