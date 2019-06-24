export interface UserModel {
    UserId: string;
    IsReturningUser: boolean;
    IsUserDefined: boolean;
    IsPJ: boolean;
    FirstName: string;
    LastName: string;
    Gender: string;
    Email: string;
}

export interface UserProfile {
    userProfileId: string;
    profileProvider: string;
    availableAccounts: any[];
    availableAddresses: UserProfileAddress[];
    userProfile: ProfileInfo;
}

export interface ProfileInfo {
    email: string;
    firstName: string;
    lastName: string;
    document: string;
    documentType: string;
    phone: string;
    corporateName: string;
    tradeName: string;
    corporateDocument: string;
    stateInscription: string;
    corporatePhone: string;
    isCorporate: boolean;
    profileCompleteOnLoading: string;
    profileErrorOnLoading: string;
    customerClass: string;
    gender: string;
}

export interface UserProfileAddress {
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
    complement: string;
    reference: string;
    geoCoordinates: any[];
    key: any;
}

// export interface User {
//     isCorporate: boolean;
//     tradeName: string;
//     homePhone: string;
//     stateRegistration: string;
//     email: string;
//     userId: string;
//     firstName: string;
//     lastName: string;
//     document: string;
//     birthDate: string;
//     businessPhone: string;
//     corporateDocument: string;
//     corporateName: string;
//     documentType: string;
//     gender: string;
//     id: string;
//     accountId: string;
//     accountName: string;
// }

export interface User {
    isCorporate: boolean;
    tradeName: string;
    rclastcart: any;
    rclastcartvalue: any;
    rclastsession: string;
    rclastsessiondate: string;
    homePhone: string;
    phone: string;
    brandPurchasedTag: string;
    brandVisitedTag: string;
    categoryPurchasedTag: string;
    categoryVisitedTag: string;
    departmentVisitedTag: string;
    productPurchasedTag: string;
    productVisitedTag: string;
    stateRegistration: string;
    email: string;
    userId: string;
    firstName: string;
    lastName: string;
    document: string;
    isNewsletterOptIn: boolean;
    localeDefault: string;
    attach: string;
    approved: string;
    birthDate: string;
    businessPhone: string;
    carttag: string;
    checkouttag: string;
    corporateDocument: string;
    corporateName: string;
    documentType: string;
    gender: string;
    visitedProductWithStockOutSkusTag: string;
    customerClass: string;
    priceTables: string;
    id: string;
    accountId: string;
    accountName: string;
    dataEntityId: string;
    createdBy: string;
    createdIn: string;
    updatedBy: string;
    updatedIn: string;
    lastInteractionBy: string;
    lastInteractionIn: string;
    followers: any[];
    tags: any[];
    auto_filter: string;
    profileImage: string;
}