import { TsxBaseElement } from "./elements/tsxBaseElement.ts";
import { TsxComponent } from "./tsxComponent.ts";

export type TsxSetup = {
    context?: any,
    primitivePropertyTreat?: (name: string, key: string, value: any, properties: TsxProperties, 
        property: (key: string, value: any) => void, setup?: TsxSetup) => boolean | Promise<boolean>
    wrapper?: (render: () => TsxBaseElement | Promise<TsxBaseElement>, setup?: TsxSetup, component?: TsxComponent, properties?: TsxProperties) => TsxBaseElement | Promise<TsxBaseElement>
} | undefined;

export type TsxElement = TsxBaseElement | TsxBaseElement[] | string | number;

export type TsxProperties = {
    [key: string]: any;
};

export type TsxConstructor = {
    new(): TsxComponent;
};

export type TsxComplex = TsxConstructor | ((properties?: TsxProperties, children?: TsxElement[], context?: any) => TsxBaseElement | Promise<TsxBaseElement>);