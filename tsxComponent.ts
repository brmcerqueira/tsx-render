import { TsxComplexElement } from "./elements/tsxComplexElement.ts";
import { TsxElement, TsxProperties } from "./types.ts";

export abstract class TsxComponent<T extends TsxProperties = TsxProperties, TBag extends TsxProperties = TsxProperties> {
    constructor(protected properties: T, protected children?: TsxElement[], protected bag?: TBag) {      
    }

    public abstract render(): Promise<TsxComplexElement<TBag>>
}