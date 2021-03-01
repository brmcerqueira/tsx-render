import { TsxComplexElement } from "./elements/tsxComplexElement.ts";

export type TsxElement = TsxComplexElement | TsxComplexElement[] | string | number;

export type TsxProperties = {
    [key: string]: any;
};

export type TsxFunction = (properties: TsxProperties, children?: TsxElement[]) => TsxComplexElement | Promise<TsxComplexElement>