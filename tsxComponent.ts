import { TsxComplexElement } from "./elements/tsxComplexElement.ts";
import { TsxElement, TsxProperties } from "./types.ts";

export abstract class TsxComponent<T extends TsxProperties = TsxProperties> {
    private _properties: T | null = null; 
    private _children: TsxElement[] | undefined;

    protected get properties(): T {
        return <T> this._properties;
    }

    protected get children(): TsxElement[] | undefined {
        return this._children;
    }

    public abstract render(): Promise<TsxComplexElement>
}