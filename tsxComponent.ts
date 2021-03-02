import { TsxComplexElement } from "./elements/tsxComplexElement.ts";
import { TsxElement, TsxProperties } from "./types.ts";

export abstract class TsxComponent<T extends TsxProperties = TsxProperties> {
    constructor(protected properties: T, protected children?: TsxElement[]) {      
    }

    public abstract render(): Promise<TsxComplexElement>
}