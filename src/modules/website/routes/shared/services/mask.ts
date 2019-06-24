class MaskValidate {

    constructor() {
    }

    public document(value: string) {
        value = value.replace(/\D/g, "");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        return value;
    }
    public postalCode(value: string) {
        value = value.replace(/\D/g, "");
        value = value.replace(/(\d{5})(\d)/, "$1-$2");
        value = value.replace(/(\d{5})(\d{1,3})$/, "$1-$2");
        return value;
    }

    public cnpj(value: string) {
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/, "$1 $2 $3/$4-$5");
        return value;
    }

    public date(value: string) {
        value.replace(/\D/g, "");
        value = value.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
        return value;
    }

    public number(value: string) {
        value = value.replace(/\D/g, "");
        return value;
    }


}

export default new MaskValidate();