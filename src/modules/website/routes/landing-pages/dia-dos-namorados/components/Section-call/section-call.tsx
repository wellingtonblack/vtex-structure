import * as React from "react";
import s from "./Section-call.scss";


export interface SectionCallProps {
}

export interface SectionCallState {

}

export class SectionCallComponent extends React.Component<SectionCallProps, SectionCallState> {

    constructor(props: SectionCallProps) {
        super(props);
        this.state = {

        };
    }


    public render() {
        return (

            [<section className={s.sectionCallTop}>
                <div className={s.boxTitle}>
                    {($(window).width() > 480) ?
                        <img src={"/arquivos/o-que-aprendemos-ate-aqui.jpg"} alt="Dia dos namorados" />
                        : <img src={"/arquivos/aramis_dia_dos_namorados_mobile.jpg"} alt="Dia dos namorados" />}
                </div>
                <div className={s.boxText}>
                    <h2 className={s.text}>
                        Todo mundo sente um <br/> 
                        monte de coisas. <br/>
                        Todo mundo. <br/>
                        <span>E todo mundo precisa falar sobre isso.</span>
                    </h2>
                </div>
            </section>,
            <section className={s.sectionCallBottom}>
                <div className={[s.firstPhrase, s.wrapper].join(" ")}>
                    <h3 className={s.firstText}>
                        Assim como vestir a roupa que expressa quem você é, encontrar formas de dizer o que você sente é libertador. O mundo não precisa de mais
                        conteúdos te falando o que fazer, o mundo só quer mais gente falando que se reconhece.
                    </h3>
                    <h3 className={s.secondText}>
                        Neste Dia dos Namorados, a Aramis faz um convite às palavras, às conversas, aos sentimentos.
                    </h3>
                </div>
            </section>]

        );
    }
}
