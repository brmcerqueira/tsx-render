import { TsxBaseElement } from "./elements/tsxBaseElement.ts";
import { TsxElement, TsxProperties } from "./types.ts";

export abstract class TsxComponent<T extends TsxProperties = TsxProperties, TContext = any | undefined> {
    private _properties: T | null = null; 
    private _children: TsxElement[] | undefined;
    private _context: TContext | undefined;

    protected get properties(): T {
        return <T> this._properties;
    }

    protected get children(): TsxElement[] | undefined {
        return this._children;
    }

    protected get context(): TContext | undefined {
        return this._context;
    }

    public abstract define(): Promise<TsxBaseElement>
}