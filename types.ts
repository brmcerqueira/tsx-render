import { TsxComplexElement } from "./elements/tsxComplexElement.ts";
import { TsxComponent } from "./tsxComponent.ts";

export type TsxElement = TsxComplexElement | TsxComplexElement[] | string | number;

export type TsxProperties = {
    [key: string]: any;
};

export type TsxConstructor = {
    new(properties: TsxProperties, children?: TsxElement[], bag?: TsxProperties): TsxComponent;
};

export type TsxFunction = TsxConstructor | ((properties: TsxProperties, children?: TsxElement[], bag?: TsxProperties) => TsxComplexElement | Promise<TsxComplexElement>);