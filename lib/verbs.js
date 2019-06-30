var rp      = require('request-promise');
var extend  = require('extend-object');

var exports = module.exports = {};

var default_request;
var user_jar;
var user_default_options;
var global_jar = rp.jar();

var getOptions = (options, method, uri) => {

    let request_options = extend(
        { uri:uri, method:method, resolveWithFullResponse:true, simple:false, json:true }, 
        options || {}, 
        user_default_options || {})
    ;

    // request_optiones.jar takes either a true or a Jar object.
    // if {jar:true} global_jar a reference will be assigned to the request
    request_options.jar = request_options.jar || global_jar;
    if      (request_options.jar === true)      { request_options.jar = global_jar; } 
    //else if (request_options.jar === undefined) { request_options.jar = rp.jar(); }

    return request_options;
};

var extendOptionsWithPayload = (payload, options) => {
    return extend({body:payload},options);
};

/**
Perform HTTP request
@param   {string} method    - the HTTP method/verb to use (GET, POST, PUT, DELTE, etc...)
@param   {string} uri       - fully qualified uri
@param   {Object} [options] - additional request options, 'method' and 'uri' will override function args if specified within this object , see {@link https://www.npmjs.com/package/request-promise#cheat-sheet request-promise library} for options
@returns {Promise}          - Promise which will resolve to a {@link T-RestResponse} object
@alias module:t-rest.request
@example
    it("should support method and uri", async function () {
        var response = await request("GET", "http://httpbin.org/get?test=str");
        ...
    });
 */
exports.request = (method, uri, options) => {
    let req = default_request || rp;
    if(method && uri) return req(getOptions(options, method, uri));
    return req();
};
/**
Returns global cookie jar
@alias module:t-rest.jar
@example
    it("should use default cookies jar with {jar:http.jar()}", async function () {
        let response  = await get("http://httpbin.org/get", {jar:http.jar()});
        ...
    });
 */
exports.jar = () => global_jar;
/**
Perform HTTP GET request
@param   {string} uri       - fully qualified uri
@param   {Object} [options] - additional request options, see  {@link https://github.com/request/request#requestoptions-callback request library} for options
@returns {Promise}          - Promise which will resolve to a {@link ChakramResponse} object
@alias module:t-rest.get
@example
    it("should allow GET requests", async function () {
        let obj = await get("http://httpbin.org/get?test=str");
        ...
    });
 */
exports.get = (uri,options) => rp.get(uri,getOptions(options));

/**
Perform HTTP HEAD request
@param   {string} uri       - fully qualified uri
@param   {Object} [options] - additional request options, see  {@link https://github.com/request/request#requestoptions-callback request library} for options
@returns {Promise}          - Promise which will resolve to a {@link ChakramResponse} object
@alias module:t-rest.head
@example
    it("should allow HEAD requests", async function () {
        var response = await head("http://httpbin.org/get?test=str");
        ...
    });
 */
exports.head = (uri,options) => rp.head(uri,getOptions(options));

/**
Perform HTTP OPTIONS request
@param   {string} uri       - fully qualified uri
@param   {Object} [options] - additional request options, see {@link https://github.com/request/request#requestoptions-callback request library} for options
@returns {Promise}          - Promise which will resolve to a {@link ChakramResponse} object
@alias module:t-rest.options
@example
    it("should allow OPTIONS requests", async function () {
        var headers = await options("http://httpbin.org/get?test=str").headers;
        ...
    });
 */
exports.options = (uri,options) => rp.options(uri,getOptions(options));
/**
Perform HTTP POST request
@param   {string} uri       - fully qualified uri
@param   {Object} payload   - a JSON serializable object (unless json is set to false in params, in which case this should be a buffer or string)
@param   {Object} [options] - additional request options, see {@link https://github.com/request/request#requestoptions-callback request library} for options
@returns {Promise}          - Promise which will resolve to a {@link ChakramResponse} object
@alias module:t-rest.post
@example
    it("should support POST requests", async function () {
        var response = await post(testUrl, {"num": 2,"str": "test"});
        ...
    });
 */
exports.post = (uri, payload, options) => {
    return rp.post(uri,extendOptionsWithPayload(payload, getOptions(options)));
}
/**
Perform HTTP PATCH request
@param   {string} uri       - fully qualified uri
@param   {Object} [payload] - a JSON serializable object (unless json is set to false in params, in which case this should be a buffer or string)
@param   {Object} [options] - additional request options, see {@link https://github.com/request/request#requestoptions-callback request library} for options
@returns {Promise}          - Promise which will resolve to a {@link ChakramResponse} object
@alias module:t-rest.patch
@example
    it("should support PATCH requests", async function () {
        var response = await patch(testUrl, {"num": 2,"str": "test"});
        ...
    });
 */
exports.patch = (uri, payload, options) => rp.patch(uri, extendOptionsWithPayload(payload, getOptions(options)));
/**
Perform HTTP PUT request
@param   {string} uri       - fully qualified uri
@param   {Object} payload   - a JSON serializable object (unless json is set to false in params, in which case this should be a buffer or string)
@param   {Object} [options] - additional request options, see {@link https://github.com/request/request#requestoptions-callback request library} for options
@returns {Promise}          - Promise which will resolve to a {@link ChakramResponse} object
@alias module:t-rest.put
@example
    it("should support PUT requests", async function () {
        var response = await put(testUrl, {"num": 2,"str": "test"});
        ...
    });
 */
exports.put = (uri, payload, options) => rp.put(uri,extendOptionsWithPayload(payload, getOptions(options)));
/**
Perform HTTP DELETE request
@param   {string} uri       - fully qualified uri
@param   {Object} [payload] - a JSON serializable object (unless json is set to false in params, in which case this should be a buffer or string)
@param   {Object} [options] - additional request options, see {@link https://github.com/request/request#requestoptions-callback request library} for options
@returns {Promise}          - Promise which will resolve to a {@link ChakramResponse} object
@alias module:t-rest.delete
@example
    it("should support DELETE requests", async function () {
        var response = await delete(testUrl);
        ...
    });
 */
exports.delete = (uri, payload, options) => rp.delete(uri,extendOptionsWithPayload(payload, getOptions(options)));
/**
Sets the default request options applied to all future requests.
@param {Object} [options] - default request options, see {@link https://www.npmjs.com/package/request-promise#cheat-sheet request-promise library} for options
@alias module:t-rest.setDefaultRequest
@example
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
 */
exports.setDefaultRequest = (options) => {
    user_jar             = options.jar;
    default_request      = rp.defaults(getOptions(options));
    user_default_options = options;
}
/**
Clear default request options and cookies
@alias module:t-rest.clearDefaultRequest
@example
    it("should allow clearing default settings", async function () {
        http.clearDefaultRequest();
        let resp = await get("http://httpbin.org/get");
        expect(resp.body.headers.Testing).to.be.undefined;
    });
 */
exports.clearDefaultRequest = () => {
    user_jar             = undefined;
    default_request      = undefined;
    user_default_options = undefined;
}