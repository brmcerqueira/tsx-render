import { TsxBaseElement } from "./elements/tsxBaseElement.ts";
import { TsxComponent } from "./tsxComponent.ts";

export type TsxSetup<T = any> = {
    context?: T,
    primitivePropertyTreat?: (name: string, key: string, value: any, properties: TsxProperties, 
        property: (key: string, value: any) => void, setup: TsxSetup<T>) => boolean | Promise<boolean>
    wrapper?: (build: () => TsxBaseElement | Promise<TsxBaseElement>, setup: TsxSetup<T>, component?: TsxComponent, properties?: TsxProperties) => TsxBaseElement | Promise<TsxBaseElement>
}

export type TsxElement = TsxBaseElement | TsxBaseElement[] | string | number;

export type TsxProperties = {
    [key: string]: any;
};

export type TsxConstructor = {
    new(): TsxComponent;
};

export type TsxComplex = TsxConstructor | ((properties?: TsxProperties, children?: TsxElement[], context?: any) => TsxBaseElement | Promise<TsxBaseElement>);