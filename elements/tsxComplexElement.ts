import { TsxComponent } from "../tsxComponent.ts";
import { TsxConstructor, TsxSetup, TsxElement, TsxComplex, TsxProperties } from "../types.ts";
import { TsxBaseElement } from "./tsxBaseElement.ts";

export class TsxComplexElement extends TsxBaseElement {
    constructor(private tsxComplex: TsxComplex, properties: TsxProperties, children: TsxElement[]) {
        super(properties, children); 
    }

    private isConstructor(complex: TsxComplex): complex is TsxConstructor {
        return complex.prototype && complex.prototype.constructor;
    } 

    public async render(setup?: TsxSetup): Promise<string> { 
        const context = setup?.context;

        let element: TsxBaseElement;

        let component: TsxComponent | undefined = undefined;

        if (this.isConstructor(this.tsxComplex)) {
            component = new this.tsxComplex();
            Object.assign(component, {
                _properties: this.properties,
                _children: this.children,
                _context: context
            });
            element = await component.define();
        } 
        else {
            element = await this.tsxComplex(this.properties, this.children, context);
        }

        if (setup?.wrapper) {
            element = await setup.wrapper(element, component, this.properties, context)
        }

        return element.render(setup);
    }
}