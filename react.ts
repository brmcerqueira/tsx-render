import { TsxComplexElement } from "./elements/tsxComplexElement.ts";
import { TsxFragmentElement } from "./elements/tsxFragmentElement.ts";
import { TsxFunctionElement } from "./elements/tsxFunctionElement.ts";
import { TsxPrimitiveElement } from "./elements/tsxPrimitiveElement.ts";
import { TsxProperties, TsxFunction, TsxElement } from "./types.ts";

export const Fragment = (properties: TsxProperties, ...children: TsxElement[]): TsxComplexElement => {
    return new TsxFragmentElement(properties, children);
};

export const React = {
    Fragment,
    createElement<T extends TsxProperties>(template: string | TsxFunction, properties: T | null, ...children: TsxElement[]): TsxComplexElement {
        const props = properties || {};

        if (typeof template === "string") {
            return new TsxPrimitiveElement(template, props, children);
        }
        else if (typeof template === "function") {
            return new TsxFunctionElement(template, props, children);
        }
    
        throw new TypeError(`Expected tsx template to be a string or a function`);
    }
};