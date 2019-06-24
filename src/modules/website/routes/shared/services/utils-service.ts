class UtilsService {
    public getPathFromImageTag(tag: string, width?: number, heigth?: number) {
        if (!tag) {
            return "";
        }


        let path: string = tag.match(/src\s*=\s*"(.+?)"/)[0].replace(/[\\"]/g, "").replace("src=", "").replace(/~\//, "/");

        if (width && heigth) {
            path = this.cropImage(width, heigth, path);
        }

        return path;
    }

    public findAll(regex: RegExp, sourceString: string, aggregator: any[] = []): any[] {

        const arr = regex.exec(sourceString);

        if (arr === null) { return aggregator; }

        const newString = sourceString.slice(arr.index + arr[0].length);
        return this.findAll(regex, newString, aggregator.concat([arr]));
    }

    public parseDate(str: string): Date {
        const y: any = parseInt(str.substr(0, 4));
        const m: any = parseInt(str.substr(4, 2)) - 1;
        const d: any = parseInt(str.substr(6, 2));
        const D: Date = new Date(y, m, d);
        return (D.getFullYear() === y && D.getMonth() === m && D.getDate() === d) ? D : null;
    }


    public cropImage(width: any, heigth: any, path: string): string {

        if (!path) {
            return null;
        }
        const pathmatch = path.match(/\/[0-9\-].+\//)[0].replace(/\//g, "").split("-");
        const imageCroped = path.replace(/\/[0-9\-].+\//, `/${pathmatch[0]}-${width}-${heigth}/`);

        return imageCroped;
    }

    public getWidthAndHeight(path: string) {
        const pathmatch = path.match(/\/[0-9\-].+\//)[0].replace(/\//g, "").split("-");
        const width = parseFloat(pathmatch[1]);
        const height = parseFloat(pathmatch[2]);

        return {
            width,
            height,
        };
    }

    public resizeImage(percentage: number, path: string) {

        if (!path) {
            return null;
        }

        const pathmatch = path.match(/\/[0-9\-].+\//)[0].replace(/\//g, "").split("-");
        const width = parseFloat(pathmatch[1]);
        const height = parseFloat(pathmatch[2]);
        const imageCroped = path.replace(/\/[0-9\-].+\//, `/${pathmatch[0]}-${width * percentage / 100}-${height * percentage / 100}/`);


        return imageCroped;
    }

    public target(path: string) {
        if (!path) {
            return "_self";
        }

        if (/^\//.test(path) || path.indexOf(window.location.host) > - 1) {
            return "_self";
        } else {
            return "_blank";
        }
    }

    public parseMoney(price: number, formated: boolean = false): string {
        if (!price) {
            return "";
        }
        const priceFormated = `${price.toFixed(2).replace(/\./, ",")}`;
        if (formated) {
            return `R$ ${priceFormated}`;
        } else { }
        return `${priceFormated}`;
    }

    public formatMoney(price: string): number {

        if (!price) {
            return 0;
        }
        return parseFloat(price.replace("R$", "").replace(/\./, "").replace(/\,/, "."));
    }

    public getPlaceholderContent(content: string) {
        content = content.replace(/src=/g, "data-src=");
        const container = document.createElement("div");
        container.innerHTML = content.trim();
        return container;
    }

    public removeAccents = (s: any) => {
        const i = "ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖŐòóôõöőÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜŰùúûüűÑñŠšŸÿýŽž,()".split("");
        const o = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUUuuuuuNnSsYyyZz   ".split("");
        const map: any = {};
        i.forEach((el: any, idx: number) => { map[el] = o[idx]; });
        return s.replace(/[^A-Za-z0-9]/g, (ch: any) => map[ch] || ch);
    }

    public getDate = (date: string) => {
        date = date.match(/\d{4}\-\d{2}\-\d{2}/)[0];

        const dateSplit = date.split(/\-/);

        return `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]}`;
    }

    public createCookie = (name: any, value: any, days: any) => {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    public getQueryVariable = (url: any, variable: any) => {
        const query = url.substring(url.indexOf("?") + 1, url.length);
        const vars = query.split("&");
        for (let i = 0; i < vars.length; i++) {
            const pair = vars[i].split("=");
            if (decodeURIComponent(pair[0]) === variable) {
                return decodeURIComponent(pair[1]);
            }
        }
        console.warn("Query variable %s not found'", variable);
    }

    public getCookie(cname: any) {
        if (!name) { return null; }
        const cookieArray = document.cookie.split("; ");
        for (let i = 0; i < cookieArray.length; i++) {
            const cookieName = cookieArray[i].split("=");
            if (cookieName[0] === decodeURI(name)) {
                let result;
                try {
                    result = JSON.parse(decodeURI(cookieName[1]));
                } catch (e) {
                    result = decodeURI(cookieName[1]);
                }
                if (result === "") { return null; }
                return result;
            }
        }
        return null;
    }

    public truncate(content: any, limit: any, after: any) {

        // Get the inner content of the element
        content = content.trim();

        // Convert the content into an array of words
        // Remove any words above the limit
        const words = content.split(" ");
        if (words.length > limit) {
            content = words.slice(0, limit);

            // Convert the array of words back into a string
            // If there's content to add after it, add it
            content = content.join(" ") + (after ? after : "");
        }

        // Inject the content back into the DOM
        return content;
    }

    public scrollTop(scrollTop: number) {
        const body = $("html, body");
        body
            .stop()
            .animate({ scrollTop }, 1000);
    }

    public boletopercentage(price: number, per: number = 10) {
        return (price - (price * per / 100));
    }

    public percentage(oldPrice: number, newPrice: number) {
        return Math.round(((newPrice * 100 / oldPrice) - 100) * -1);
    }

    public isElementInViewport(el: Element) {

        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el as any[0];
        }

        const rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
    }

    public groupBy = (xs: any, key: any) => {
        return xs.reduce((rv: any, x: any) => {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    }

    public createEncodeObjectFromCookie(key: string, obj: any, days: any) {
        this.createCookie(key, encodeURIComponent(JSON.stringify(obj)), days);
    }
    public getEncodeObjectFromCookie(key: string) {
        try {
            const objEncoded = Cookies.get(key);
            return objEncoded ? JSON.parse(decodeURIComponent(objEncoded)) : null;
        } catch (error) {
            return null;
        }
    }
}

export default new UtilsService();