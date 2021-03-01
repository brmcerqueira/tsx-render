/// <reference path="../jsx.d.ts" />
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import React, { TsxElement, TsxProperties } from "../mod.ts";

const TestView = (properties: TsxProperties, children: TsxElement[]) => 
<>
<h2>TestView! {properties.plus && <h1>{properties.plus}</h1>}</h2>
{properties.plus && <h1>{properties.plus}</h1>}
<div>{children}</div>
</>

Deno.test("react", async () => {
    const value = await (
    <h1>
        <TestView plus="1">
            <TestView><h1>Hello!</h1></TestView>
            <h1>1</h1>
        </TestView>
    </h1>).render();
    assertEquals(value, "<h1><h2>TestView! <h1>1</h1></h2><h1>1</h1><div><h2>TestView! </h2><div><h1>Hello!</h1></div><h1>1</h1></div></h1>");
});