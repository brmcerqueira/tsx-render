import { Node } from "./node.ts";

export class TextNode extends Node {
    constructor(public text: string) {
        super();
    }

    public async render(): Promise<string> {
        return this.doubleQuoteEncode(this.text
            .replace(/&/g, "&amp;")
            .replace(/\//g, "&#x2F;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&#39;"));
    }
}
