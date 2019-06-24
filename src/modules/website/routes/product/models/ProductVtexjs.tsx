export interface ProductVtexjs {
    productId: number;
    available: boolean;
    displayMode: string;
    name: string;
    description: string;
    salesChannel: string;
    dimensions: string[];
    dimensionsInputType: DimensionsInputType;
    dimensionsMap: DimensionsMap;
    skus: SkuVtexjs[];
}

export interface SkuVtexjs {
    available: boolean;
    availablequantity: number;
    bestPrice: number;
    bestPriceFormated: string;
    dimensions: DimensionsInputType;
    image: string;
    installments: number;
    installmentsInsterestRate: number;
    installmentsValue: number;
    listPrice: number;
    listPriceFormated: string;
    measures: Measure;
    rewardValue: number;
    seller: string;
    sellerId: string;
    sku: number;
    skuname: string;
    taxAsInt: number;
    taxFormated: string;
    unitMultiplier: number;
    values: string[];
    selected?: boolean;
    hightLight: string;
    hasDiscount?: boolean;
}

export interface Measure {
    cubicweight: number;
    height: number;
    length: number;
    weight: number;
    width: number;
}

export interface DimensionsInputType {
    "Coleção": string;
    "Cor": string;
    "Cor texto": string;
    "Novidades": string;
    "Saldo": string;
    "Tamanho": string;
    [key: string]: string;
}


export interface DimensionsMap {
    "Coleção": string[];
    "Cor": string[];
    "Cor texto": string[];
    "Novidades": string[];
    "Saldo": string[];
    "Tamanho": string[];
    [key: string]: string[];
} 
