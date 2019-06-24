import * as React from "react";
import s from "./instagram.component.scss";
import SVGInline from "react-svg-inline";
import sigainstagram from "../../../../assets/icons/siga-instagram.svg";
import Slider from "react-slick";


export interface InstagramProps {

}

export interface InstagramState {
    isLoad: boolean;
    images?: any[];
}

export class InstagramComponent extends React.Component<InstagramProps, InstagramState> {

    /**
     *
     */
    public result: any;
    public element: any;
    public isLoad: any;
    constructor(props: any) {
        super(props);
        this.state = {
            isLoad: false,
        };
    }

    public componentWillMount() {
        // this.isLoad = () => {
        //     if (window.innerHeight - this.element.getBoundingClientRect().bottom < 100 && !this.state.isLoad) {
        //         this.setState({
        //             isLoad: true,
        //         }, () => {

        //             window.removeEventListener("scroll", this.isLoad, false);
        //         });
        //     }
        // };

        // window.addEventListener("scroll", this.isLoad);

        $.ajax({
            url: "https://aramismenswear.socialbuy.com.br/api/v1/public/showcase/198.json?per_page=40",
            type: "GET",
            success: (data) => this.setState({ images: data.data }, () =>
                console.log(this.state.images)),
            error: (err) => console.error(err),

        });
    }
    public render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            autoplay: true,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        // arrows: false,
                    },
                },
            ],
        };
        const images = this.state.images;
        return (
            <section ref={(ref) => { this.element = ref; }} className={s.instagramComponent}>
                <div className={s.wrapper}>
                    <h2 className={s.title}>siga nosso instagram
                            <SVGInline className={s.logoCollection} svg={sigainstagram} />
                    </h2>

                    <div className={s.contentInstagram}>
                        {images &&
                            <Slider {...settings} >
                                {images && images.map((data) => <div>
                                    <a href={data.kind === "looks" ? data[data.kind][0].link : data.link}>
                                        <img className={s.instaImage} src={data.image_high.url} alt="" />
                                    </a>
                                </div>)}
                            </Slider>}
                    </div>
                </div>
            </section>
        );
    }
}