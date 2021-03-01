import { TsxElement } from "./tsxElement.ts";
import { TsxProperties } from "./types.ts";

export class TsxFragmentElement extends TsxElement {
    constructor(properties: TsxProperties, children: TsxElement[]) {
        super(properties, children);
    }

    public async render(): Promise<string> {
        return this.treatElements(this.children);
    }

    private async treatElements(elements: TsxElement[]): Promise<string> {
        let result = "";

        for (const child of elements) {
            if (Array.isArray(child)) {
                result += await this.treatElements(child);
            }
            else if (child instanceof TsxElement) {
                result += await child.render();
            }
            else {
                result += child;
            }
        }

        return result;
    }
}