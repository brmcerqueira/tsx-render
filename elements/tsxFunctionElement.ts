import { TsxConstructor, TsxElement, TsxFunction, TsxProperties } from "../types.ts";
import { TsxComplexElement } from "./tsxComplexElement.ts";

export class TsxFunctionElement extends TsxComplexElement {
    constructor(private tsxFunction: TsxFunction | TsxConstructor, properties: TsxProperties, children: TsxElement[]) {
        super(properties, children); 
    }

    private isConstructor(func: TsxFunction | TsxConstructor): func is TsxConstructor {
        return func.prototype && func.prototype.constructor;
    } 

    public async render(): Promise<string> { 
        let element: TsxComplexElement;

        if (this.isConstructor(this.tsxFunction)) {
            const constructor: TsxConstructor = this.tsxFunction.prototype.constructor;
            element = await new constructor(this.properties, this.children).render();
        } else {
            element = await this.tsxFunction(this.properties, this.children)
        }

        return element.render();
    }
}