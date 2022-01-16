import { describe, it } from "https://raw.githubusercontent.com/cloudydeno/deno-jmespath/main/test/deno-shim.js";
import { assertEquals } from "https://deno.land/std@0.120.0/testing/asserts.ts";

import { DigestClient } from "../lib/mod.ts";

describe('digest-fetch', function(){

  it('Test RFC2617', async function() {
    const client = new DigestClient('test', 'test');

    const res1 = await fetch(`http://httpbin.org/digest-auth/auth/test/test`);
    assertEquals(res1.status, 401);
    res1.body?.cancel();

    client.parseAuth(res1.headers.get('www-authenticate'));
    const {headers} = client.addAuth('/digest-auth/auth/test/test', { method: 'GET' });
    const res2 = await fetch(`http://httpbin.org/digest-auth/auth/test/test`, {headers});
    assertEquals(res2.status, 200);
    res2.body?.cancel();
  })

  it('Test RFC2617 with precomputed hash', async function() {
    const client = new DigestClient('test',
      DigestClient.computeHash('test', 'me@kennethreitz.com', 'test'),
      { precomputedHash: true });

    const res1 = await fetch(`http://httpbin.org/digest-auth/auth/test/test`);
    assertEquals(res1.status, 401);
    res1.body?.cancel();

    client.parseAuth(res1.headers.get('www-authenticate'));
    const {headers} = client.addAuth('/digest-auth/auth/test/test', { method: 'GET' });
    const res2 = await fetch(`http://httpbin.org/digest-auth/auth/test/test`, {headers});
    assertEquals(res2.status, 200);
    res2.body?.cancel();
  })

  it('Test RFC2617 with wrong credential', async function() {
    const client = new DigestClient('test', 'test-null');

    const res1 = await fetch(`http://httpbin.org/digest-auth/auth/test/test`);
    assertEquals(res1.status, 401);
    res1.body?.cancel();

    client.parseAuth(res1.headers.get('www-authenticate'));
    const {headers} = client.addAuth('/digest-auth/auth/test/test', { method: 'GET' });
    const res2 = await fetch(`http://httpbin.org/digest-auth/auth/test/test`, {headers});
    assertEquals(res2.status, 401);
    res2.body?.cancel();
  })
})
