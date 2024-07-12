import { TsxConstructor, TsxContext, TsxElement, TsxFunction, TsxProperties } from "../types.ts";
import { TsxBaseElement } from "./tsxBaseElement.ts";

export class TsxFunctionElement extends TsxBaseElement {
    constructor(private tsxFunction: TsxFunction, properties: TsxProperties, children: TsxElement[]) {
        super(properties, children); 
    }

    private isConstructor(func: TsxFunction): func is TsxConstructor {
        return func.prototype && func.prototype.constructor;
    } 

    public async render(context?: TsxContext): Promise<string> { 
        let element: TsxBaseElement;

        if (this.isConstructor(this.tsxFunction)) {
            const component = new this.tsxFunction();
            Object.assign(component, {
                _properties: this.properties,
                _context: context,
                _children: this.children
            });
            element = await component.define();
        } else {
            element = await this.tsxFunction(this.properties, this.children, context);
        }

        return element.render(context);
    }
}