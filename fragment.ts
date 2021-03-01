import { NodePropsType,ChildType,NullableChildType } from "./types.ts";

export const Fragment = (
    props: NodePropsType,
    children: ChildType,
): NullableChildType => {
    return children;
};