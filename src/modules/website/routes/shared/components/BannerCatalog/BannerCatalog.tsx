import * as React from "react";
import { Banner } from "../../../shared/models/banner.model";
import { ImageBackgroundComponent } from "../../../shared/components/ImageBackground/ImageBackground";
import { LazyComponentComponent } from "../../../shared/components/LazyLoad/LazyLoad";
import { Shelf } from "../../../shared/models/shelf.model";
import s from "./BannerCatalog.scss";

import { ShelfComponent } from "./components/Shelf/Shelf";

export interface BannerCatalogProps {
    shelf?: Shelf;
    className?: string;
    notLazy?: boolean;
}

export interface BannerCatalogState {
    banner: Banner;
    shelf: Shelf;
}

export class BannerCatalogComponent extends React.Component<BannerCatalogProps, BannerCatalogState> {

    constructor(props: BannerCatalogProps) {
        super(props);

        this.state = {
            banner: null,
            shelf: this.props.shelf,
        };
    }

    public setBanners(banners: Banner[]) {
        this.setState({
            banner: banners[0],
        });
    }

    public setShelfs(shelfs: Shelf[]) {
        try {
            this.setState({
                shelf: shelfs[0],
            });
        } catch (error) {
            console.warn("Não foi possivel renderizar a prateleira.");
        }
    }

    public render() {

        const { banner } = this.state;
        const ele = <section className={s.bannerWrapper}>
            <div className={s.wrapper}>
                {window.innerWidth > 991 && banner && <div className={s.imageWrapper}>
                    <ImageBackgroundComponent
                        alt={banner.alt}
                        className={s.banner}
                        heigth={300}
                        src={banner.src}
                        srcMob={banner.srcMob}
                        width={500}
                        href={banner.href}
                    />
                </div>}
                <div className={s.wrapperShelf}>
                    <ShelfComponent className={s.shelf} shelf={this.state.shelf} />
                </div>
            </div>
            {this.props.children}
        </section>;
        return (
            this.props.notLazy ? ele : <LazyComponentComponent>
                {ele}
            </LazyComponentComponent>
        );
    }
}
