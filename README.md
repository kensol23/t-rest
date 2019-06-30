<a name="module_t-rest"></a>

## t-rest
T-Rest Module

**Example**  
```js
var {request,get,post,put,patch,delete,head,options,expect,jar} = require("t-rest");
```

* [t-rest](#module_t-rest)
    * [.request(method, uri, [options])](#module_t-rest.request) ⇒ <code>Promise</code>
    * [.jar()](#module_t-rest.jar)
    * [.get(uri, [options])](#module_t-rest.get) ⇒ <code>Promise</code>
    * [.head(uri, [options])](#module_t-rest.head) ⇒ <code>Promise</code>
    * [.options(uri, [options])](#module_t-rest.options) ⇒ <code>Promise</code>
    * [.post(uri, payload, [options])](#module_t-rest.post) ⇒ <code>Promise</code>
    * [.patch(uri, [payload], [options])](#module_t-rest.patch) ⇒ <code>Promise</code>
    * [.put(uri, payload, [options])](#module_t-rest.put) ⇒ <code>Promise</code>
    * [.delete(uri, [payload], [options])](#module_t-rest.delete) ⇒ <code>Promise</code>
    * [.setDefaultRequest([options])](#module_t-rest.setDefaultRequest)
    * [.clearDefaultRequest()](#module_t-rest.clearDefaultRequest)

<a name="module_t-rest.request"></a>

### t-rest.request(method, uri, [options]) ⇒ <code>Promise</code>
Perform HTTP request

**Kind**: static method of [<code>t-rest</code>](#module_t-rest)  
**Returns**: <code>Promise</code> - - Promise which will resolve to a [T-RestResponse](T-RestResponse) object  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | the HTTP method/verb to use (GET, POST, PUT, DELTE, etc...) |
| uri | <code>string</code> | fully qualified uri |
| [options] | <code>Object</code> | additional request options, 'method' and 'uri' will override function args if specified within this object , see [request-promise library](https://www.npmjs.com/package/request-promise#cheat-sheet) for options |

**Example**  
```js
it("should support method and uri", async function () {
        var response = await request("GET", "http://httpbin.org/get?test=str");
        ...
    });
```
<a name="module_t-rest.jar"></a>

### t-rest.jar()
Returns global cookie jar

**Kind**: static method of [<code>t-rest</code>](#module_t-rest)  
**Example**  
```js
it("should use default cookies jar with {jar:http.jar()}", async function () {
        let response  = await get("http://httpbin.org/get", {jar:http.jar()});
        ...
    });
```
<a name="module_t-rest.get"></a>

### t-rest.get(uri, [options]) ⇒ <code>Promise</code>
Perform HTTP GET request

**Kind**: static method of [<code>t-rest</code>](#module_t-rest)  
**Returns**: <code>Promise</code> - - Promise which will resolve to a [ChakramResponse](ChakramResponse) object  

| Param | Type | Description |
| --- | --- | --- |
| uri | <code>string</code> | fully qualified uri |
| [options] | <code>Object</code> | additional request options, see  [request library](https://github.com/request/request#requestoptions-callback) for options |

**Example**  
```js
it("should allow GET requests", async function () {
        let obj = await get("http://httpbin.org/get?test=str");
        ...
    });
```
<a name="module_t-rest.head"></a>

### t-rest.head(uri, [options]) ⇒ <code>Promise</code>
Perform HTTP HEAD request

**Kind**: static method of [<code>t-rest</code>](#module_t-rest)  
**Returns**: <code>Promise</code> - - Promise which will resolve to a [ChakramResponse](ChakramResponse) object  

| Param | Type | Description |
| --- | --- | --- |
| uri | <code>string</code> | fully qualified uri |
| [options] | <code>Object</code> | additional request options, see  [request library](https://github.com/request/request#requestoptions-callback) for options |

**Example**  
```js
it("should allow HEAD requests", async function () {
        var response = await head("http://httpbin.org/get?test=str");
        ...
    });
```
<a name="module_t-rest.options"></a>

### t-rest.options(uri, [options]) ⇒ <code>Promise</code>
Perform HTTP OPTIONS request

**Kind**: static method of [<code>t-rest</code>](#module_t-rest)  
**Returns**: <code>Promise</code> - - Promise which will resolve to a [ChakramResponse](ChakramResponse) object  

| Param | Type | Description |
| --- | --- | --- |
| uri | <code>string</code> | fully qualified uri |
| [options] | <code>Object</code> | additional request options, see [request library](https://github.com/request/request#requestoptions-callback) for options |

**Example**  
```js
it("should allow OPTIONS requests", async function () {
        var headers = await options("http://httpbin.org/get?test=str").headers;
        ...
    });
```
<a name="module_t-rest.post"></a>

### t-rest.post(uri, payload, [options]) ⇒ <code>Promise</code>
Perform HTTP POST request

**Kind**: static method of [<code>t-rest</code>](#module_t-rest)  
**Returns**: <code>Promise</code> - - Promise which will resolve to a [ChakramResponse](ChakramResponse) object  

| Param | Type | Description |
| --- | --- | --- |
| uri | <code>string</code> | fully qualified uri |
| payload | <code>Object</code> | a JSON serializable object (unless json is set to false in params, in which case this should be a buffer or string) |
| [options] | <code>Object</code> | additional request options, see [request library](https://github.com/request/request#requestoptions-callback) for options |

**Example**  
```js
it("should support POST requests", async function () {
        var response = await post(testUrl, {"num": 2,"str": "test"});
        ...
    });
```
<a name="module_t-rest.patch"></a>

### t-rest.patch(uri, [payload], [options]) ⇒ <code>Promise</code>
Perform HTTP PATCH request

**Kind**: static method of [<code>t-rest</code>](#module_t-rest)  
**Returns**: <code>Promise</code> - - Promise which will resolve to a [ChakramResponse](ChakramResponse) object  

| Param | Type | Description |
| --- | --- | --- |
| uri | <code>string</code> | fully qualified uri |
| [payload] | <code>Object</code> | a JSON serializable object (unless json is set to false in params, in which case this should be a buffer or string) |
| [options] | <code>Object</code> | additional request options, see [request library](https://github.com/request/request#requestoptions-callback) for options |

**Example**  
```js
it("should support PATCH requests", async function () {
        var response = await patch(testUrl, {"num": 2,"str": "test"});
        ...
    });
```
<a name="module_t-rest.put"></a>

### t-rest.put(uri, payload, [options]) ⇒ <code>Promise</code>
Perform HTTP PUT request

**Kind**: static method of [<code>t-rest</code>](#module_t-rest)  
**Returns**: <code>Promise</code> - - Promise which will resolve to a [ChakramResponse](ChakramResponse) object  

| Param | Type | Description |
| --- | --- | --- |
| uri | <code>string</code> | fully qualified uri |
| payload | <code>Object</code> | a JSON serializable object (unless json is set to false in params, in which case this should be a buffer or string) |
| [options] | <code>Object</code> | additional request options, see [request library](https://github.com/request/request#requestoptions-callback) for options |

**Example**  
```js
it("should support PUT requests", async function () {
        var response = await put(testUrl, {"num": 2,"str": "test"});
        ...
    });
```
<a name="module_t-rest.delete"></a>

### t-rest.delete(uri, [payload], [options]) ⇒ <code>Promise</code>
Perform HTTP DELETE request

**Kind**: static method of [<code>t-rest</code>](#module_t-rest)  
**Returns**: <code>Promise</code> - - Promise which will resolve to a [ChakramResponse](ChakramResponse) object  

| Param | Type | Description |
| --- | --- | --- |
| uri | <code>string</code> | fully qualified uri |
| [payload] | <code>Object</code> | a JSON serializable object (unless json is set to false in params, in which case this should be a buffer or string) |
| [options] | <code>Object</code> | additional request options, see [request library](https://github.com/request/request#requestoptions-callback) for options |

**Example**  
```js
it("should support DELETE requests", async function () {
        var response = await delete(testUrl);
        ...
    });
```
<a name="module_t-rest.setDefaultRequest"></a>

### t-rest.setDefaultRequest([options])
Sets the default request options applied to all future requests.

**Kind**: static method of [<code>t-rest</code>](#module_t-rest)  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | default request options, see [request-promise library](https://www.npmjs.com/package/request-promise#cheat-sheet) for options |

**Example**  
```js
...
    describe("default request", function () {
    before(function () {
        http.setDefaultRequest({
            headers: {
                Testing: 'default-option'
            }
        });
    });
    it("should allow default request settings to be applied to multiple requests", async function () {
        let firstResp  = await get("http://httpbin.org/get");
        ...
    });
```
<a name="module_t-rest.clearDefaultRequest"></a>

### t-rest.clearDefaultRequest()
Clear default request options and cookies

**Kind**: static method of [<code>t-rest</code>](#module_t-rest)  
**Example**  
```js
it("should allow clearing default settings", async function () {
        http.clearDefaultRequest();
        let resp = await get("http://httpbin.org/get");
        expect(resp.body.headers.Testing).to.be.undefined;
    });
```
