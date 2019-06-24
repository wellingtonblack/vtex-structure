export interface Product {
    "Informações": string[];
    "Especificações": string[];
    "allSpecifications": string[];
    clusterHighlights: Highlights;
    categories?: string[];
    categoryId?: string;
    productId: string;
    items: Item[];
    productName: string;
    productReference: string;
    link: string;
    brand: string;
    [key: string]: any;
}


export interface Highlights {
    [key: string]: any;
}

export interface Item {
    itemId: string;
    images: Images[];
    name: string;
    nameComplete: string;
    complementName: string;
    sellers: Seller[];
    ean: string;
    attachments: Attachment[];
    [key: string]: any;
}

export interface Attachment {
    domainValues: string;
    id: number;
    name: string;
    required: boolean;
}

export interface Images {
    imageId: string;
    imageLabel: string;
    imageTag: string;
    imageUrl: string;
    imageText: string;

}
export interface Seller {
    addToCartLink: string;
    sellerDefault: boolean;
    sellerId: string;
    sellerName: string;
    commertialOffer: CommertialOffer;
}

export interface CommertialOffer {
    AvailableQuantity: number;
    CacheVersionUsedToCallCheckout: string;
    ListPrice: number;
    Price: number;
    PriceWithoutDiscount: number;
    Installments: Installment[];
    GiftSkuIds: string[];
}

export interface Installment {
    InterestRate: number;
    Name: string;
    NumberOfInstallments: number;
    PaymentSystemGroupName: string;
    PaymentSystemName: string;
    TotalValuePlusInterestRate: number;
    Value: number;
}


export interface Sku {
    "Id": number;
    "IdProduct": number;
    "Ean": string;
    "Name": string;
    "Price": number;
    "ListPrice": number;
    "PriceWithoutDiscount": number;
    "BestInstallmentValue": number;
    "BestInstallmentNumber": number;
    "Availability": boolean;
    "AvailabilityMessage": string;
    "Images": SkuImage[][];
    "Reference": string;
    "HasExtendedWarranty": boolean;
    "HasExtendedWarrantyPage": boolean;
    "NotifyMe": boolean;
    "HasServiceAtProductPage": boolean;
    "HasServiceAtCartPage": boolean;
    "HasServiceAtServicePage": boolean;
    "RealHeight": number;
    "RealWidth": number;
    "RealLength": number;
    "RealWeightKg": number;
    "RewardValue": number;
    "DefaultSellerId": string;
    "SkuSellersInformation": SkuSellerInformation[];
    "SalesChannel": string;
}



export interface SkuSellerInformation {
    "IsDefaultSeller": boolean;
    "SellerId": string;
    "Name": string;
    "LogoUrl": string;
    "ListPrice": number;
    "Price": number;
    "PriceWithoutDiscount": number;
    "AvailableQuantity": number;
    "SalesChannel": string;
}
   
export interface ProductCatalogSku {
    Id: number;
    ProductId: number;
    NameComplete: string;
    ProductName: string;
    ProductDescription: string;
    TaxCode: string;
    SkuName: string;
    IsActive: boolean;
    IsTransported: boolean;
    IsInventoried: boolean;
    IsGiftCardRecharge: boolean;
    ImageUrl: string;
    DetailUrl: string,
    CSCIdentification: any,
    BrandId: string,
    BrandName: string;
}

export interface SkuImage {
    "IdArchive": string;
    "Name": string;
    "Path": string;
    "IsMain": boolean;
    "ArchiveTypeId": number;
}