import { TsxComplexElement } from "./elements/tsxComplexElement.ts";
import { TsxElement, TsxProperties } from "./types.ts";

export abstract class TsxComponent<T extends TsxProperties = TsxProperties> {
    constructor(protected properties: TsxProperties, protected children?: TsxElement[], protected bag?: T) {      
    }

    public abstract render(): Promise<TsxComplexElement>
}