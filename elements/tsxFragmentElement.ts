import { TsxSetup, TsxElement, TsxProperties } from "../types.ts";
import { TsxBaseElement } from "./tsxBaseElement.ts";

export class TsxFragmentElement extends TsxBaseElement {
    private _setup: TsxSetup | undefined; 

    constructor(properties: TsxProperties, children: TsxElement[]) { 
        super(properties, children); 
    }

    public async render(setup?: TsxSetup): Promise<string> {
        this._setup = setup;
        return this.renderChildren(this.children);
    }

    private async renderChildren(elements: TsxElement[]): Promise<string> {
        let result = "";

        for (const child of elements) {
            if (Array.isArray(child)) {
                result += await this.renderChildren(child);
            }
            else if (child instanceof TsxBaseElement) {
                result += await child.render(this._setup);
            }
            else if (typeof child === "string" || typeof child === "number") {
                result += child;
            }
        }

        return result;
    }
}