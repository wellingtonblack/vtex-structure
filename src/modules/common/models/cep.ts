export interface Cep {
    City: string;
    Complement: string;
    IsActive: boolean;
    Neighborhood: string;
    Number: string;
    PostalCode: string;
    State: string;
    StateAcronym: string;
    Street: string;
    StreetAbbreviation: string;
    StreetType: string;
    Country: any;
}

export interface Country {
    Id: string;
    Name: string;
    SpecificData: SpecificData;
}

export interface SpecificData {
    NationalAddressDirectoryLocalityKey: string;
    NationalAddressDirectoryLocality: string;
    NationalAddressDirectoryNeighborhoodStartKey: string;
    NationalAddressDirectoryNeighborhoodEndKey: string;
    NationalAddressDirectoryNeighborhoodEnd: string;
    Preposition: string;
    OfficialStreetPatent: string;
    NationalAddressDirectoryStreetKey: string;
    OfficialStreetName: string;
    BigUserStreetExistenceIndicator: string;
    Complement: string;
    DataType: string;
}
