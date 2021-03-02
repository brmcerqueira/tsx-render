import { TsxComplexElement } from "./elements/tsxComplexElement.ts";
import { TsxComponent } from "./tsxComponent.ts";

export type TsxElement = TsxComplexElement | TsxComplexElement[] | string | number;

export type TsxProperties = {
    [key: string]: any;
};

export type TsxConstructor<T extends TsxProperties> = {
    new(properties: TsxProperties, children?: TsxElement[], bag?: T): TsxComponent<T>;
};

export type TsxFunction<T extends TsxProperties> = TsxConstructor<T> | ((properties: TsxProperties, children?: TsxElement[], bag?: T) => TsxComplexElement | Promise<TsxComplexElement>);