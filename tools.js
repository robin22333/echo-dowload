'use strict'

/**
 *@description 工具
 *@version 1.0.0
 *@author luob
 *@lastUpdate 2016-01-07
 */

var superagent = require('superagent')
  , cheerio = require('cheerio')
  , eventproxy = require('eventproxy')
  , fs = require('fs')
  , path = require('path')
  , url = require('url')
  , config = require('./config');

var baseUrl = config.url;

// load echo sound detail
exports.loadDetail = function (soundUrl, res) {
  var soundId = soundUrl.substring(soundUrl.lastIndexOf('/') + 1);
  var getUrl = baseUrl + 'sound/detail?ids=%5B' + soundId + '%5D&wp';
  console.log(getUrl);
  superagent.get(getUrl)
    .end(function(err, xres) {
      if (err) {
        return console.log(err);
      }
      var obj = JSON.parse(xres.text);
      if (obj.message === 'success' && obj.result.length !== 0) {
        var mes = {
          name: obj.result[soundId].name,
          info: obj.result[soundId].info,
          pic: obj.result[soundId].pic,
          source: obj.result[soundId].source
        }
        res.send({'data': mes, 'flag': true, 'error': ''});
      } else {
        res.send({'data':'', 'flag': false, 'error': 'error url'});
      }
    });
}

exports.downloadImage = function (imgUrl, callback) {
  var imgName = imgUrl.substring(imgUrl.lastIndexOf('/'));
  if (imgUrl.indexOf('.jpg') == -1) {
      imgName += '.jpg';
  }
  console.log(imgName);
  var stream = fs.createWriteStream('public/images' + imgName);
  var req = superagent.get(imgUrl);
  req.pipe(stream);
  callback(imgName);
}
