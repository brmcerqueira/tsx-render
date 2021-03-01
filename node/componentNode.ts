import { ComponentFunctionType,NodePropsType,NullableChildType } from "../types.ts";
import { FragmentNode } from "./fragmentNode.ts";
import { Node } from "./node.ts";
import { normalizeChildren } from "./normalizeChildren.ts";

export class ComponentNode extends Node {
    constructor(
        public component: ComponentFunctionType,
        public props: NodePropsType,
        public children: NullableChildType[],
    ) {
        super();
    }

    public async render(): Promise<string> {
        const child = await this.component(this.props, this.children);

        const children = normalizeChildren(
            Array.isArray(child) ? child : [child],
        );

        return children.length > 1 
        ? await new FragmentNode(children).render() 
        : await children[0].render();
    }
}
