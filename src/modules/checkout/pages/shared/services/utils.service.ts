

class Utils {

    public cpfIsValid(strCPF: string) {
        let soma: number;
        let resto: number;
        soma = 0;

        if (strCPF.length > 11) {
            return false;
        }

        if (strCPF === "00000000000") {
            return false;
        }

        for (let i = 1; i <= 9; i++) {
            soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        }

        resto = (soma * 10) % 11;

        if ((resto === 10) || (resto === 11)) {
            resto = 0;
        }

        if (resto !== parseInt(strCPF.substring(9, 10))) {
            return false;
        }

        soma = 0;

        for (let i = 1; i <= 10; i++) {
            soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        }

        resto = (soma * 10) % 11;

        if ((resto === 10) || (resto === 11)) {
            resto = 0;
        }

        if (resto !== parseInt(strCPF.substring(10, 11))) {
            return false;
        }

        return true;
    }

    public formateMoney(money: string): number {
        return parseFloat(money.substring(0, money.length - 2) + "." + money.substring(money.length - 2, money.length));
    }

    public calculateDiscount(price: number, discount: number): number {
        price -= (price * discount) / 100;
        return parseFloat(price.toFixed(2));
    }
}

export default new Utils();