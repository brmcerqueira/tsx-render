import { TsxBaseElement } from "./elements/tsxBaseElement.ts";
import { TsxElement, TsxProperties, TsxSetup } from "./types.ts";

export abstract class TsxComponent<T extends TsxProperties = TsxProperties, TContext = any | undefined> {
    private _properties: T | null = null; 
    private _children: TsxElement[] | undefined;
    private _setup: TsxSetup<TContext> | undefined;

    protected get properties(): T {
        return <T> this._properties;
    }

    protected get children(): TsxElement[] | undefined {
        return this._children;
    }

    protected get context(): TContext | undefined {
        return this._setup?.context;
    }

    protected async render(): Promise<string> {
        return (await this.define()).render(this._setup);
    }

    public abstract define(): Promise<TsxBaseElement>
}