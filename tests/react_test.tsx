import { assertEquals } from "https://deno.land/std@0.212.0/assert/mod.ts";
import React, { TsxBaseElement, TsxComponent, TsxElement } from "../mod.ts";

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
                <TestView><h1>Hello!</h1></TestView>
                <h1>1</h1>
            </TestComponent>
        </h1>;

    const value = await view.render({ data: "test" });
    assertEquals(value, "<h1><h2>TestComponent! <h1>1</h1><h2>TestView! </h2><h1>Context: test</h1><div><h1>Hello!</h1></div><h1>1</h1></h2></h1>");
});