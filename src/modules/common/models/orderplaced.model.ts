export interface AdditionalInfo {
    brandName: string;
    brandId: string;
    offeringInfo?: any;
    offeringType?: any;
    offeringTypeId?: any;
}

export interface ProductCategories {
    715546402: string;
    655457002: string;
    1843463835: string;
    680702743: string;
    904091387: string;
    1155379222: string;
    1187776231: string;
}

export interface PriceTag {
    name: string;
    value: number;
    rawValue: number;
    isPercentual: boolean;
    identifier: string;
}

export interface Item {
    uniqueId: string;
    id: string;
    productId: string;
    refId: string;
    ean: string;
    name: string;
    skuName: string;
    modalType?: any;
    priceValidUntil: Date;
    tax: number;
    price: number;
    listPrice: number;
    manualPrice?: any;
    sellingPrice: number;
    rewardValue: number;
    isGift: boolean;
    additionalInfo: AdditionalInfo;
    preSaleDate?: any;
    productCategoryIds: string;
    productCategories: ProductCategories;
    quantity: number;
    seller: string;
    sellerChain: string[];
    imageUrl: string;
    detailUrl: string;
    components: any[];
    bundleItems: any[];
    attachments: any[];
    attachmentOfferings: any[];
    offerings: any[];
    priceTags: PriceTag[];
    availability: string;
    measurementUnit: string;
    unitMultiplier: number;
}

export interface Seller {
    id: string;
    name: string;
    logo: string;
}

export interface Total {
    id: string;
    name: string;
    value: number;
}

export interface ClientProfileData {
    email: string;
    firstName: string;
    lastName: string;
    document: string;
    documentType: string;
    phone: string;
    corporateName?: any;
    tradeName?: any;
    corporateDocument?: any;
    stateInscription?: any;
    corporatePhone?: any;
    isCorporate: boolean;
    profileCompleteOnLoading: boolean;
    profileErrorOnLoading: boolean;
    customerClass?: any;
}

export interface MatchedParameters {
    "Seller@CatalogSystem": string;
    paymentMethodId: string;
}

export interface RateAndBenefitsIdentifier {
    id: string;
    name: string;
    featured: boolean;
    description?: any;
    matchedParameters: MatchedParameters;
    additionalInfo?: any;
}

export interface RatesAndBenefitsData {
    rateAndBenefitsIdentifiers: RateAndBenefitsIdentifier[];
    teaser: any[];
}

export interface Address {
    addressType: string;
    receiverName: string;
    addressId: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    street: string;
    number: string;
    neighborhood: string;
    complement?: any;
    reference?: any;
    geoCoordinates: any[];
}

export interface DeliveryId {
    courierId: string;
    warehouseId: string;
    dockId: string;
    courierName: string;
    quantity: number;
}

export interface PickupStoreInfo {
    isPickupStore: boolean;
    friendlyName?: any;
    address?: any;
    additionalInfo?: any;
    dockId?: any;
}

export interface Sla {
    id: string;
    deliveryChannel: string;
    name: string;
    deliveryIds: DeliveryId[];
    shippingEstimate: string;
    shippingEstimateDate?: any;
    lockTTL: string;
    availableDeliveryWindows: any[];
    deliveryWindow?: any;
    price: number;
    listPrice: number;
    tax: number;
    pickupStoreInfo: PickupStoreInfo;
    pickupPointId?: any;
    pickupDistance: number;
    polygonName?: any;
}

export interface DeliveryChannel {
    id: string;
}

export interface LogisticsInfo {
    itemIndex: number;
    selectedSla: string;
    selectedDeliveryChannel: string;
    addressId: string;
    slas: Sla[];
    shipsTo: string[];
    itemId: string;
    deliveryChannels: DeliveryChannel[];
}

export interface SelectedAddress {
    addressType: string;
    receiverName: string;
    addressId: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    street: string;
    number: string;
    neighborhood: string;
    complement?: any;
    reference?: any;
    geoCoordinates: any[];
}

