import * as React from "react";
import s from "./Televendas.scss";
import utilsService from "../../../../services/utils-service";
import { FormLoginComponent } from "./components/FormLogin/FormLogin";
import { Seller } from "./models/seller";
import RuleCustomerService from "./components/RuleCustomerService/RuleCustomerService";
import dataSellers from "./services/data-sellers";

export interface Props {

}

export interface State {
    showForm: boolean;
    seller: Seller;
}

export class TelevendasComponent extends React.Component<Props, State> {

    constructor(props: State) {
        super(props);

        this.state = {
            showForm: false,
            seller: null,
        };
    }

    public delete_cookie(name: any) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }

    public async componentDidMount() {

        const sellerAvaible = this.televendasIsAvaible();

        if (sellerAvaible) {
            this.reload();
        } else {
            this.delete_cookie("codvend");
            this.delete_cookie("codloja");
            this.delete_cookie("seller");
        }
    }

    public reload = () => {
        this.setState({
            seller: utilsService.getEncodeObjectFromCookie("seller"),
        }, () => {
            this.canotShowForm();
        });
    }

    public canotShowForm = () => {

        const cod = Cookies.get("codvend") || utilsService.getQueryVariable(window.location.href, "utm_source");


        if (cod && cod !== "falso") {
            this.setState({
                showForm: false,
            });
            return;
        }

        this.setState({
            showForm: true,
        });
    }

    public televendasIsAvaible = () => {

        const regex = /sc=2/;

        if (regex.test(window.location.search)) {
            return true;
        } else if (regex.test(Cookies.get("VTEXSC"))) {
            return true;
        }

        return false;
    }

    public render() {
        const { showForm, seller } = this.state;
        return (
            <div>
                {showForm && <FormLoginComponent
                    handleHide={() => {
                        this.setState({
                            showForm: false,
                        });
                    }}
                    handleSeller={async (codseller: string, codstore: string) => {
                        this.reload();
                        window.loading(true);
                        try {
                            await dataSellers.setUtm(codseller);
                            window.loading(false);
                            const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?utm_source=${codseller}&sc=2`;
                            window.history.pushState({ path: newurl }, "", newurl);
                        } catch (error) {
                            window.location.href = `?utm_source=${codseller}&sc=2`;
                            console.warn("houve algum problema ao inserir as utms!");
                        }
                    }} />}
                {seller && <RuleCustomerService handleLogout={async () => {

                    window.loading(true);

                    await dataSellers.setUtm("falso");


                    Cookies.set("codvend", "falso");
                    Cookies.set("codloja", "falso");
                    Cookies.set("seller", "falso");

                    window.location.href = "?";

                }} seller={seller} />}
            </div>
        );
    }
}
