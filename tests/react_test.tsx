/// <reference path="../jsx.d.ts" />
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import React, { TsxComponent, TsxElement, TsxProperties } from "../mod.ts";

class TestComponent extends TsxComponent {
    constructor(protected properties: TsxProperties, protected children: TsxElement[]) {
        super(properties, children);     
    }

    public async render(): Promise<string> {
        return <h2>TestComponent! {this.properties.plus && <h1>{this.properties.plus}</h1>}
        {this.children}
        </h2>
    }
}

const TestView = (properties: TsxProperties, children: TsxElement[]) => 
<>
<h2>TestView! {properties.plus && <h1>{properties.plus}</h1>}</h2>
{properties.plus && <h1>{properties.plus}</h1>}
<div>{children}</div>
</>

Deno.test("react", async () => {
    const value = await (
    <h1>
        <TestComponent plus="1">
            <TestView><h1>Hello!</h1></TestView>
            <h1>1</h1>
        </TestComponent>
    </h1>).render();
    assertEquals(value, "<h1><h2>TestComponent! <h1>1</h1><h2>TestView! </h2><div><h1>Hello!</h1></div><h1>1</h1></h2></h1>");
});