import { TsxBaseElement } from "./elements/tsxBaseElement.ts";
import { TsxComponent } from "./tsxComponent.ts";

export type TsxSetup = {
    context?: any,
    primitivePropertyTreat?: (name: string, key: string, value: any, properties: TsxProperties, context?: any) => boolean | Promise<boolean>
    wrapper?: (element: TsxElement, component?: TsxComponent, properties?: TsxProperties, context?: any) => TsxBaseElement | Promise<TsxBaseElement>
} | undefined;

export type TsxElement = TsxBaseElement | TsxBaseElement[] | string | number;

export type TsxProperties = {
    [key: string]: any;
};

export type TsxConstructor = {
    new(): TsxComponent;
};

export type TsxComplex = TsxConstructor | ((properties?: TsxProperties, children?: TsxElement[], context?: any) => TsxBaseElement | Promise<TsxBaseElement>);