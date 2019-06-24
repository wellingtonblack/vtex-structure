import * as React from "react";
import s from "./SocialNetworks.scss";
import SVGInline from "react-svg-inline";
import facebook from "../../../../../../assets/icons/facebook-logo.svg";
import instagram from "../../../../../../assets/icons/instagram-logo.svg";
import youtube from "../../../../../../assets/icons/youtube-symbol.svg";
import linkedin from "../../../../../../assets/icons/linkedin-logo.svg";
import spotify from "../../../../../../assets/icons/spotify-logo-button.svg";

export interface SocialNetworksProps { }

export interface SocialNetworksState { }

export class SocialNetworksComponent extends React.Component<SocialNetworksState, SocialNetworksProps> {

    constructor(props: SocialNetworksProps) {
        super(props);
    }

    public render() {
        return (
            <div className={s.social}>
                <span className={s.textSocial}>social media</span>
                <div className={s.IconContent}>
                    <a href="https://www.facebook.com/aramismenswear" target="_blank" title={`facebook`}><SVGInline className={s.IconSocial} svg={facebook} /></a>
                    <a href="https://www.instagram.com/aramismenswear/" target="_blank" title={`instagram`}><SVGInline className={s.IconSocial} svg={instagram} /></a>
                    <a href="https://www.youtube.com/channel/UCJXYr3nD41n1kaYAzGXJ-dg" target="_blank" title={`youtube`}><SVGInline className={s.IconSocial} svg={youtube} /></a>
                    <a href="https://www.linkedin.com/company/aramis-menswear/" target="_blank" title={`linkedin`}><SVGInline className={s.IconSocial} svg={linkedin} /></a>
                    <a href="https://open.spotify.com/user/radioaramis?si=YkJO6jllRBmViPM6vEIvFw" target="_blank" title={`spotify`}><SVGInline className={s.IconSocial} svg={spotify} /></a>
                </div>
            </div>
        );
    }
}