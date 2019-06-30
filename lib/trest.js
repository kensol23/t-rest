/**
T-Rest Module
@module t-rest
@example
var {request,get,post,put,patch,delete,head,options,expect,jar} = require("t-rest");
 */
var exports = module.exports = {};

var 
    extend  = require('extend-object'),
    verbs   = require('./verbs.js'),
    //plugins = require('./plugins.js'),
    //debug   = require('./debug.js'),
    tv4     = require('tv4')
;

/**
HTTP Module
@module http
@example
var {request,get,post,put,patch,delete,head,options,expect,jar} = require("t-rest").http;
 */
exports.http = verbs;

extend(exports, verbs/*, plugins, debug*/);