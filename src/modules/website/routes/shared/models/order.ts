


export interface Total {
    id: string;
    name: string;
    value: number;
}

export interface Content {
}

export interface ItemAttachment {
    content: Content;
    name?: any;
}

export interface PriceTag {
    name: string;
    value: number;
    isPercentual: boolean;
    identifier: string;
    rawValue: number;
}

export interface Content2 {
}

export interface ItemAttachment2 {
    content: Content2;
    name?: any;
}

export interface PriceTag2 {
    name: string;
    value: number;
    isPercentual: boolean;
    identifier: string;
    rawValue: number;
}

export interface AdditionalInfo {
    brandName?: any;
    brandId?: any;
    categoriesIds?: any;
    productClusterId?: any;
    commercialConditionId?: any;
    dimension?: any;
    offeringInfo?: any;
    offeringType?: any;
    offeringTypeId?: any;
}

export interface Component {
    uniqueId: string;
    id: string;
    productId?: any;
    ean: string;
    lockId?: any;
    itemAttachment: ItemAttachment2;
    attachments: any[];
    quantity: number;
    seller?: any;
    name: string;
    refId: string;
    price: number;
    listPrice?: any;
    manualPrice?: any;
    priceTags: PriceTag2[];
    imageUrl?: any;
    detailUrl?: any;
    components: any[];
    bundleItems: any[];
    params: any[];
    offerings: any[];
    sellerSku: string;
    priceValidUntil?: any;
    commission: number;
    tax: number;
    preSaleDate?: any;
    additionalInfo: AdditionalInfo;
    measurementUnit: string;
    unitMultiplier: number;
    sellingPrice: number;
    isGift: boolean;
    shippingPrice?: any;
    rewardValue: number;
    freightCommission: number;
    priceDefinitions?: any;
    taxCode?: any;
}

export interface Dimension {
    cubicweight: number;
    height: number;
    length: number;
    weight: number;
    width: number;
}

export interface AdditionalInfo2 {
    brandName: string;
    brandId: string;
    categoriesIds: string;
    productClusterId: string;
    commercialConditionId: string;
    dimension: Dimension;
    offeringInfo?: any;
    offeringType?: any;
    offeringTypeId?: any;
}

export interface Item {
    uniqueId: string;
    id: string;
    productId: string;
    ean: string;
    lockId: string;
    itemAttachment: ItemAttachment;
    attachments: any[];
    quantity: number;
    seller: string;
    name: string;
    refId: string;
    price: number;
    listPrice: number;
    manualPrice?: any;
    priceTags: PriceTag[];
    imageUrl: string;
    detailUrl: string;
    components: Component[];
    bundleItems: any[];
    params: any[];
    offerings: any[];
    sellerSku: string;
    priceValidUntil?: any;
    commission: number;
    tax: number;
    preSaleDate?: any;
    additionalInfo: AdditionalInfo2;
    measurementUnit: string;
    unitMultiplier: number;
    sellingPrice: number;
    isGift: boolean;
    shippingPrice?: any;
    rewardValue: number;
    freightCommission: number;
    priceDefinitions?: any;
    taxCode: string;
}

export interface ClientProfileData {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    documentType: string;
    document: string;
    phone: string;
    corporateName?: any;
    tradeName?: any;
    corporateDocument?: any;
    stateInscription: string;
    corporatePhone?: any;
    isCorporate: boolean;
    userProfileId: string;
    customerClass?: any;
}

export interface MarketingData {
    id: string;
    utmSource?: any;
    utmPartner?: any;
    utmMedium?: any;
    utmCampaign?: any;
    coupon?: any;
    utmiCampaign?: any;
    utmipage?: any;
    utmiPart?: any;
    marketingTags: any[];
}

export interface MatchedParameters {
    "Seller@CatalogSystem": string;
    paymentMethodId: string;
    slaIds: string;
}

export interface RateAndBenefitsIdentifier {
    description: string;
    featured: boolean;
    id: string;
    name: string;
    matchedParameters: MatchedParameters;
    additionalInfo?: any;
}

