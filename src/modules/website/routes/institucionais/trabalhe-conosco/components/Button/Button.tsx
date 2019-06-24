import * as React from "react";
import s from "./Button.scss";


export class ButtonComponent extends React.Component {

    public render() {
        return (

            <div className={s.wrapperWork}>
                <section className={[s.wrapperSize, s.wrapper].join("")}>
                    <h3 className={s.subtitleWork}>Se você se identificou com a gente, venha fazer parte do nosso time.
                        </h3>
                 <a  href="https://aramis.compleo.com.br/" target="_blank" > <button className={s.buttonWorkUs} >CONHEÇA NOSSAS VAGAS</button></a>  
                </section>
            </div>

        );
    }
}
