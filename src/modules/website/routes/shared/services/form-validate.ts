class FormValidate {
    
    private BLACKLIST = [
        "00000000000000",
        "11111111111111",
        "22222222222222",
        "33333333333333",
        "44444444444444",
        "55555555555555",
        "66666666666666",
        "77777777777777",
        "88888888888888",
        "99999999999999",
    ];

    constructor() {
    }

    public isEmpty(value: string) {
        return value === "" || value === null || value === undefined;
    }

    public emailIsValid(email: string) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    public dateIsValid(date: string) {
        return /\d{2}\/\d{2}\/\d{4}/g.test(date);
    }

    public phoneIsValid(phone: string) {
        return phone.replace(/\D+/g, "").length > 9;
    }

    public documentIsValid(cpf: string) {
        cpf = cpf.replace(/\D/g, "");
        let numeros: any;
        let digitos: any;
        let soma: any;
        let i: any;
        let resultado: any;
        // tslint:disable-next-line:variable-name
        let digitos_iguais: any;

        digitos_iguais = 1;
        if (cpf.length < 11) {
            return false;
        }
        for (i = 0; i < cpf.length - 1; i++) {
            if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
                digitos_iguais = 0;
                break;
            }
        }

        if (!digitos_iguais) {
            numeros = cpf.substring(0, 9);
            digitos = cpf.substring(9);
            soma = 0;
            for (i = 10; i > 1; i--) {
                soma += numeros.charAt(10 - i) * i;
                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            }

            // tslint:disable-next-line:triple-equals
            if (resultado != digitos.charAt(0)) {
                return false;
            }
            numeros = cpf.substring(0, 10);
            soma = 0;
            for (i = 11; i > 1; i--) {
                soma += numeros.charAt(11 - i) * i;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            // tslint:disable-next-line:triple-equals
            if (resultado != digitos.charAt(1)) {
                return false;
            }
            return true;
        } else {
            return false;
        }
    }

    // tslint:disable-next-line:variable-name
    public is_cnpj(number: any, strict: any = true) {
        number = number.replace(/\D/g, "");
        const stripped = this.strip(number, strict);

        // CNPJ must be defined
        if (!stripped) { return false; }

        // CNPJ must have 14 chars
        if (stripped.length !== 14) { return false; }

        // CNPJ can't be blacklisted
        if (this.BLACKLIST.indexOf(stripped) >= 0) { return false; }

        let numbers = stripped.substr(0, 12);
        numbers += this.verifierDigit(numbers);
        numbers += this.verifierDigit(numbers);

        return numbers.substr(-2) === stripped.substr(-2);



        return true;
    }

    // tslint:disable-next-line:variable-name
    private strip(number: any, strict: any) {
        const regex = strict ? /[-\/.]/g : /[^\d]/g;
        return (number || "").toString().replace(regex, "");
    }


    private verifierDigit = (numbers: any) => {
        let index = 2;
        // tslint:disable-next-line:variable-name
        const reverse = numbers.split("").reduce((buffer: any, number: any) => {
            return [parseInt(number, 10)].concat(buffer);
        }, []);

        // tslint:disable-next-line:variable-name
        const sum = reverse.reduce((buffer: any, number: any) => {
            buffer += number * index;
            index = (index === 9 ? 2 : index + 1);
            return buffer;
        }, 0);

        const mod = sum % 11;
        return (mod < 2 ? 0 : 11 - mod);
    }
}

export default new FormValidate();