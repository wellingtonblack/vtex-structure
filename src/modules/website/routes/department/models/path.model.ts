export class FilterParams {
    public categories: any[] = [];
    public brands: any[] = [];
    public specifications: any[] = [];
    public collections?: any[] = [];
    public searchTerm?: string;
    public orderBy?: string = "";
    public name?: string = "";

    public setSpecification?(value: string, status: boolean) {
        if (!status) {
            this.specifications.push(value);
        } else {
            const idx = this.specifications.indexOf(value);
            if (idx > -1) {
                this.specifications.splice(idx, 1);
            }
        }
    }

    public clearFilter() {
        this.specifications = [];
    }

    public getSpecificationValue(value: string) {
        const str = decodeURIComponent(value.replace(/fq=specificationFilter_\d+:/g, ""));
        const values = str.split(/\&/);
        return `<strong>${values[1]}:</strong>${values[0]}`;
    }
}