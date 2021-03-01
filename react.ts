import { TsxElement } from "./tsxElement.ts";
import { TsxFragmentElement } from "./tsxFragmentElement.ts";
import { TsxFunctionElement } from "./tsxFunctionElement.ts";
import { TsxPrimitiveElement } from "./tsxPrimitiveElement.ts";
import { TsxProperties, TsxFunction } from "./types.ts";

export const Fragment = (properties: TsxProperties, ...children: TsxElement[]): TsxElement => {
    return new TsxFragmentElement(properties, children);
};

export const React = {
    Fragment,
    createElement<T extends TsxProperties>(template: string | TsxFunction, properties: T | null, ...children: TsxElement[]): TsxElement {
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