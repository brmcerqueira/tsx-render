import { TsxComplexElement } from "./elements/tsxComplexElement.ts";
import { TsxComponent } from "./tsxComponent.ts";

export type TsxElement = TsxComplexElement | TsxComplexElement[] | string | number;

export type TsxProperties = {
    [key: string]: any;
};

export type TsxConstructor = {
    new(): TsxComponent;
};

export type TsxFunction = TsxConstructor | ((properties: TsxProperties, children?: TsxElement[]) => TsxComplexElement | Promise<TsxComplexElement>);