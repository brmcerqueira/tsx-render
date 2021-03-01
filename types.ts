import { ComponentNode } from "./node/componentNode.ts";
import { ElementNode } from "./node/elementNode.ts";
import { TextNode } from "./node/textNode.ts";

export type NodePropsType = {
    [key: string]: any;
};

export type ChildNodeType =
    | ElementNode
    | TextNode
    | ComponentNode;

export type ChildType = ChildNodeType | string | boolean | number;    
export type NullableChildType = ChildType | null | void;

export type ComponentFunctionType = (props: NodePropsType, child?: NullableChildType[]) => NullableChildType | Promise<NullableChildType>;
