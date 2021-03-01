import { TsxComplexElement } from "./tsxComplexElement.ts";
import { TsxElement, TsxProperties } from "./types.ts";

export class TsxFragmentElement extends TsxComplexElement {
    constructor(properties: TsxProperties, children: TsxElement[]) { 
        super(properties, children); 
    }

    public async render(): Promise<string> {
        return this.renderChildren(this.children);
    }

    private async renderChildren(elements: TsxElement[]): Promise<string> {
        let result = "";

        for (const child of elements) {
            if (Array.isArray(child)) {
                result += await this.renderChildren(child);
            }
            else if (child instanceof TsxComplexElement) {
                result += await child.render();
            }
            else if (typeof child === "string" || typeof child === "number") {
                result += child;
            }
        }

        return result;
    }
}