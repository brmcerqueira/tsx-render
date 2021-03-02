import { TsxComponent } from "../tsxComponent.ts"
import { TsxElement, TsxFunction, TsxProperties } from "../types.ts";

export class TsxFunctionElement extends TsxComponent {
    constructor(private tsxFunction: TsxFunction, properties: TsxProperties, children: TsxElement[]) {
        super(properties, children); 
    }

    public async render(): Promise<string> {      
        try {
            const constructor: ObjectConstructor = this.tsxFunction.prototype.constructor;
            let component = <TsxComponent> new constructor(...[this.properties, this.children]);
            return (<any>(await component.render())).render();
        } catch {
            return (await this.tsxFunction(this.properties, this.children)).render();
        }
    }
}