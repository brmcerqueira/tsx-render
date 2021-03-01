import { TsxElement, TsxProperties } from "./types.ts";

export abstract class TsxComplexElement {
    constructor(protected properties: TsxProperties, protected children: TsxElement[]) {      
    }

    public abstract render(): Promise<string>
}