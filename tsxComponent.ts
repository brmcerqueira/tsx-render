import { TsxBaseElement } from "./elements/tsxBaseElement.ts";
import { TsxContext, TsxElement, TsxProperties } from "./types.ts";

export abstract class TsxComponent<T extends TsxProperties = TsxProperties, TContext extends TsxContext = TsxContext> {
    private _properties: T | null = null; 
    private _children: TsxElement[] | undefined;
    private _context: TsxContext;

    protected get properties(): T {
        return <T> this._properties;
    }

    protected get children(): TsxElement[] | undefined {
        return this._children;
    }

    protected get context(): TContext {
        return <TContext> this._context;
    }

    public abstract define(): Promise<TsxBaseElement>
}