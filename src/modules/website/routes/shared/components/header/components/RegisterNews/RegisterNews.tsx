import * as React from "react";
import s from "./RegisterNews.scss";

export interface RegisterNewsProps {

}

export interface RegisterNewsState {

}

export class RegisterNewsComponent extends React.Component<RegisterNewsProps, RegisterNewsState> {

    constructor(props: RegisterNewsProps) {
        super(props);
    }

    public render() {

        return (
            <div className={s.wrapper}>
                <h2 className={s.title}>quer receber<br/>
                ofertas exclusivas?</h2>
                <form className={s.form} action="">
                    <input placeholder={"seu email"} type="text"/>
                    <button>quero</button>
                </form>
            </div>
        );
    }
}
