import { Product, Highlights } from "../../../../common/models/product.model";
import utilsService from "./utils-service";



enum FieldType {
    CUSTOM_FIELD = "CUSTOM_FIELD",
    IMAGE = "IMAGE",
    MONEY = "MONEY",
    SELLER = "SELLER",
    BOOL = "BOOL",
    INTEGER = "INTEGER",
    FLOAT = "FLOAT",
    FLAG = "FLAG",
}

export interface Shelf {
    title: string;
    products: Product[];
}

class ShelfService {
    public currentProduct: Element;
    public getProducts(element: Element) {
        const div = document.createElement("div");
        div.innerHTML = element.innerHTML;
        const list = div.querySelectorAll(".shelf-default > ul > li:not(.helperComplement)");

        const products: Product[] = [];

        for (let index = 0; index < list.length; index++) {
            const item = list[index];




            this.currentProduct = item;
            const productId: string = this.getValue("#getProductId");
            const productName: string = this.getValue("#getProductName");
            const complementName: string = this.getValue("#getProductDescriptionShort");
            const itemId: string = this.getValue("#getProductSkuId");
            const brand: string = this.getValue("#getProductBrand");
            const category: string = this.getValue("#getProductCategory");
            const department: string = this.getValue("#getProductDepartment");
            const link: string = this.getValue("#getProductUri");
            const bestPrice: number = this.getValue("#getProductBestPrice", FieldType.MONEY);
            const stock: boolean = this.getValue("#getProductStock", FieldType.BOOL);
            const numbersOfInstallment: number = this.getValue("#getProductNumbersOfInstallment", FieldType.FLOAT);
            const installmentValue: number = this.getValue("#getProductInstallmentValue", FieldType.INTEGER);
            const listPrice: number = this.getValue("#getProductListPrice", FieldType.MONEY);
            const hightLight: Highlights = this.getValue("#getProductHightLight", FieldType.FLAG);
            const imageTag: string = this.getValue("#getProductImage").replace(/https:\/\/+[a-zA-Z\.]+/, "~");
            const sellerId = this.getValue("#getBottomBuyAsynchronous", FieldType.SELLER);



            const schema: Product = {
                allSpecifications: [],
                brand,
                categories: [category, department],
                clusterHighlights: hightLight,
                Especificações: [],
                Informações: [],
                productReference: "",
                items: [
                    {
                        name: productName,
                        attachments: [],
                        complementName,
                        ean: "",
                        itemId,
                        nameComplete: productName,
                        images: [
                            {
                                imageId: productId,
                                imageLabel: "frontal",
                                imageTag,
                                imageText: productName,
                                imageUrl: utilsService.getPathFromImageTag(imageTag, 320, 400),
                            },
                        ],
                        sellers: [
                            {
                                addToCartLink: "",
                                commertialOffer: {
                                    CacheVersionUsedToCallCheckout: "",
                                    Installments: [
                                        {
                                            InterestRate: 0,
                                            Name: "",
                                            NumberOfInstallments: numbersOfInstallment,
                                            PaymentSystemGroupName: "",
                                            PaymentSystemName: "",
                                            TotalValuePlusInterestRate: 0,
                                            Value: numbersOfInstallment > 1 ? installmentValue : listPrice,
                                        },
                                    ],
                                    AvailableQuantity: stock ? 20 : 0,
                                    ListPrice: listPrice,
                                    Price: bestPrice,
                                    PriceWithoutDiscount: listPrice,
                                    GiftSkuIds: null,
                                },
                                sellerDefault: true,
                                sellerId,
                                sellerName: sellerId,
                            },
                        ],
                    },
                ],
                link,
                productId,
                productName,
            };

            products.push(schema);
        }

        return products;
    }

    public getShelf(shelf: any): Shelf {

        if (!shelf || !shelf.innerText || !shelf.innerText.trim()) {
            return;
        }

        const placeholder = shelf;
        const titleElement = placeholder.querySelector("h2");
        const title = titleElement && titleElement.innerText;
        const products = this.getProducts(shelf);

        return {
            title: title && title.indexOf("titulo=false") === -1 ? title : null,
            products,
        };
    }

    public getShelfs(content: string): Shelf[] {

        const element = document.createElement("div");
        element.innerHTML = content;

        const shelfsElements = element.querySelectorAll(".shelf-default");

        if (!shelfsElements) {
            return null;
        }

        const shelfs: Shelf[] = [];

        for (let index = 0; index < shelfsElements.length; index++) {
            const shelfElement = document.createElement("div");
            shelfElement.classList.add("shelf-default");
            shelfElement.appendChild(shelfsElements[index]);
            shelfs.push(this.getShelf(shelfElement));
        }

        return shelfs;
    }

    private getValue: any = (elementRef: string, fieldType?: FieldType) => {

        const item: any = this;

        const find = this.currentProduct.querySelector.bind(this.currentProduct);

        const input: HTMLInputElement = find(elementRef);

        if (!input) {
            return;
        }

        switch (fieldType) {
            case FieldType.CUSTOM_FIELD:
                return this.customField(input.value);
                break;
            case FieldType.IMAGE:
                return utilsService.getPathFromImageTag(input.value, 320, 400);
                break;
            case FieldType.MONEY:
                return utilsService.formatMoney(input.value);
                break;
            case FieldType.SELLER:
                return this.getSeller(input.value);
                break;
            case FieldType.BOOL:
                return input.value.toLocaleLowerCase() === "true" || input.value === "sim" ? true : false;
                break;
            case FieldType.FLOAT:
                return parseFloat(input.value);
                break;
            case FieldType.INTEGER:
                return parseInt(input.value);
                break;
            case FieldType.FLAG:

                const flagsArray = input.value.match(/\<p\ class\=\"[a-z|\s|\-]*.\"\>[àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ|a-z|A-Z|\s\-]*.\/p\>/g) || [];

                const flags: Highlights = {};

                flagsArray.forEach((flagHtml) => {
                    const content: string = flagHtml.match(/\>[a-zA-Z\s\-].*\</)[0].replace(/\-/, " ").replace(/[\>\<]/g, "");
                    const className: string = flagHtml.match(/class\=\"[a-zA-Z\s\-].+\"/g)[0].replace(/class=|\"/g, "");
                    flags[className.replace(/\s+/g, "")] = content;
                });

                return flags;
            default:
                return input.value;
                break;
        }
    }

    private getSeller(content: string) {

        try {

            const wrapper = document.createElement("div");
            wrapper.innerHTML = content;
            const link = wrapper.querySelector("a");
            const url = link.getAttribute("href");
            const params = url.split(/\&/);
            for (let index = 0; index < params.length; index++) {
                const param = params[index];
                if (/seller=[\d|a-z|A-Z]/.test(param)) {
                    return param.replace(/seller=/g, "");
                }
            }
        } catch (error) {
            return "";
        }
    }

    private customField(value: string) {

        if (!value) {
            return "";
        }

        const container = document.createElement("div");
        container.innerHTML = value;
        const _value = container.querySelector("li").innerHTML;
        return _value;
    }
}


export default new ShelfService();