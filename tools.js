'use strict'

/**
 *@description 工具
 *@version 1.0.0
 *@author luob
 *@lastUpdate 2015-11-21
 */

var superagent = require('superagent')
  , cheerio = require('cheerio')
  , eventproxy = require('eventproxy')
  , fs = require('fs')
  , path = require('path')
  , url = require('url')
  , config = require('./config');

var baseUrl = config.url;

function loadImg(soundUrl, res) {
  var soundId = soundUrl.substring(soundUrl.lastIndexOf('/') + 1);
  var getUrl = baseUrl + 'sound/detail?ids=%5B' + soundId + '%5D&wp';
  console.log(getUrl);
  superagent.get(getUrl)
    .end(function(err, xres) {
      if (err) {
        return console.log(err);
      }
      var obj = JSON.parse(xres.text);
      if (obj.message === 'success') {
        var mes = {
          name: obj.result[soundId].name,
          info: obj.result[soundId].info,
          pic: obj.result[soundId].pic,
          source: obj.result[soundId].source
        }
        downloadImage(mes.pic, function(imgName) {
          res.redirect('images/' + imgName);
        });
      } else {
        res.send('err url');
      }
    });
}

function downloadImage(imgUrl, callback) {
  console.log(imgUrl);
  var imgName = imgUrl.substring(imgUrl.lastIndexOf('/')) + '.jpg';
  var stream = fs.createWriteStream('public/images' + imgName);
  var req = superagent.get(imgUrl);
  req.pipe(stream);
  callback(imgName);
}

exports.loadImg = loadImg;
