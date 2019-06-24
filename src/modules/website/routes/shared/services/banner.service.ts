import { Banner } from "../models/banner.model";
import utilsService from "./utils-service";


class BannerService {
    public getBanners(content: string) {
        const images: Banner[] = [];

        const container = utilsService.getPlaceholderContent(content);

        const links = container.querySelectorAll(".box-banner a");

        for (let index = 0; index < links.length; index++) {
            const link: Element = links[index];
            const image = link.querySelector("img");

            // atributes
            const alt = image.getAttribute("alt");
            const src = image.getAttribute("data-src");
            const href = link ? link.getAttribute("href") : "";

            let _banner = null;
            if (alt.match(/mobile/i)) {
                _banner = images.filter((banner: Banner, idx: number) => {
                    if (alt.toLowerCase().replace(/mobile/i, "").toLowerCase().indexOf(banner.alt.toLowerCase().replace("mobile", "")) > -1) {
                        images[idx].srcMob = src;
                        return banner;
                    }
                });
            }

            if (!_banner) {
                images.push({
                    alt,
                    href,
                    src,
                    target: utilsService.target(href),
                });
            }
        }

        const contents = container.querySelectorAll(".content");

        for (let index = 0; index < contents.length; index++) {
            const contentBanner: Element = contents[index];
            const label = contentBanner.getAttribute("data-banner");
            // tslint:disable-next-line:no-unused-expression
            images.forEach((banner, _index) => {
                if (banner.alt.toLowerCase() === label.toLowerCase()) {
                    banner.content = contentBanner.innerHTML;
                }
            });
        }

        return images;
    }

    public getBanner(link: Element): Banner {

        if (!link) {
            return null;
        }

        if (link.tagName !== "A") {
            link = link.querySelector("a");
        }

        const image = link.querySelector("img");

        // atributes
        const alt = image.getAttribute("alt");
        const src = image.getAttribute("data-src");
        const href = link ? link.getAttribute("href") : "";

        return {
            alt,
            href,
            src,
            target: utilsService.target(href),
        };
    }


    public getBannerWithPosition(ref: string) {
        
        const bannersstr: string = document.querySelector(ref).innerHTML;
        
        const bannersElements: Element = utilsService.getPlaceholderContent(bannersstr);
        
        const _banners = bannersElements && bannersElements.querySelectorAll(".banner");

        const banners = [];
        
        for (let index = 0; index < _banners.length; index++) {
            const bannerElement = _banners[index];
            const box = bannerElement.querySelector(".box-banner");
            const banner = this.getBanner(box);
            banners.push(banner);
        }

        return banners;
    }
}

export default new BannerService();