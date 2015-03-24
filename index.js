"use strict";
var fs = require('fs');
var path = require('path');
var walk = require('walk');
var UPYUN = require('upyun');
var mime = require('mime');
var argv = require('minimist')(process.argv.slice(2));

var config = {};
if (typeof argv.config == 'string') {
  config = JSON.parse(fs.readFileSync(argv.config))
}

if (argv.localPath) {
  config.localPath = argv.localPath;
}

if (argv.baseDir) {
  config.baseDir = argv.baseDir;
}

if (argv.bucket) {
  config.bucket = argv.bucket;
}

if (argv.operator) {
  config.operator = argv.operator;
}

if (argv.password) {
  config.password = argv.password;
}

var walker = walk.walk(config.localPath);
var _now = new Date().getTime();
var upyun = new UPYUN(config.bucket, config.operator, config.password, 'ctcc', 'legacy');

walker.on("file", function (root, fileStats, next) {
  var filePath = path.resolve(root, fileStats.name);

  if (_now - new Date(fileStats.mtime).getTime() < 10 * 60 * 1000) {
    upyun.uploadFile(filePath.split(config.baseDir)[1], filePath, mime.lookup(filePath), true, function(err, res) {
      if (err) {
        console.error(filePath);
      };
      next();
    })
  } else {
    next();
  };
});

walker.on("errors", function (root, nodeStatsArray, next) {
  next();
});

walker.on("end", function () {
  console.log("all done");
});
