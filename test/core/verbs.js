var testsRunningInNode = (typeof global !== "undefined" ? true : false),
    trest   = (testsRunningInNode ? global.trest : window.trest),
    expect = (testsRunningInNode ? global.expect : window.expect)
;
describe("Methods", function() {

    var testWriteMethods = function (testMethod, testUrl) {
        it("should support JSON requests", async function () {
            var json = {"num": 2,"str": "test"};
            var response = await testMethod(testUrl, json);

            expect(response.body).to.be.an('object');
            expect(response.body.json).to.deep.equal(json);
            expect(response.body.headers['Content-Type']).to.be.equal('application/json');
        });

        it("should support non-JSON requests", async function () {
            var stringPost = "testing with a string post";
            var response = await testMethod(testUrl, stringPost, {json:false});
            expect(response.body).to.be.a('string');
            expect(JSON.parse(response.body).data).to.be.equal(stringPost);
            expect(JSON.parse(response.body).headers['Content-Type']).not.to.be.equal('application/json');
        });

        it("should support sending custom headers", async function () {
            var customHeaders = {
                "Token": "dummy token value"
            };
            var response = await testMethod(testUrl, {}, {
                headers: customHeaders
            });
            return expect(response.request.headers).to.have.property('Token');
        });
    };

    describe("POST", function () {
        testWriteMethods(trest.post, "http://httpbin.org/post");

		testsRunningInNode && it("should allow posting files with multipart/form-data", async function () {
            var fs = require('fs');
			var response = await trest.post("http://httpbin.org/post", undefined, {
				formData: {
					pkgFile: fs.createReadStream('./package.json')
				}
            });
			expect(response.body).to.have.property('files');
		});
    });

    describe("PUT", function () {
        testWriteMethods(trest.put, "http://httpbin.org/put");
    });

    describe("DELETE", function () {
        testWriteMethods(trest.delete, "http://httpbin.org/delete");
    });

    describe("PATCH", function () {
        testWriteMethods(trest.patch, "http://httpbin.org/patch");
    });

    it("should allow GET requests", async function () {
        let obj = await trest.get("http://httpbin.org/get?test=str");
        expect(obj.body).to.be.an('object');
        expect(obj.body.args.test).to.equal('str');
    });

    it("should allow HEAD requests", async function () {
        var response = await trest.head("http://httpbin.org/get?test=str");
        expect(response.statusCode).to.equal(200);
        expect(response.headers).to.have.property('content-length');
        expect(response.body).to.be.undefined;
    });

    it("should allow OPTIONS requests", async function () {
        var headers = await trest.options("http://httpbin.org/get?test=str").headers;
        expect(headers).to.have.property('host');
        expect(headers).to.have.property('accept');
    });

    describe("REQUEST", function () {
        var json = {"num": 2,"str": "test"};

        it("should support method and uri", async function () {
            var response = await trest.request("GET", "http://httpbin.org/get?test=str");
            expect(response.body).to.be.an('object');
            expect(response.body.args.test).to.equal('str');
        });

        it("should support options", async function () {
            var response = await trest.request("POST", "http://httpbin.org/post", {body:json});
            expect(response.body).to.be.an('object');
            expect(response.body.json).to.deep.equal(json);
            expect(response.body.headers['Content-Type']).to.be.equal('application/json');
        });

        it("should support no arguments", async function () {
            trest.setDefaultRequest({
                uri: "http://httpbin.org/post",
                method: "POST",
                body: JSON.stringify(json)
            });
            var response = await trest.request();
            expect(response.body.json).to.be.an('string');
            expect(response.body.json).to.equal(JSON.stringify(json));
            expect(response.headers['content-type']).to.be.equal('application/json');
        });
    });

    describe("default request", function () {
        before(function () {
            trest.setDefaultRequest({
                headers: {
                    Testing: 'default-option'
                }
            });
        });

        it("should allow default request settings to be applied to multiple requests", async function () {
            let firstResp  = await trest.get("http://httpbin.org/get");
            let secondResp = await trest.get("http://httpbin.org/get");
            expect(firstResp.request.headers.Testing).to.equal('default-option');
            expect(secondResp.request.headers.Testing).to.equal('default-option');
        });

        it("should allow clearing default settings", async function () {
            trest.clearDefaultRequest();
            let resp = await trest.get("http://httpbin.org/get");
            expect(resp.body.headers.Testing).to.be.undefined;
        });
    });

    describe("cookies jar", function () {
        before(async function () {
            let response  = await trest.get("http://httpbin.org/cookies/set/foo/bar");
        });

        it("should use default cookies jar with default request", async function () {
            let response  = await trest.get("http://httpbin.org/get");
            expect(response.request.headers.cookie).to.equal('foo=bar');
        });

        it("should use default cookies jar with {jar:trest.jar()}", async function () {
            let response  = await trest.get("http://httpbin.org/get", {jar:trest.jar()});
            expect(response.request.headers.cookie).to.equal('foo=bar');
        });

        it("should use default cookies jar with {jar:true}", async function () {
            let response  = await trest.get("http://httpbin.org/get", {jar:true});
            expect(response.request.headers.cookie).to.equal('foo=bar');
        });
    });
});