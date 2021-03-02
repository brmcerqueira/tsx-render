/// <reference path="../jsx.d.ts" />
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import React, { TsxComplexElement, TsxComponent, TsxElement, TsxProperties } from "../mod.ts";

class TestComponent extends TsxComponent {
    constructor(properties: TsxProperties, children: TsxElement[], bag: TsxProperties) {
        super(properties, children, bag)    
    }

    public async render(): Promise<TsxComplexElement> {
        return <h2>TestComponent! {this.properties.plus && <h1>{this.properties.plus}</h1>}
        {this.children}{this.bag?.test}
        </h2>
    }
}

const TestView = (properties: TsxProperties, children: TsxElement[]) => 
<>
<h2>TestView! {properties.plus && <h1>{properties.plus}</h1>}</h2>
{properties.plus && <h1>{properties.plus}</h1>}
<div>{children}</div>
</>

const TestH1 = (properties: TsxProperties, children: TsxElement[], bag: TsxProperties) => <h1><h2>{bag.test}</h2>{children}</h1>

Deno.test("react", async () => {
    const view = (
        <TestH1>
            <h1 aew="aew">
                <TestComponent plus="plus one!">
                    <TestView plus="plus two!"><h1>Hello!</h1></TestView>
                    <h1>Primitive</h1>
                </TestComponent>
            </h1>
        </TestH1>
    );
    view.bag.test = "bag - test";
    const value = await view.render();
    assertEquals(value, "<h1><h2>bag - test</h2><h1 aew=\"aew\"><h2>TestComponent! <h1>plus one!</h1><h2>TestView! <h1>plus two!</h1></h2><h1>plus two!</h1><div><h1>Hello!</h1></div><h1>Primitive</h1>bag - test</h2></h1></h1>");
});