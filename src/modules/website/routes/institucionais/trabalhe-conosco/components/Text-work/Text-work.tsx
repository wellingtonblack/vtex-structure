import * as React from "react";
import s from "./Video.scss";

export interface VideoProps {
}

export interface VideoState {
}

export class TextComponent extends React.Component<VideoProps, VideoState> {

    constructor(props: VideoProps) {
        super(props);
    }


    public render() {
        return (
            <div className="work-withus-content">
                <div className={s.textWorkUs}>
                    A Aramis atua no mercado de moda masculina há mais de 20 anos, com excelência em qualidade, alinhada ao que há de novo em menswear pelo mundo. Inovamos constantemente, e nos mantemos conectados às tendências e demandas da moda masculina contemporânea.
           </div>


                <div className={s.textWorkUs}>
                    Aqui você vai conhecer um pouco sobre o nosso propósito, valores e atitudes que temos em nosso dia-a-dia. Nossos principais pilares são pessoas e inovação.

</div>
                <div className={s.textWorkUs}>
                    Acreditamos na transformação do varejo e no impacto positivo que podemos gerar na vida das pessoas. E essa missão começa dentro da nossa casa, com os nossos colaboradores. Valorizamos as atitudes positivas, o brilho no olhar, e a paixão por fazer acontecer.
           </div>

            </div>
        );
    }
}
