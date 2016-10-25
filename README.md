# lambda-oembed
For AWS lambda function.  
Get youtube,soundcloud,mixcloud,vimeo,slideshare,twitter,instagram oembed.  

## download
```bash
$ git clone https://github.com/watanabeyu/lambda-oembed.git
$ cd lambda-oembed
$ npm install request
```
[request](https://github.com/request/request) is simple HTTP client

## create API
1. create lambda function by upload zip
2. create apigateway
3. setting apigateway pass parameters ([refrence url](http://stackoverflow.com/questions/31329958/how-to-pass-a-querystring-or-route-parameter-to-aws-lambda-from-amazon-api-gatew))
4. setting apigateway cors ([reference url](http://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html))

## usage
If you use [superagent](https://github.com/visionmedia/superagent)
```javascript
var url = "https://www.youtube.com/watch?v=**********";

request
.get(`https://aws-apigateway-url/stage/function-name?url=${url}`)
.end((err,res) => {
  if(res.body.errorMessage){
    console.log('error');
  }
  else{
    console.log(res.body);
  }
})
```

If you use [jQuery](https://github.com/jquery/jquery)
```javascript
var url = "https://www.youtube.com/watch?v=**********";

$.ajax({
  url:`https://aws-apigateway-url/stage/function-name?url=${url}`,
  type:'get',
  dataType:'json',
  success:function(res){
    if(res.body.errorMessage){
      console.log('error');
    }
    else{
      console.log(res.body);
    }
  }
});
```
