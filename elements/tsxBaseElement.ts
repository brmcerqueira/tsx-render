import { TsxContext, TsxElement, TsxProperties } from "../types.ts";

export abstract class TsxBaseElement {
    constructor(protected properties: TsxProperties, protected children: TsxElement[]) {      
    }

    public abstract render(context?: TsxContext): Promise<string>
}