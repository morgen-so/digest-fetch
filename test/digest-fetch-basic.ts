import { describe, it } from "https://raw.githubusercontent.com/cloudydeno/deno-jmespath/main/test/deno-shim.js";
import { assertEquals } from "https://deno.land/std@0.120.0/testing/asserts.ts";

import { DigestClient } from "../lib/mod.ts";

describe('digest-fetch', function() {

  it('Test Basic Authentication', async function() {
    var client = new DigestClient('test', 'test', { basic: true })

    const res = await fetch(`http://httpbin.org/basic-auth/test/test`, client.addBasicAuth());
    assertEquals(res.status, 200);
    res.body?.cancel();
  })

  it('Test Basic Authentication with wrong credential', async function() {
    var client = new DigestClient('test', 'test-null', { basic: true })

    const res = await fetch(`http://httpbin.org/basic-auth/test/test`, client.addBasicAuth());
    assertEquals(res.status, 401);
    res.body?.cancel();
  })
})
