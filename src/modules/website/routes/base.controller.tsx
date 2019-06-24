import * as React from "react";
import * as ReactDOM from "react-dom";
import bannerService from "./shared/services/banner.service";
import utilsService from "./shared/services/utils-service";
import shelfService from "./shared/services/shelf.service";
import { Shelf } from "./shared/models/shelf.model";


export abstract class BaseController {

    public renderComponent(reactElement: React.ReactElement<any>, ref: string, element?: Element) {
        if (element) {
            ReactDOM.render(reactElement, element);
            return;
        }
        const elementRef = document.querySelector(ref);
        if (elementRef) {
            return ReactDOM.render(reactElement, elementRef);
        }
    }

    protected renderBanner(reactElement: React.ReactElement<any>, ref: string, single: boolean = true) {
        const elementRef = document.querySelector(ref);
        if (elementRef) {
            const content: any = elementRef.querySelector("noscript.placeholder");
            const banners = bannerService.getBanners(content.innerText);
            const element: any = ReactDOM.render(reactElement, elementRef);
            banners.length > 0 && element && (element as any).setBanner(banners);
        }
    }

    protected renderBannersShelf(reactElement: React.ReactElement<any>, ref: string) {
        const elementRef = document.querySelector(ref);
        if (elementRef) {
            const content: any = elementRef.querySelector("noscript.placeholder");
            const title = this.getTitle(content);
            const banners = bannerService.getBanners(content);
            const element: any = ReactDOM.render(reactElement, elementRef);
            if ((element as any).setBanners) {
                (element as any).setBanners(banners);
            }
            if (title) {
                if ((element as any).setTitle) {
                    (element as any).setTitle(title);
                }
            }
        }
    }

    protected renderBannerWithCollection(reactElement: React.ReactElement<any>, ref: string) {
        const rootContents = document.querySelectorAll(ref);

        for (let index = 0; index < rootContents.length; index++) {

            const contentElement = rootContents[index];

            const content: any = contentElement.querySelector("noscript.placeholder");

            const banners = bannerService.getBanners(content.innerText);

            const shelfs: Shelf[] = shelfService.getShelfs(content.innerText);

            const element: any = ReactDOM.render(reactElement, contentElement);

            if ((element as any).setBanners) {
                (element as any).setBanners(banners);
            }

            if ((element as any).setShelfs && shelfs) {
                (element as any).setShelfs(shelfs);
            }
        }
    }

    protected renderComponentWithShelf(reactElement: React.ReactElement<any>, ref: string) {
        const elementRef = document.querySelector(ref);
        if (elementRef) {
            const content: any = elementRef.querySelector("noscript.placeholder");
            const shelf = shelfService.getShelfs(content.innerText);
            const element: any = ReactDOM.render(reactElement, elementRef);

            if ((element as any).setShelf) {
                (element as any).setShelf(shelf[0]);
            }

        }
    }

    protected createComments() {
        window.onload = () => {
            const yvs = document.createElement("script");
            yvs.type = "text/javascript";
            yvs.async = true;
            yvs.id = "_yvsrc";
            yvs.src = "//service.yourviews.com.br/script/fd541e8d-1135-443f-9664-8f7fdc1b4b6b/yvapi.js";
            const yvsscript = document.getElementsByTagName("script")[0];
            yvsscript.parentNode.insertBefore(yvs, yvsscript);
        };
    }

    private getTitle(content: string) {
        const container: any = utilsService.getPlaceholderContent(content);
        const title = container.querySelector(".content-title");
        if (!title) {
            return;
        }
        return title.innerText;
    }

}