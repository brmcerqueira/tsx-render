import { TsxComponent } from "./tsxComponent.ts";

export type TsxElement = TsxComponent | TsxComponent[] | string | number;

export type TsxProperties = {
    [key: string]: any;
};

export type TsxFunction = (properties: TsxProperties, children?: TsxElement[]) => TsxComponent | Promise<TsxComponent>