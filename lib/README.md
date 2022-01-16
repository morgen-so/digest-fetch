[![Deno CI][ci-image]][ci-url]

# Deno [`/x/digest_fetch`][x-url]

An HTTP Digest Authentication client based on the `fetch()` API.
Also includes HTTP Basic Authentication support.

You can instantiate a `new DigestClient(...)` with auth configuration,
and then call its `.fetch()` API to perform automatically-authenticated requests.

## Port from Node.JS

This project is a fork of [the `digest-fetch` NPM package][original-project-url]
which is authored and maintained by [@devfans][original-author-url].

I (@danopia) added types to the codebase to result in a pure-Typescript module.
Otherwise these modules should produce effectively the same end result,
and the documentation and tests are largely reused from the original project.

Both this and the original project are under the MIT License.

## Get Started

```ts
import { DigestClient } from "https://deno.land/x/digest_fetch/mod.ts";
```

### HTTP Basic Authentication
Create a client using basic authentication challenge

```ts
const client = new DigestClient('user', 'password', { basic: true })
const response = await client.fetch(url, options);
const data = await response.json();
console.log(data);
```

### HTTP Digest Access Authentication

Create a digest authentication request client with default options

```ts
const client = new DigestClient('user', 'password')
```

Specify options for digest authentication

```ts
const client = new DigestClient('user', 'password', { algorithm: 'MD5' })
```

Options fields:

| field           | type         | default       |  description |
| :-------------  | :----------  | :-----------: | :----------  |
|  algorithm      | string       | 'MD5'         | algorithm to be used: 'MD5' or 'MD5-sess'  |
|  statusCode     | number       | 401           | custom alternate authentication failure code for avoiding browser prompt, see details below |
|  cnonceSize     | number       | 32            | length of the cnonce |
|  logger         | object       | none          | logger for debug, can use `console`, default no logging |
|  basic          | bool         | false         | switch to use basic authentication |
|  precomputeHash | bool         | false         | wether to attach hash of credentials to the client instance instead of raw credential |

Details:
 +  When using digest authentication in browsers, may encounter prompt window in foreground. Check: https://stackoverflow.com/questions/9859627/how-to-prevent-browser-to-invoke-basic-auth-popup-and-handle-401-error-using-jqu


Do request same way as `fetch()`

```ts
const url = ''
const options = {}
await client.fetch(url, options)
  .then(resp=>resp.json())
  .then(data=>console.log(data))
  .catch(e=>console.error(e))
```

Pass in refresh request options factory function for conditions options needs be refreshed when trying again.
For example when posting with file stream:

```ts
const factory = () => ({ method: 'post', body: fs.createReadStream('path-to-file') })
await client.fetch(url, {factory})
  .then(resp=>resp.json())
  .then(data=>console.log(data))
  .catch(e=>console.error(e))
```

## About

Digest authentication: https://en.wikipedia.org/wiki/Digest_access_authentication
This plugin is implemented following RFC2069 and RFC2617, supports http basic authentication as well!


Please open issues if you find bugs or meet problems during using this plugin.
Feel free to open PRs whenever you have better ideas on this project!


[ci-image]: https://github.com/cloudydeno/deno-digest_fetch/workflows/CI/badge.svg?branch=main
[ci-url]: https://github.com/cloudydeno/deno-digest_fetch/actions/workflows/deno-ci.yaml
[x-url]: https://deno.land/x/digest_fetch
[original-project-url]: https://github.com/devfans/digest-fetch
[original-author-url]: https://github.com/devfans/digest-fetch
