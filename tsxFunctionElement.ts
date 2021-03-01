import { TsxElement } from "./tsxElement.ts";
import { TsxFunction, TsxProperties } from "./types.ts";

export class TsxFunctionElement extends TsxElement {
    constructor(private tsxFunction: TsxFunction, properties: TsxProperties, children: TsxElement[]) {
        super(properties, children); 
    }

    public async render(): Promise<string> {
        return (await this.tsxFunction(this.properties, this.children)).render();
    }
}