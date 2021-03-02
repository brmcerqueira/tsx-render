/// <reference path="../jsx.d.ts" />
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import React, { TsxComplexElement, TsxComponent, TsxElement, TsxProperties } from "../mod.ts";

class TestComponent extends TsxComponent {
    constructor(properties: TsxProperties, children: TsxElement[], bag: TsxProperties) {
        super(properties, children)    
    }

    public async render(): Promise<TsxComplexElement> {
        return <h2>TestComponent! {this.properties.plus && <h1>{this.properties.plus}</h1>}
        {this.children}{this.bag.index}
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
        <TestComponent plus="plus one!">
            <TestView plus="plus two!"><h1>Hello!</h1></TestView>
            <h1>Primitive</h1>
        </TestComponent>
    </h1>).render();
    assertEquals(value, "<h1><h2>TestComponent!s <h1>plus one!</h1><h2>TestView! <h1>plus two!</h1></h2><h1>plus two!</h1><div><h1>Hello!</h1></div><h1>Primitive</h1></h2></h1>");
});