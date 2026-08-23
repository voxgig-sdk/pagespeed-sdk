# Pagespeed TypeScript SDK Reference

Complete API reference for the Pagespeed TypeScript SDK.


## PagespeedSDK

### Constructor

```ts
new PagespeedSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `PagespeedSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = PagespeedSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `PagespeedSDK` instance in test mode.


### Instance Methods

#### `RunPagespeed(data?: object)`

Create a new `RunPagespeed` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RunPagespeedEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `PagespeedSDK.test()`.

**Returns:** `PagespeedSDK` instance in test mode.


---

## RunPagespeedEntity

```ts
const run_pagespeed = client.RunPagespeed()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `analysisUTCTimestamp` | `string` | No | The UTC timestamp of this analysis |
| `captchaResult` | `string` | No | The captcha verify result |
| `id` | `string` | No | Canonicalized and final URL for the document, after following page redirects (if any) |
| `kind` | `string` | No | Kind of result |
| `lighthouseResult` | `Record<string, any>` | No | The Lighthouse result object |
| `loadingExperience` | `Record<string, any>` | No | The CrUX loading experience object that contains CrUX data breakdowns |
| `originLoadingExperience` | `Record<string, any>` | No | The CrUX loading experience object that contains CrUX data breakdowns |
| `version` | `Record<string, any>` | No | The Pagespeed Version object |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.RunPagespeed().load({ id: 'run_pagespeed_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RunPagespeedEntity` instance with the same client and
options.

#### `client()`

Return the parent `PagespeedSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new PagespeedSDK({
  feature: {
    test: { active: true },
  }
})
```

