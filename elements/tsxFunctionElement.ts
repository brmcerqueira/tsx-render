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
            const component = new this.tsxFunction();
            Object.assign(component, {
                _properties: this.properties,
                _children: this.children,
            });
            element = await component.render();
        } else {
            element = await this.tsxFunction(this.properties, this.children);
        }

        return element.render();
    }
}