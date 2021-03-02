import { TsxComplexElement } from "./elements/tsxComplexElement.ts";
import { TsxElement, TsxProperties } from "./types.ts";

export abstract class TsxComponent {
    constructor(protected properties: TsxProperties, protected children?: TsxElement[]) {      
    }

    public abstract render(): Promise<TsxComplexElement>
}