import { TsxElement } from "./tsxElement.ts";

export type TsxProperties = {
    [key: string]: any;
};

export type TsxFunction = (properties: TsxProperties, children?: TsxElement[]) => TsxElement | Promise<TsxElement>