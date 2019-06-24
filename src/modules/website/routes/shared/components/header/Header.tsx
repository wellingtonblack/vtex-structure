import * as React from "react";
import s from "./Header.scss";
import SVGInline from "react-svg-inline";
import { SearchComponent } from "./components/Search/Search";
import { CartButtonComponent } from "./components/CartButton/CartButton";
import { NavigationComponent } from "./components/Navigation/Navigation";
import { Navigation } from "../../models/navigation";
import { Banner } from "../../models/banner.model";
import { NavigationMobileComponent } from "./components/NavigationMobile/NavigationMobile";
import { OverTopComponent } from "./components/OverTop/OverTop";
import bannerService from "../../services/banner.service";
import user from "../../../../assets/icons/user.svg";
import closemobile from "../../../../assets/icons/close-navigation-mobile.svg";
import IconMobile from "../../../../assets/icons/icon-menu-open.svg";
import search from "../../../../assets/icons/search.svg";
import { TelevendasComponent } from "./components/Televendas/Televendas";
import { SearchMobileComponent } from "./components/SearchMobile/SearchMobile";

export interface HeaderProps {
}

export interface HeaderState {
    items: Navigation[];
    banners: Banner[];
    showMenuMobile: boolean;
    searchActive: boolean;
    cartActive: boolean;
    searchIsOpen: boolean;
}

declare const items: Navigation[];
export class HeaderComponent extends React.Component<HeaderProps, HeaderState> {

    constructor(props: HeaderProps) {
        super(props);

        const bannersString: any = document.querySelector("#header-banners");
        const banners = bannersString && bannerService.getBanners(bannersString.innerText);

        this.state = {
            items,
            banners,
            showMenuMobile: false,
            searchActive: false,
            cartActive: false,
            searchIsOpen: !($(window).width() > 991),
        };
    }

    public showMenu = () => {
        if (!this.state.showMenuMobile) {
            this.setState({
                showMenuMobile: true,
            }, () => {
                document.querySelector("body").style.transform = "translateX(80%)";
                document.querySelector("body").style.height = "100%";
                document.querySelector("html").style.height = "100%";
                document.querySelector("html").style.overflow = "hidden";
            });
        } else {
            document.querySelector("body").removeAttribute("style");
            document.querySelector("html").removeAttribute("style");
            setTimeout(() => {
                this.setState({
                    showMenuMobile: false,
                });
            }, 500);
        }
    }
    public render() {
        return (
            <React.Fragment>
                <header className={[s.header, this.state.searchActive ? s.searchActive : "", this.state.cartActive ? s.cartActive : ""].join(" ")}>
                    <OverTopComponent className={s.navigationDesktop} />
                    {$(window).width() > 992 && <section className={s.wrapperSearch}>
                        <div className={s.wrapper}>
                            <a className={s.logo} href="/">
                                <img src="/arquivos/logo.png" alt="aramis" />
                                <h3 className={s.seo}>Aramis</h3>
                            </a>
                            {$(window).width() > 991 &&
                                <NavigationComponent
                                    banners={this.state.banners}
                                    className={s.navigationDesktop}
                                    items={this.state.items} />
                            }
                            <div className={s.navIcons}>
                                <SearchComponent handleActive={() => { }} />
                                <a href="/account" className={s.loginUser}>
                                    <SVGInline className={s.iconUser} svg={user} />
                                </a>
                                <CartButtonComponent />
                            </div>
                        </div>
                    </section>}
                    {$(window).width() < 992 && <section className={[s.navigationMobile, s.wrapperSearch].join(" ")}>
                        <div className={s.wrapper}>
                            <div onClick={this.showMenu} className={s.navigationButton}>
                                {!this.state.showMenuMobile ? <SVGInline className={s.IconMobile} svg={IconMobile} /> : <SVGInline className={s.closemobile} svg={closemobile} />}
                            </div>
                            <a className={s.logoMobile} href="/"><img src="/arquivos/logo.png" alt="aramis" /><h2 className={s.seo}>Aramis Wear</h2></a>
                            <div className={s.navIconMob}>
                                <div className={s.loginUser}>
                                    <a href="/account"><SVGInline svg={user} /></a>
                                </div>
                                <CartButtonComponent />
                                <div onClick={() => this.setState({ searchIsOpen: !this.state.searchIsOpen })}><SVGInline className={s.search} svg={!this.state.searchIsOpen ? closemobile : search} /></div>
                            </div>
                        </div>
                    </section>}
                    {$(window).width() < 992 && <SearchMobileComponent className={[s.searchMobile, !this.state.searchIsOpen ? s.searchOpen : s.searchClosed].join(" ")} handleActive={(searchActive) => this.setState({ searchActive })} />}
                </header>
                <TelevendasComponent />
                {$(window).width() < 992 && <div className={[s.searchMob, this.state.searchActive ? s.active : ""].join(" ")}></div>}
                {this.state.showMenuMobile && <NavigationMobileComponent items={this.state.items} handleClose={() => { this.setState({ showMenuMobile: false }); }} />}
                {this.state.showMenuMobile && <div onClick={this.showMenu} className={s.mask}></div>}
            </React.Fragment>
        );
    }
}
