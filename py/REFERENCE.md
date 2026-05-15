# Pagespeed Python SDK Reference

Complete API reference for the Pagespeed Python SDK.


## PagespeedSDK

### Constructor

```python
from pagespeed_sdk import PagespeedSDK

client = PagespeedSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `PagespeedSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = PagespeedSDK.test()
```


### Instance Methods

#### `RunPagespeed(data=None)`

Create a new `RunPagespeedEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> tuple`

Make a direct HTTP request to any API endpoint. Returns `(result, err)`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `(result_dict, err)`

#### `prepare(fetchargs=None) -> tuple`

Prepare a fetch definition without sending. Returns `(fetchdef, err)`.


---

## RunPagespeedEntity

```python
run_pagespeed = client.RunPagespeed()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `analysis_utc_timestamp` | ``$STRING`` | No |  |
| `captcha_result` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `kind` | ``$STRING`` | No |  |
| `lighthouse_result` | ``$OBJECT`` | No |  |
| `loading_experience` | ``$OBJECT`` | No |  |
| `origin_loading_experience` | ``$OBJECT`` | No |  |
| `version` | ``$OBJECT`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.RunPagespeed().load({"id": "run_pagespeed_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RunPagespeedEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = PagespeedSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