export interface AvailableAddress {
    addressType: string;
    receiverName: string;
    addressId: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    street: string;
    number: string;
    neighborhood: string;
    complement?: any;
    reference?: any;
    geoCoordinates: any[];
}

export interface ShippingData {
    address: Address;
    logisticsInfo: LogisticsInfo[];
    selectedAddresses: SelectedAddress[];
    availableAddresses: AvailableAddress[];
    pickupPoints: any[];
}

export interface ConnectorResponses {
    Tid: string;
    ReturnCode?: any;
    Message?: any;
    authId: string;
    acquirer: string;
    message: string;
}

export interface Payment {
    id: string;
    paymentSystem: string;
    paymentSystemName: string;
    value: number;
    installments: number;
    connectorResponses: ConnectorResponses;
    referenceValue: number;
    cardHolder?: any;
    cardNumber?: any;
    firstDigits?: any;
    lastDigits?: any;
    cvv2?: any;
    expireMonth?: any;
    expireYear?: any;
    url: string;
    koinUrl?: any;
    tid: string;
    redemptionCode?: any;
    giftCardId?: any;
    giftCardProvider?: any;
    giftCardAsDiscount?: any;
    group: string;
    dueDate?: any;
    accountId?: any;
    parentAccountId?: any;
    bankIssuedInvoiceIdentificationNumber?: any;
    bankIssuedInvoiceIdentificationNumberFormatted?: any;
    bankIssuedInvoiceBarCodeNumber?: any;
    bankIssuedInvoiceBarCodeType?: any;
}

export interface Transaction {
    isActive: boolean;
    transactionId: string;
    merchantName: string;
    payments: Payment[];
    sharedTransaction: boolean;
}

export interface PaymentData {
    giftCards: any[];
    transactions: Transaction[];
}

export interface ClientPreferencesData {
    locale: string;
    optinNewsLetter: boolean;
}

export interface MarketingData {
    utmSource: string;
    utmMedium?: any;
    utmCampaign?: any;
    utmipage: string;
    utmiPart: string;
    utmiCampaign: string;
    coupon?: any;
    marketingTags: any[];
}

export interface CurrencyFormatInfo {
    currencyDecimalDigits: number;
    currencyDecimalSeparator: string;
    currencyGroupSeparator: string;
    currencyGroupSize: number;
    startsWithCurrencySymbol: boolean;
}

export interface StorePreferencesData {
    countryCode: string;
    saveUserData: boolean;
    timeZone: string;
    currencyCode: string;
    currencyLocale: number;
    currencySymbol: string;
    currencyFormatInfo: CurrencyFormatInfo;
}

export interface OrderPlaced {
    orderId: string;
    orderGroup: string;
    state: string;
    isCheckedIn: boolean;
    sellerOrderId: string;
    storeId?: any;
    checkedInPickupPointId?: any;
    value: number;
    items: Item[];
    sellers: Seller[];
    totals: Total[];
    clientProfileData: ClientProfileData;
    ratesAndBenefitsData: RatesAndBenefitsData;
    shippingData: ShippingData;
    paymentData: PaymentData;
    clientPreferencesData: ClientPreferencesData;
    commercialConditionData?: any;
    giftRegistryData?: any;
    marketingData: MarketingData;
    storePreferencesData: StorePreferencesData;
    openTextField?: any;
    invoiceData?: any;
    taxData?: any;
    customData?: any;
    hooksData?: any;
    changeData?: any;
    subscriptionData?: any;
    salesChannel: string;
    followUpEmail: string;
    creationDate: Date;
    lastChange: Date;
    timeZoneCreationDate: Date;
    timeZoneLastChange: Date;
    isCompleted: boolean;
    hostName: string;
    merchantName?: any;
    userType: string;
    roundingError: number;
    allowEdition: boolean;
    allowCancellation: boolean;
    isUserDataVisible: boolean;
    allowChangeSeller: boolean;
}