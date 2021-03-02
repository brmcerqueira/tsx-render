import { TsxConstructor, TsxElement, TsxFunction, TsxProperties } from "../types.ts";
import { TsxComplexElement } from "./tsxComplexElement.ts";

export class TsxFunctionElement extends TsxComplexElement {
    constructor(private tsxFunction: TsxFunction, properties: TsxProperties, children: TsxElement[]) {
        super(properties, children); 
    }

    private isConstructor(func: TsxFunction): func is TsxConstructor {
        return func.prototype && func.prototype.constructor;
    } 

    public async render(): Promise<string> { 
        let element: TsxComplexElement;

        if (this.isConstructor(this.tsxFunction)) {
            element = await new this.tsxFunction(this.properties, this.children).render();
        } else {
            element = await this.tsxFunction(this.properties, this.children);
        }

        return element.render();
    }
}