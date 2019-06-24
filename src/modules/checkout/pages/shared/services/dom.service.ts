class DOM {

    public $ = document.querySelector.bind(document);

    public createElement(tag: string, props: any) {
        const $el = document.createElement(tag);

        const keys = Object.keys(props);

        keys.forEach((key, index) => {
            $el.setAttribute(key, props[key]);
        });

        return $el;
    }

    public insertAfter(newNode: Element, referenceNode: Element) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    public insertBefore(newNode: Element, referenceNode: Element) {
        referenceNode.insertAdjacentElement("beforebegin", newNode);
    }

    public insertInner(newNode: Element, referenceNode: Element) {
        referenceNode.appendChild(newNode);
    }
}

export default new DOM();