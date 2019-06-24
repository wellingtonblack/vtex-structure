export interface Session {
    "id": string;
    "namespaces": Namespace;
    "version": number;
    "active": boolean;
    "debug": boolean;
}

export interface Namespace {
    "account": Account;
    "store": Store;
    "cookie": Cookie;
    "authentication": Authentication;
    "impersonate": Impersonate;
    "profile": Profile;
    "public": Public;
}



export interface SessionValue {
    "value": string;
}

export interface Account {
    "id": AccountId;
    "accountName": AccountName;
}

export interface AccountId {
    "value": string;
    "keepAlive": string;
}

export interface AccountName {
    "value": string;
}

export interface Store {
    "channel": SessionValue;
    "countryCode": SessionValue;
    "cultureInfo": SessionValue;
    "currencyCode": SessionValue;
    "currencySymbol": SessionValue;
}


export interface Cookie {
    [key: string]: any;
}

export interface Authentication {
    "storeUserId": SessionValue;
    "storeUserEmail": SessionValue;
}

export interface Impersonate {
    "canImpersonate": SessionValue;
}

export interface Profile {
    "id": SessionValue;
    "email": SessionValue;
    "firstName": SessionValue;
    "lastName": SessionValue;
    "phone": SessionValue;
    "document": SessionValue;
    "isAuthenticated": SessionValue;
}


export interface Public {
    "lid": SessionValue;
}