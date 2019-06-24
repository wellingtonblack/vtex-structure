

export interface Route {
    bodyclass: string;
    loader(): Promise<any>;
}

const ROUTES: Route[] = [
    {
        bodyclass: "home",
        loader: () => import(/* webpackChunkName: "home" */"../routes/home/home.controller"),
    },
    {
        bodyclass: "department",
        loader: () => import(/* webpackChunkName: "department" */"../routes/department/department.controller"),
    },
    {
        bodyclass: "product",
        loader: () => import(/* webpackChunkName: "product" */"../routes/product/product.controller"),
    },
    {
        bodyclass: "account",
        loader: () => import(/* webpackChunkName: "account" */"../routes/account/account.controller"),
    },
    {
        bodyclass: "brands",
        loader: () => import(/* webpackChunkName: "brands" */"../routes/brands/brands.controller"),
    },
    {
        bodyclass: "empty-search",
        loader: () => import(/* webpackChunkName: "empty-search" */"../routes/empty-search/empty-search.controller"),
    },
    {
        bodyclass: "trabalhe-conosco",
        loader: () => import(/* webpackChunkName: "work-us" */"./institucionais/trabalhe-conosco/trabalhe-conosco.controller"),
    },
    {
        bodyclass: "boyfriends",
        loader: () => import(/* webpackChunkName: "landing-pages" */"./landing-pages/dia-dos-namorados/dia-dos-namorados.controller"),
    },
    {
        bodyclass: "login",
        loader: () => import(/* webpackChunkName: "login" */"./login/login.controller"),
    },
    {
        bodyclass: "institucional",
        loader: () => import(/* webpackChunkName: "institucional" */"./institucionais/institucional.controller"),
    },

];

export function RouteModule(bodyElement: Element) {
    ROUTES.forEach((route) => {
        if (bodyElement.classList.contains(route.bodyclass)) {
            route.loader()
                .then(() => {
                    bodyElement.classList.add("active");
                });
        }
    });
}