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
        let component: TsxComponent | undefined = undefined;

        let build: (() => TsxBaseElement | Promise<TsxBaseElement>) | undefined = undefined;

        const complex = this.tsxComplex;

        if (this.isConstructor(complex)) {
            component = new complex();
            Object.assign(component, {
                _properties: this.properties,
                _children: this.children,
                _setup: setup
            });
            build = async () => await (component as TsxComponent).define();
        } 
        else {
            
            build = () => complex(this.properties, this.children, setup?.context);
        }

        let element: TsxBaseElement;

        if (setup?.wrapper) {
            element = await setup.wrapper(build, setup, component, this.properties);
        }
        else {
            element = await build();
        }

        return element.render(setup);
    }
}