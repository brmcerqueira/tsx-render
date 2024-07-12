import { assertEquals } from "https://deno.land/std@0.212.0/assert/mod.ts";
import React, { TsxBaseElement, TsxComponent, TsxElement, TsxProperties } from "../mod.ts";

type TestProperties = { plus?: string }
type TestContext = { data: string }

class TestComponent extends TsxComponent<TestProperties, TestContext> {
    public async define(): Promise<TsxBaseElement> {
        return <h2>TestComponent! {this.properties.plus && <h1>{this.properties.plus}</h1>}
        {this.children}
        </h2>
    }
}

const TestView = (properties: TestProperties, children: TsxElement[], context: TestContext) => 
<>
<h2>TestView! {properties.plus && <h1>{properties.plus}</h1>}</h2>
{context && <h1>Context: {context.data}</h1>}
<div>{children}</div>
</>

Deno.test("react", async () => {
    const view: TsxBaseElement = <h1>
            <TestComponent plus="1">
                <TestView><h1 $ignore>Hello!</h1></TestView>
                <h1>1</h1>
            </TestComponent>
        </h1>;

    const value = await view.render({ 
        context: { data: "test" },
        primitivePropertyTreat: (name: string, key: string, value: any, properties: TsxProperties, 
            property: (key: string, value: any) => void, context?: any): boolean | Promise<boolean> => {
            if (key.startsWith("$")) {
                console.log(name, key, value, properties, context);
                property("id", 10);
                return true;
            }

            return false;
        },
        wrapper: (element: TsxElement, component?: TsxComponent, properties?: TsxProperties, context?: any): TsxBaseElement | Promise<TsxBaseElement> => {
            return <div>wrapper: {element}</div>
        }
    });

    assertEquals(value, '<h1><div>wrapper: <h2>TestComponent! <h1>1</h1><div>wrapper: <div>wrapper: <h2>TestView! </h2><h1>Context: test</h1><div><h1 id="10">Hello!</h1></div></div></div><h1>1</h1></h2></div></h1>');
});