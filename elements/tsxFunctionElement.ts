import { TsxConstructor, TsxElement, TsxFunction, TsxProperties } from "../types.ts";
import { TsxComplexElement } from "./tsxComplexElement.ts";

export class TsxFunctionElement extends TsxComplexElement {
    constructor(private tsxFunction: TsxFunction<TsxProperties>, properties: TsxProperties, children: TsxElement[]) {
        super(properties, children); 
    }

    private isConstructor(func: TsxFunction<TsxProperties>): func is TsxConstructor<TsxProperties> {
        return func.prototype && func.prototype.constructor;
    } 

    public async render(): Promise<string> {
        this.initBag(); 
        let element: TsxComplexElement;

        if (this.isConstructor(this.tsxFunction)) {  
            element = await new this.tsxFunction(this.properties, this.children, this.bag).render();
        } else {
            element = await this.tsxFunction(this.properties, this.children, this.bag);
        }

        return element.render();
    }
}