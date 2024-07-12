import { TsxBaseElement } from "./elements/tsxBaseElement.ts";
import { TsxComponent } from "./tsxComponent.ts";

export type TsxContext = any | undefined;

export type TsxElement = TsxBaseElement | TsxBaseElement[] | string | number;

export type TsxProperties = {
    [key: string]: any;
};

export type TsxConstructor = {
    new(): TsxComponent;
};

export type TsxFunction = TsxConstructor | ((properties?: TsxProperties, children?: TsxElement[], context?: TsxContext) => TsxBaseElement | Promise<TsxBaseElement>);