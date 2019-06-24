import * as ReactDOM from "react-dom";
import domService from "../services/dom.service";


export abstract class Page {

    protected ROOTS: any = [];

    public OnDestroy(): void {

        this.ROOTS.forEach((ROOT: any) => {
            if (ROOT) {
                ReactDOM.unmountComponentAtNode(ROOT);
            }
        });

        const classRemove: any[] = [];
        for (let index = 0; index < document.body.classList.length; index++) {
            const classname: string = document.body.classList[index];
            if (classname.indexOf("hide") > -1) {
                classRemove.push(classname);
            }
        }

        classRemove.forEach((className: string) => {
            document.body.classList.remove(className);
        });

        this.OnChildDestroy();
    }

    public abstract OnChildDestroy(): void;

    protected renderStaticComponent(component: JSX.Element, elementRef: string) {
        const ROOT = domService.$(elementRef);
        if (ROOT) {
            return ReactDOM.render(component, ROOT);
        }
    }

    protected renderComponent(component: JSX.Element, elementRef: string, containerAppendRoot: string, position: string = "inner", elementTag: string = "div", removeElement: boolean = false): any {
        const conditional1 = (domService.$(elementRef) && !domService.$(`#${containerAppendRoot}`));
        const conditional2 = (domService.$(elementRef) && domService.$(`#${containerAppendRoot}`) && domService.$(`#${containerAppendRoot}`).innerHTML === "");

        if (conditional1 || conditional2) {
            let ROOT = domService.$(`#${containerAppendRoot}`);

            if (conditional1) {

                ROOT = domService.createElement(elementTag, { id: containerAppendRoot });

                switch (position) {
                    case "after":
                        domService.insertAfter(ROOT, domService.$(elementRef));
                        break;
                    case "inner":
                        domService.insertInner(ROOT, domService.$(elementRef));
                        break;
                    case "before":
                        domService.insertBefore(ROOT, domService.$(elementRef));
                        break;
                }
            }

            const data = ReactDOM.render(component, ROOT);
            this.ROOTS.push(ROOT);
            if (removeElement) {
                domService.$(elementRef).remove();
            }
            return data;
        }
    }


}