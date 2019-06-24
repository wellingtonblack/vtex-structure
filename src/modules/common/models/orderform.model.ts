export interface OrderForm {
    orderFormId: string;
    allowManualPrice: boolean;
    canEditData: boolean;
    isCheckedIn: boolean;
    value: number;
    items: OderformItem[];
    totalizers: TotalItem[];
    paymentData: PaymentData;
    shippingData: Shipping;
}

export interface Shipping {
    address: Address;
    selectedAddresses: Address[];
}

export interface Address {
    addressId: string;
    addressType: any;
    city: string;
    complement: string;
    country: string;
    geoCoordinates: any[];
    neighborhood: string;
    number: string;
    postalCode: string;
    receiverName: string;
    reference: string;
    state: string;
    street: string;
}

export interface PaymentData {
    giftCards: GiftCard[];
}

export interface GiftCard {
    balance: number;
    caption: string;
    groupName: string;
    id: string;
    inUse: boolean;
    isSpecialCard: boolean;
    name: string;
    provider: string;
    redemptionCode: string;
    value: number;
}

export interface TotalItem {
    id: string;
    name: string;
    value: number;
}

export interface Attachment {
    name: string;
    required: boolean;
}

export interface OderformItem {
    detailUrl: string;
    ean: string;
    name: string;
    listPrice: number;
    price: number;
    quantity: number;
    sellingPrice: number;
    skuName: string;
    uniqueId: string;
    imageUrl: string;
    id: string;
    productId: string;
    availability: string;
    manualPrice: any;
    isGift: boolean;
    attachments: Attachment[];
}