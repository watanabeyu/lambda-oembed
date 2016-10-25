/* Imports */
var request = require('request');

exports.handler = function(event,context,callback){
  var url = event.url;
  var oEmbed = null;

  /* youtube */
  if(url.match(/youtube|youtu\.be/i)){
    oEmbed = `https://www.youtube.com/oembed?url=${url}&format=json`;
  }

  /* soundcloud */
  if(url.match(/soundcloud/i)){
    oEmbed = `https://soundcloud.com/oembed?url=${url}&format=json`;
  }

  /* mixcloud */
  if(url.match(/mixcloud/i)){
    oEmbed = `https://www.mixcloud.com/oembed/?url=${url}&format=json`;
  }

  /* vimeo */
  if(url.match(/vimeo/i)){
    oEmbed = `https://vimeo.com/api/oembed.json?url=${url}&format=json`;
  }

  /* slideshare */
  if(url.match(/slideshare/i)){
    oEmbed = `https://www.slideshare.net/api/oembed/2?url=${url}&format=json`;
  }

  /* twitter */
  if(url.match(/twitter/i)){
    oEmbed = `https://publish.twitter.com/oembed?url=${url}&format=json`;
  }

  /* instagram */
  if(url.match(/instagram|instagr\.am/i)){
    url = url.replace(/^(.+)\?.+$/,"$1");
    oEmbed = `https://api.instagram.com/oembed?url=${url}&format=json`;
  }

  request(oEmbed,function(error,response,body){
    if(!error && response.statusCode == 200){
      context.succeed(JSON.parse(body));
    }
    else{
      var exception = new Error(body);
      callback(exception);
    }
  });
}