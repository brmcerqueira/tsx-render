import { TsxSetup, TsxElement, TsxProperties } from "../types.ts";

export abstract class TsxBaseElement {
    constructor(protected properties: TsxProperties, protected children: TsxElement[]) {      
    }

    public abstract render(setup?: TsxSetup): Promise<string>
}