import { TsxBaseElement } from "./elements/tsxBaseElement.ts";
import { TsxFragmentElement } from "./elements/tsxFragmentElement.ts";
import { TsxComplexElement } from "./elements/tsxComplexElement.ts";
import { TsxPrimitiveElement } from "./elements/tsxPrimitiveElement.ts";
import { TsxProperties, TsxComplex, TsxElement, TsxConstructor } from "./types.ts";

export const Fragment = (properties: TsxProperties, ...children: TsxElement[]): TsxBaseElement => {
    return new TsxFragmentElement(properties, children);
};

export const React = {
    Fragment,
    createElement<T extends TsxProperties = TsxProperties>(template: string | TsxComplex | TsxConstructor, properties: T | null, ...children: TsxElement[]): TsxBaseElement {
        const props = properties || {};

        if (typeof template === "string") {
            return new TsxPrimitiveElement(template, props, children);
        }
        else if (typeof template === "function") {
            return new TsxComplexElement(template, props, children);
        }
    
        throw new TypeError("Expected tsx template to be a string, function or a component");
    }
};