export interface RatesAndBenefitsData {
    id: string;
    rateAndBenefitsIdentifiers: RateAndBenefitsIdentifier[];
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

export interface PickupStoreInfo {
    additionalInfo?: any;
    address?: any;
    dockId?: any;
    friendlyName?: any;
    isPickupStore: boolean;
}

export interface Sla {
    id: string;
    name: string;
    shippingEstimate: string;
    deliveryWindow?: any;
    price: number;
    deliveryChannel: string;
    pickupStoreInfo: PickupStoreInfo;
    polygonName?: any;
}

export interface DeliveryId {
    courierId: string;
    courierName: string;
    dockId: string;
    quantity: number;
    warehouseId: string;
}

export interface PickupStoreInfo2 {
    additionalInfo?: any;
    address?: any;
    dockId?: any;
    friendlyName?: any;
    isPickupStore: boolean;
}

export interface LogisticsInfo {
    itemIndex: number;
    selectedSla: string;
    lockTTL: string;
    price: number;
    listPrice: number;
    sellingPrice: number;
    deliveryWindow?: any;
    deliveryCompany: string;
    shippingEstimate: string;
    shippingEstimateDate?: any;
    slas: Sla[];
    shipsTo: string[];
    deliveryIds: DeliveryId[];
    deliveryChannel: string;
    pickupStoreInfo: PickupStoreInfo2;
    addressId: string;
    polygonName?: any;
}

export interface SelectedAddress {
    addressId: string;
    addressType: string;
    receiverName: string;
    street: string;
    number: string;
    complement?: any;
    neighborhood: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    reference?: any;
    geoCoordinates: any[];
}

export interface ShippingData {
    id: string;
    address: Address;
    logisticsInfo: LogisticsInfo[];
    trackingHints?: any;
    selectedAddresses: SelectedAddress[];
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
    referenceValue: number;
    cardHolder?: any;
    cardNumber?: any;
    firstDigits?: any;
    lastDigits?: any;
    cvv2?: any;
    expireMonth?: any;
    expireYear?: any;
    url: string;
    giftCardId?: any;
    giftCardName?: any;
    giftCardCaption?: any;
    redemptionCode?: any;
    group: string;
    tid: string;
    dueDate?: any;
    connectorResponses: ConnectorResponses;
}

export interface Transaction {
    isActive: boolean;
    transactionId: string;
    merchantName: string;
    payments: Payment[];
}

export interface PaymentData {
    transactions: Transaction[];
}

export interface PackageAttachment {
    packages: any[];
}

export interface Seller {
    id: string;
    name: string;
    logo: string;
}

export interface CurrencyFormatInfo {
    CurrencyDecimalDigits: number;
    CurrencyDecimalSeparator: string;
    CurrencyGroupSeparator: string;
    CurrencyGroupSize: number;
    StartsWithCurrencySymbol: boolean;
}

export interface StorePreferencesData {
    countryCode: string;
    currencyCode: string;
    currencyFormatInfo: CurrencyFormatInfo;
    currencyLocale: number;
    currencySymbol: string;
    timeZone: string;
}

export interface Marketplace {
    baseURL: string;
    isCertified?: any;
    name: string;
}

export interface Order {
    orderId: string;
    sequence: string;
    marketplaceOrderId: string;
    marketplaceServicesEndpoint: string;
    sellerOrderId: string;
    origin: string;
    affiliateId: string;
    salesChannel: string;
    merchantName?: any;
    statusDescription: string;
    value: number;
    creationDate: string;
    lastChange: string;
    orderGroup: string;
    totals: Total[];
    items: Item[];
    marketplaceItems: any[];
    clientProfileData: ClientProfileData;
    giftRegistryData?: any;
    marketingData: MarketingData;
    ratesAndBenefitsData: RatesAndBenefitsData;
    shippingData: ShippingData;
    paymentData: PaymentData;
    packageAttachment: PackageAttachment;
    sellers: Seller[];
    callCenterOperatorData?: any;
    followUpEmail: string;
    lastMessage?: any;
    hostname: string;
    invoiceData?: any;
    changesAttachment?: any;
    openTextField?: any;
    roundingError: number;
    orderFormId: string;
    commercialConditionData?: any;
    isCompleted: boolean;
    customData?: any;
    storePreferencesData: StorePreferencesData;
    allowCancellation: boolean;
    allowEdition: boolean;
    isCheckedIn: boolean;
    marketplace: Marketplace;
    authorizedDate?: any;
    invoicedDate?: any;
    totalValue: number;
    paymentNames: string;
    detail: Order;
    openDetail: boolean;
}

export interface OrderList {
    list: Order[];
    paging: OrderPage;
}

export interface OrderPage {
    total: number;
    pages: number;
    currentPage: number;
    perPage: number;
}