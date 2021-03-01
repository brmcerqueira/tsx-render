import { TsxComplexElement } from "./tsxComplexElement.ts";
import { TsxElement, TsxFunction, TsxProperties } from "./types.ts";

export class TsxFunctionElement extends TsxComplexElement {
    constructor(private tsxFunction: TsxFunction, properties: TsxProperties, children: TsxElement[]) {
        super(properties, children); 
    }

    public async render(): Promise<string> {
        return (await this.tsxFunction(this.properties, this.children)).render();
    }
}