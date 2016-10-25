/* Imports */
var request = require('request');

var oEmbed = null;
var json = null;
var html = null;
var thumbnail = null;

exports.handler = function(event,context,callback){
  var url = event.url;

  /* youtube */
  if(url.match(/youtube|youtu\.be/i)){
    oEmbed = `https://www.youtube.com/oembed?url=${url}&format=json`;
    html = "html";
    thumbnail = "thumbnail_url";
  }

  /* soundcloud */
  if(url.match(/soundcloud/i)){
    oEmbed = `https://soundcloud.com/oembed?url=${url}&format=json`;
    html = "html";
    thumbnail = "thumbnail_url";
  }

  /* mixcloud */
  if(url.match(/mixcloud/i)){
    oEmbed = `https://www.mixcloud.com/oembed/?url=${url}&format=json`;
    html = "embed";
    thumbnail = "image";
  }

  /* vimeo */
  if(url.match(/vimeo/i)){
    oEmbed = `https://vimeo.com/api/oembed.json?url=${url}&format=json`;
    html = "html";
    thumbnail = "thumbnail_url";
  }

  /* slideshare */
  if(url.match(/slideshare/i)){
    oEmbed = `https://www.slideshare.net/api/oembed/2?url=${url}&format=json`;
    html = "html";
    thumbnail = "thumbnail";
  }

  /* twitter */
  if(url.match(/twitter/i)){
    oEmbed = `https://publish.twitter.com/oembed?url=${url}&format=json`;
    html = "html";
    thumbnail = "thumbnail_url";
  }

  /* instagram */
  if(url.match(/instagram|instagr\.am/i)){
    url = url.replace(/^(.+)\?.+$/,"$1");
    oEmbed = `https://api.instagram.com/oembed?url=${url}&format=json`;
    html = "html";
    thumbnail = "thumbnail_url";
  }

  request(oEmbed,function(error,response,body){
    console.log(response.statusCode);
    if(!error && response.statusCode == 200){
      var result = JSON.parse(body);
      
      
      context.succeed(JSON.parse(body));
    }
    else{
      var error = new Error(body);
      callback(error);
    }
  });
}