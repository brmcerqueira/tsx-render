import { TsxProperties } from "./types.ts";

export abstract class TsxElement {
    constructor(protected properties: TsxProperties, protected children: TsxElement[]) {      
    }

    public abstract render(): Promise<string>
}