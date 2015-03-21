"use strict";
var fs = require('fs');
var path = require('path');
var walk = require('walk');
var UPYUN = require('upyun');
var mime = require('mime');

var config = require(path.resolve(process.cwd(), './config.js'));
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
