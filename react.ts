import { TsxBaseElement } from "./elements/tsxBaseElement.ts";
import { TsxFragmentElement } from "./elements/tsxFragmentElement.ts";
import { TsxFunctionElement } from "./elements/tsxFunctionElement.ts";
import { TsxPrimitiveElement } from "./elements/tsxPrimitiveElement.ts";
import { TsxProperties, TsxFunction, TsxElement, TsxConstructor } from "./types.ts";

export const Fragment = (properties: TsxProperties, ...children: TsxElement[]): TsxBaseElement => {
    return new TsxFragmentElement(properties, children);
};

export const React = {
    Fragment,
    createElement<T extends TsxProperties = TsxProperties>(template: string | TsxFunction | TsxConstructor, properties: T | null, ...children: TsxElement[]): TsxBaseElement {
        const props = properties || {};

        if (typeof template === "string") {
            return new TsxPrimitiveElement(template, props, children);
        }
        else if (typeof template === "function") {
            return new TsxFunctionElement(template, props, children);
        }
    
        throw new TypeError("Expected tsx template to be a string, function or a component");
    }
};