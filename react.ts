import { ComponentNode } from "./node/componentNode.ts";
import { ElementNode } from "./node/elementNode.ts";
import { Fragment } from "./fragment.ts";
import { NodePropsType,ComponentFunctionType,NullableChildType } from "./types.ts";

export const React = {
    Fragment,
    createElement<P extends NodePropsType = NodePropsType>(
        element: string | ComponentFunctionType,
        props: P | null,
        ...children: NullableChildType[]
    ) {
        const nodeProps = props || {};

        if (typeof element === "string") {
            return new ElementNode(element, nodeProps, children);
        }
        if (typeof element === "function") {
            return new ComponentNode(element, nodeProps, children);
        }
    
        throw new TypeError(`Expected jsx element to be a string or a function`);
    },
};