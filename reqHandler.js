var querystring = require("querystring"),fs = require("fs"),formidable = require("formidable");

function start(response,request,db) {
	if(request.session.user_id)
		{
			if(request.session.user_id.length>0)
			{
				response.writeHead(302, {'Location':"http://localhost:8888/home"});
				response.end();
			}
		}
	else 
		{

  console.log("Request handler 'start' was called.");

  fs.readFile("./login.html", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/html"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(file);
      response.end();
    }
  });
}
}
function upload(response,request,db) {
	if(!request.session.user_id ||request.session.user_id.length==0)
		{
			var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("You are not logged in!")'+
							'</script>'+
							'<body background="bg.jpg">'+
							'<script>'+
							'location.replace("http://localhost:8888/start");'+
							'</script>'+
							'</body>'+
							'</html>';						
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
		}
	else 
		{
			if(!request.session.valid)
			{
				var form='<!DOCTYPE html>'+
							'<html>'+
							'<script>'+
							'alert("You cannot post blank data!")'+
							'</script>'+
							'</html>';						
							response.writeHead(302, {'Location':"http://localhost:8888/home"});
							response.end();
			}
			else if(request.session.valid==1) {
			uname=request.session.user_id;
			console.log(uname);
			
			console.log("Request handler 'upload' was called.");
			var form = new formidable.IncomingForm();
 			console.log("about to parse");
  			form.parse(request, function(error, fields, files) {
    				console.log("parsing done");
				fs.rename(files.upload.path, "/tmp/"+uname+".jpg", function(err,file) {
      					if (err) {
        						fs.unlink("/tmp/"+uname+".jpg");
        						fs.rename(files.upload.path,"/tmp/"+uname+".jpg");
							fs.readFile("/tmp/"+uname+".jpg", "base64", function(error, file) {
								db.tweets1.update({email:uname},{$set:{image:file}},{multi:true});
							
							});
      						 }
					else {
						 fs.readFile("/tmp/"+uname+".jpg", "base64", function(error, file) {
							db.tweets1.update({email:uname},{$set:{image:file}},{multi:true});
						});
   				 	     }
				delete request.session.valid;
				response.writeHead(302, {'Location':"http://localhost:8888/home"});
				response.end();
				});
			});
			}
		}	
}
function upload_html(response,request,db) {
	if(!request.session.user_id ||request.session.user_id.length==0)
		{
			var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("You are not logged in!")'+
							'</script>'+
							'<body background="bg.jpg">'+
							'<script>'+
							'location.replace("http://localhost:8888/start");'+
							'</script>'+
							'</body>'+
							'</html>';						
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
		}
	else 
		{
	request.session.valid=1;
  console.log("Request handler 'upload_html' was called.");

  fs.readFile("./upload.html", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/html"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(file);
      response.end();
    }
  });
}
}
function tmp(response,request,db) {
  console.log("Request handler 'tmp' was called.");
  uname=request.session.user_id;
	console.log("/tmp/"+uname+".jpg");
  fs.readFile("/tmp/"+uname+".jpg", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file,"binary");
      response.end();
    }
  });
}
function signup_html(response,request,db)
{
	if(request.session.user_id)
		{
			if(request.session.user_id.length>0)
			{
				response.writeHead(302, {'Location':"http://localhost:8888/home"});
			response.end();
			}
		}
	else 
		{
	console.log("signup.html");
  fs.readFile("./signup.html", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/html"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(file);
      response.end();
    }
  });
}
}
function login_html(response,request,db)
{
if(request.session.user_id)
		{
			if(request.session.user_id.length>0)
			{
				response.writeHead(302, {'Location':"http://localhost:8888/home"});
			response.end();
			}
		}
	else 
		{
	console.log("login.html");
  fs.readFile("./login.html", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/html"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(file);
      response.end();
    }
  });
}
}
function Home(response,request,db)
{
	console.log("Home");
	if(request.session.user_id && request.session.pwd)
		{
			/*(var form='<!DOCTYPE html>'+
							'<html>'+
							'<script>'+
							'location.replace("http://localhost:8888/home");'+
							'</script>'+
							'</body>'+
							'</html>';
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();*/
			response.writeHead(302, {'Location':"http://localhost:8888/home"});
			response.end();
		}

	else   
		{
	request.on('data', function(chunk,err)
		{	
			if(err)
				{
					var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("You are not logged in!")'+
							'</script>'+
							'<body background="bg.jpg">'+
							'<script>'+
							'location.replace("http://localhost:8888/start");'+
							'</script>'+
							'</body>'+
							'</html>';
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
				}
			if(!chunk || chunk.length==0)
			{
				var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("You are not logged in!")'+
							'</script>'+
							'<body background="bg.jpg">'+
							'<script>'+
							'location.replace("http://localhost:8888/start");'+
							'</script>'+
							'</body>'+
							'</html>';
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
			}
      			console.log("Received body data:");
			str=chunk.toString();
      			console.log(str);
			var n=str.indexOf("uname=");
			var n1=str.indexOf("pwd=");
			var uname=str.substring(n+6,n1-1);
			var pwd=str.substring(n1+4);
			var a=uname.indexOf("%40");
			var abc=uname.substring(a+3);
			uname=uname.substring(0,a)+'@'+abc;
			uname=uname.replace(/</g,"<.");
			pwd=pwd.replace(/</g,"<.");
                	console.log(uname+' '+pwd);
			db.users1.find({email: uname}, function(err, users1) {
				if(users1.length==0)
					{
						var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("Wrong USERNAME/PASSWORD!")'+
							'</script>'+
							'<body background="bg.jpg">'+
							'<script>'+
							'location.replace("http://localhost:8888/start");'+
							'</script>'+
							'</body>'+
							'</html>';
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
					}	
		
				else users1.forEach(function(users1){ 
  					if(( err || !users1)||(users1.password!=pwd))
						{
							var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("Wrong USERNAME/PASSWORD!")'+
							'</script>'+
							'<body background="bg.jpg">'+
							'<script>'+
							'location.replace("http://localhost:8888/start");'+
							'</script>'+
							'</body>'+
							'</html>';
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
						}
  					else if((users1.email==uname)&&(users1.password==pwd))
						{
							request.session.user_id=uname;
							request.session.pwd=pwd;
							response.writeHead(302, {'Location':"http://localhost:8888/home"});
			response.end();
						}
							
				});
			});
	});
}
}
function home(response,request,db)
{
	if(!request.session.user_id ||request.session.user_id.length==0)
		{
			var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("You are not logged in!")'+
							'</script>'+
							'<body background="bg.jpg">'+
							'<script>'+
							'location.replace("http://localhost:8888/start");'+
							'</script>'+
							'</body>'+
							'</html>';						
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
		}
	else 
		{
console.log("Request handler 'home' was called.");
	var str="";
	var str1="";
	var fname="";
	if(request.session.user_id)
		{
			if(request.session.user_id.length>0)
			{
				uname=request.session.user_id;
				pwd=request.session.pwd;
				console.log(uname+' '+pwd);
				fs.readFile("/tmp/"+uname+".jpg", "base64", function(error, file) {
    				if(error){
      					db.tweets1.find({"email": uname},function(err,tw1){
					if(tw1==null)
					{
					}
					else
					{
						fname=tw1[0].image;
					}
				}).limit(1);
    				} else {
      					fname=file;
    				}
				});
				db.followers.find({uemail: uname}, function(err, followers) {
					if( err || !followers) console.log("No followers found");
					else
						{
							var fmail=[];
							var query = {};
							query["$or"]=[];
							query["$or"].push({"email":uname});
							followers.forEach(function(follower){
								fmail=follower.femail;
								fmail.forEach(function(f){
									console.log(f.email);
									query["$or"].push({"email":f.email});
									//console.log(cursor);
								});
							});
							db.tweets1.find(query,function(err, tweets) {				
  								if( err || !tweets) console.log("No male users found");
  								else tweets.forEach( function(maleUser)
									{
    										str1+='<div class="twdiv"><button 											id="twrem">Remove</button><button 											id="hide">Hide</button><p><img src="data:image/gif;base64,'+maleUser.image+'" width="75" height="75" alt="abc" align="left"> '+maleUser.date+"<br/>E-mail: "+maleUser.email+"<br/>Tweet: "+maleUser.tweet+"</p></div>";
						
									});
								var page=1;
								var form='<!DOCTYPE html>'+
						'<html>'+
						'<head>'+
						'<style type="text/css">'+ 
						'div.twdiv'+
						'{'+
						'background-color:#e5eecc;'+
						'padding:7px;'+
						'border:solid 1px #c3c3c3;'+
						'}'+
						'</style>'+
						'<script type="text/javascript" src=http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js></script>'+
						'<script type="text/javascript">'+
						'$(document).ready(function(){'+
						  '$(".twdiv #twrem").live("click",function(){'+
							'var v=$(this).parents(".twdiv").text()+"uname="+document.getElementById("uname").textContent;'+
						    '$(this).parents(".twdiv").load("/delete1",{data: v});'+
							  '});'+
							'$(".twdiv #hide").live("click",function(){'+
						    		'$(this).parents(".twdiv").hide("slow");'+
							  '});'+

						'});'+

						'function check()'+
						'{'+
							'if(document.getElementById("pattern").value=="")'+
							'{'+
								'alert("text field is empty");'+
								'return false;'+
							'}'+
							'if((document.getElementById("1").checked)||(document.getElementById("2").checked)||(document.getElementById("3").checked))'+
							'return true;'+
							'else'+
							'{'+
								'alert("no search type selected");'+
								'return false;'+
							'}'+
						'}'+
						'function func()'+
						'{'+
							'if(document.getElementById("tweet").value=="")'+
							'{'+
							'alert("you can not post blank tweet");'+
							'return false;}'+
							'else{'+
							'var str =document.getElementById("uname").textContent;'+
							'document.getElementById("tweet").value+="uname="+str;'+
							'return true;}'+
						'}'+
            							
						'$(document).ready(function(){'+
  							'$("#next").click(function(){'+
							'var str="uname="+document.getElementById("uname").textContent+"page="+document.getElementById("page").textContent;'+
							'if(document.getElementById("myDiv").textContent=="No More Tweets") return;'+
    							'$("#myDiv").load("/provideData",{data: "next"+str});'+
							'func1("next");'+
  							'});'+
							'$("#previous").click(function(){'+
							'if(document.getElementById("page").textContent=="Page: 1") return;'+
							'var a=document.getElementById("page").textContent;'+
							
							'var str="uname="+document.getElementById("uname").textContent			+"page="+document.getElementById("page").textContent;'+
    							'$("#myDiv").load("/provideData",{data: "previous"+str});'+
							'func1("previous");'+
  							'});'+
							'$("#pst").click(function(){'+
								'if(document.getElementById("tweet").value=="")'+
								'{'+
									'alert("you can not post blank tweet");'+
								'}'+
							'else{'+
								'var str =document.getElementById("uname").textContent;'+
								'var str1=document.getElementById("tweet").value+"uname="+str;'+
								'document.getElementById("tweet").value="";'+
								'$("#myDiv").load("/direct",{data: str1});'+
								'}'+
							'});'+
						'});'+
						'function func1(str){'+
					'$("#page").load("/provideData1",{data: document.getElementById("page").textContent+"task="+str});}'+
						'</script>'+
						'</head>'+
						'<body background="bg.jpg">'+
						
						'<img src="logo.png"  width="1270" height="200" /><br><hr/>'+
						'<P><font size="5" color="black"> <a href="home.html">Home</a>         <a href="logout.html">logout</a></font><br>'+'<img src="data:image/gif;base64,'+fname+'" width="100" height="100" alt="abc" align="left"><br>'+						
						'<form method="POST" action="/upload_html">'+
						'<input type="submit" value="Upload/change photo"></form>'+
						'<p id ="uname" align="right">'+uname+'</p>'+
						'<hr/>'+
						'<table><tr><td>'+
						'<input type="text" id="tweet" name="tweet">'+
						'<button id="pst">tw@@t</button>'+
						'</td><td>........</td>'+
						'<td></p><div id="page">Page: '+page+'</div>'+
						'<button type="button" id="previous">Previous</button>'+
						'<button type="button" id="next">Next</button></td></tr>'+
						'<tr><td><form method="POST" action="/following">'+
				     		'<input type="submit" value="See Whom you are following"/></p><br/>'+
						'<input type="hidden" name="uname" value='+uname+'>'+						
						'</form>'+
						'<form method="POST" action="/search1" onSubmit="return check()">'+
						'<input type="hidden" name="uname" value='+uname+'>'+
						'<p>SEARCH PEOPLE TO ADD <br/>'+
						'<input type="text" id="pattern" name="pattern"/><br/>'+
						'<input type="submit" value="Search">'+
						'</p></form></td>'+
						''+
							'<td></td><td><div id="myDiv"><p>'+str1+'</p></div></td></tr></table>'+
						
						'</body>'+'</html>';
						response.writeHead(200, {"Content-Type": "text/html"});
    						response.write(form);
    						response.end();

				}).sort({date:-1}).limit(5);
		}

	});
				
			}
}
}
}
function delete1(response,request,db)
	{
		if(!request.session.user_id ||request.session.user_id.length==0)
		{
			var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("You are not logged in!")'+
							'</script>'+
							'<body background="bg.jpg">'+
							'<script>'+
							'location.replace("http://localhost:8888/start");'+
							'</script>'+
							'</body>'+
							'</html>';						
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
		}
	else 
		{
		var str=" ";
		console.log("Request handler 'unfollow' was called.");
		request.on('data',function(chunk) {
			str=chunk.toString();
			str=querystring.parse(str);
			console.log(str);
			console.log(str.data);
			var n=str.data.indexOf("E-mail: ");
			var n1=str.data.indexOf("Tweet: ");
			var n2=str.data.indexOf("uname=");
			var email=str.data.substring(n+8,n1);
			console.log(email);
			var tw=str.data.substring(n1+7,n2);
			var uname=str.data.substring(n2+6);
			console.log(uname+'   '+tw+'   '+email);
			if(uname!=email)
			{
				response.writeHead(200, {"Content-Type": "text/plain"});
    				response.write("You dont have the permission to delete this tweet");
    				response.end();
			}
			else
			{		
			db.tweets1.remove({tweet: tw});
			response.writeHead(200, {"Content-Type": "text/plain"});
    			response.write("Tweet Deleted");
    			response.end();
			}	
		});
}
}
function show(response,request,db) {
  console.log("Request handler 'show' was called.");
	var str="";
	//db.open();
	db.tweets1.find(
	function(err, followers)
	{
  		if( err || !followers) console.log("No followers found");
  		else followers.forEach( function(follower)
		{
			str+=follower.email+'<img src="data:image/gif;base64,'+follower.image+'" width="100" height="100" alt="abc">';

  		})
		response.writeHead(200, {"Content-Type": "text/html"});
    		response.write(str);
    		response.end();

	});

  /*fs.readFile("/tmp/test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });*/
}
function provideData(response,request,db)
{
	if(!request.session.user_id ||request.session.user_id.length==0)
		{
			var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("You are not logged in!")'+
							'</script>'+
							'<body background="bg.jpg">'+
							'<script>'+
							'location.replace("http://localhost:8888/start");'+
							'</script>'+
							'</body>'+
							'</html>';						
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
		}
	else 
		{
	var str="";
	console.log("Haan Bhi");
	var str="";
	request.on('data', function(chunk)
	{
      		console.log("Received body data:");
		str=chunk.toString();
		console.log(str);
		var n=str.indexOf("uname%3D");
		var n1=str.indexOf("page%3DPage%3A+");
		var task=str.substring(5,n);
		var uname=str.substring(n+8,n1);
		var pagno=str.substring(n1+15);
		var a=uname.indexOf("%40");
		var abc=uname.substring(a+3);
		uname=uname.substring(0,a)+'@'+abc;

		console.log(task+'   '+uname+'   '+pagno);
		if(task=="next")
		{
				var str1="";
			db.followers.find({uemail: uname}, function(err, followers) {
			if( err || !followers) console.log("No followers found");
			else
			{
					var fmail=[];
					var query = {};
					query["$or"]=[];
					query["$or"].push({"email":uname});

						followers.forEach(function(follower){
							//console.log(cursor);
							fmail=follower.femail;
							fmail.forEach(function(f){
								console.log(f.email);
								query["$or"].push({"email":f.email});
								//console.log(cursor);
							});
						});
				db.tweets1.find(query,function(err, tweets) {
					if(tweets.length==0)
					{
						response.writeHead(200, {"Content-Type": "text/html"});
    						response.write("No More Tweets");
    						response.end();
					}

  					if( err || !tweets) console.log("No male users found");
  					else tweets.forEach( function(maleUser)
						{
    						//console.log(maleUser);
						str1+='<div class="twdiv"><button 											id="twrem">Remove</button><button 											id="hide">Hide</button><p><img src="data:image/gif;base64,'+maleUser.image+'" width="75" height="75" alt="abc" align="left"> '+maleUser.date+"<br/>E-mail: "+maleUser.email+"<br/>Tweet: "+maleUser.tweet+"</p></div>";
						
						});
								
						response.writeHead(200, {"Content-Type": "text/html"});
    						response.write(str1);
    						response.end();

				}).sort({date:-1}).skip(pagno*5).limit(5);
			}
			});
		}
		if(task=="previous")
		{
				var str1="";
			db.followers.find({uemail: uname}, function(err, followers) {
			if( err || !followers) console.log("No followers found");
			else
			{
					var fmail=[];
					var query = {};
					query["$or"]=[];
					query["$or"].push({"email":uname});

						followers.forEach(function(follower){
							//console.log(cursor);
							fmail=follower.femail;
							fmail.forEach(function(f){
								console.log(f.email);
								query["$or"].push({"email":f.email});
								//console.log(cursor);
							});
						});
				db.tweets1.find(query,function(err, tweets) {				
  					if( err || !tweets) console.log("No male users found");
  					else tweets.forEach( function(maleUser)
						{
    						//console.log(maleUser);
						str1+='<div class="twdiv"><button 											id="twrem">Remove</button><button 											id="hide">Hide</button><p><img src="data:image/gif;base64,'+maleUser.image+'" width="75" height="75" alt="abc" align="left"> '+maleUser.date+"<br/>E-mail: "+maleUser.email+"<br/>Tweet: "+maleUser.tweet+"</p></div>";
						
						});
								
						response.writeHead(200, {"Content-Type": "text/html"});
    						response.write(str1);
    						response.end();

				}).sort({date:-1}).skip((pagno-2)*5).limit(5);
			}
			});
		}
			
	});
}
}
function provideData1(response,request,db)
{
	if(!request.session.user_id ||request.session.user_id.length==0)
		{
			var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("You are not logged in!")'+
							'</script>'+
							'<body background="bg.jpg">'+
							'<script>'+
							'location.replace("http://localhost:8888/start");'+
							'</script>'+
							'</body>'+
							'</html>';						
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
		}
	else 
		{
	var str="";
	console.log("Haan Bhi");
	var str="";
	request.on('data', function(chunk)
	{
      		console.log("Received body data:");
		str=chunk.toString();
		console.log(str);
		var p=str.indexOf("task%3D");
		var p1=str.indexOf("Page%3A+");
		var page=str.substring(p1+8,p);
		var act=str.substring(p+7);
		console.log(page+'   '+act);
		if(act=="next")
		{
		page=parseInt(page)+1;
		response.writeHead(200, {"Content-Type": "text/html"});
    		response.write("Page: "+page);
    		response.end();
		}
		else if(act="previous")
		{
		page=parseInt(page)-1;
		response.writeHead(200, {"Content-Type": "text/html"});
    		response.write("Page: "+page);
    		response.end();
		}
			
	});
}
	

}
function direct(response,request,db)
{
	if(!request.session.user_id ||request.session.user_id.length==0)
		{
			var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("You are not logged in!")'+
							'</script>'+
							'<body background="bg.jpg">'+
							'<script>'+
							'location.replace("http://localhost:8888/start");'+
							'</script>'+
							'</body>'+
							'</html>';						
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
		}
	else 
		{	
	var str="";
	var str1="<p>";
	request.on('data', function(chunk)
	{
      		console.log("Received body data:");
		str=chunk.toString();
		str=querystring.parse(str);
		console.log(str);
		var n=str.data.indexOf("uname=");
		var tw=str.data.substring(0,n);
		
		tw=tw.replace(/</g,"<.");
		var uname=str.data.substring(n+6);
		console.log(tw+'    '+uname);
		fs.readFile("/tmp/"+uname+".jpg", "base64", function(error, file) {
		
			if(file)
			{
				db.tweets1.save({email: uname, tweet: tw ,date:new Date(),image:file});
			}
			else
			{
				db.tweets1.find({"email": uname},function(err,tw1){
				if(tw1==null)
				{
					db.tweets1.save({email: uname, tweet: tw ,date:new Date()});
				}
				else
				{
				db.tweets1.save({email: uname, tweet: tw ,date:new Date(),image:tw1[0].image});
				}
				}).limit(1);			
			}
			
    		});
		db.users1.find({email: uname}, function(err, users1) {	
		users1.forEach(function(users1){ 		 
		if(users1.email==uname)
		{
			console.log("1");
			db.followers.find({uemail: uname}, function(err, followers) {
			if( err || !followers) console.log("No followers found");
			else
			{
					var fmail=[];
					var query = {};
					query["$or"]=[];
					query["$or"].push({"email":uname});

						followers.forEach(function(follower){
							//console.log(cursor);
							fmail=follower.femail;
							fmail.forEach(function(f){
								console.log(f.email);
								query["$or"].push({"email":f.email});
								//console.log(cursor);
							});
						});
				db.tweets1.find(query,function(err, tweets) {				
  					if( err || !tweets) console.log("No male users found");
  					else tweets.forEach( function(maleUser)
						{
    						//console.log(maleUser);
						str1+='<div class="twdiv"><button 											id="twrem">Remove</button><button 											id="hide">Hide</button><p><img src="data:image/gif;base64,'+maleUser.image+'" width="75" height="75" alt="abc" align="left"> '+maleUser.date+"<br/>E-mail: "+maleUser.email+"<br/>Tweet: "+maleUser.tweet+"</p></div>";
						
						});
						str+="</p>";
								
						response.writeHead(200, {"Content-Type": "text/html"});
    						response.write(str1);
    						response.end();

				}).sort({date:-1}).limit(5);
	}
});
}
});
});
});
}
}
function add(response,request,db)
{
	var str="";
	request.on('data', function(chunk)
	{
      		console.log("Received body data:");
		str=chunk.toString();
      		console.log(str);

	var n=str.indexOf("name=");
	var n1=str.indexOf("uname=");
	var n2=str.indexOf("pwd=");
	var n3=str.indexOf("sex=");
	var name=str.substring(n+5,n1);
	var uname=str.substring(n1+6,n2);
	var pwd=str.substring(n2+4,n3);
	var sex=str.substring(n3+4);
	
	
	console.log(name+'  '+uname+'  '+'   '+pwd+'   '+sex);
	db.users.save({email: uname, password: pwd, sex: sex}, function(err, saved) {
  			if( err || !saved )
			{			
				console.log("User not saved");
				response.writeHead(200, {"Content-Type": "text/plain"});
    				response.write("User not saved");
    				response.end();
			}
  			else
			{
				console.log("User saved");
				response.writeHead(200, {"Content-Type": "text/plain"});
    				response.write("User saved");
    				response.end();
			}
});
});
}
function search1(response,request,db) {
	if(!request.session.user_id ||request.session.user_id.length==0)
		{
			var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("You are not logged in!")'+
							'</script>'+
							'<body background="bg.jpg">'+
							'<script>'+
							'location.replace("http://localhost:8888/start");'+
							'</script>'+
							'</body>'+
							'</html>';						
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
		}
	else 
		{
	console.log("Request handler 'search' was called.");
	request.on('data',function(chunk){
		str=chunk.toString();
		console.log(str);
		str=querystring.parse(str);
		pattern=str.pattern;
		pattern=pattern.replace(/</g,"<.");
		if(pattern=="")
			{
				response.writeHead(200,{"Content Type":"text/plain"});
				response.write("No empty values can be assigned to firstname, username or password. Go Back and Enter 					again!!");
				response.end();
			}
		var str="";
							var query={};
							query["$or"]=[];
							query["$or"].push({"email":pattern});
							query["$or"].push({"firstname":pattern});
							query["$or"].push({"lastname":pattern});
			db.users1.find(query,function(err,users1) {
				console.log(users1);
				if(users1.length>0)
					{
		  				users1.forEach(function(users1){ 
							str+='<div class="ex"><button class="hide">Follow</button><p>E-mail: '+users1.email						+"<br/>First name: "+users1.firstname+" <br/>Lastname: "+users1.lastname+"</p></div>";				
						});
						var form1='<!DOCTYPE html>'+
						'<html>'+
						'<head>'+
						'<script type="text/javascript" src=http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js></script>'+
						'<script type="text/javascript">'+
						'$(document).ready(function(){'+
  							'$(".ex .hide").click(function(){'+
								'var str23="uname="+document.getElementById("uname1").textContent	+"fol="+$(this).parents(".ex").text();'+
    								'$(this).parents(".ex").load("/follow",{data: str23});'+
  							'});'+
						'});'+
						'</script>'+

						'<style type="text/css">'+ 
						'div.ex'+
						'{'+
						'background-color:#e5eecc;'+
						'padding:7px;'+
						'border:solid 1px #c3c3c3;'+
						'}'+
						'</style>'+

						'</head>'+
						'<body background="bg.jpg">'+
						'<font size="5" color="black"> <a href="home.html">Home</a></font>'+
						'<h1>Search Results</h1><p id="uname1" align="right">'+uname+'</p>'+
						'<p>'+str+'<br/></p>'+
						'</body>'+
						'</html>';
					console.log(str);
					response.writeHead(200, {"Content-Type": "text/html"});
      					response.write(form1);
      					response.end();
					
				}
			else
				{
					      var form='<!DOCTYPE html>'+
						'<html>'+
						'<head>'+
						'</head>'+
						'<body background="bg.jpg">'+
						'<font size="5" color="black"> <a href="home.html">Home</a></font>'+
						'<p id="uname1" align="right">'+uname+'</p>'+
						'<p>'+"No such record exists!"+'<br/></p>'+
						'</body>'+
						'</html>';
					      response.writeHead(200, {"Content-Type": "text/html"});
      					      response.write(form);
      					      response.end();
				}			
			});
		
	});	
}
}
function follow(response,request,db) {
	var str=" ";
	console.log("Request handler 'follow' was called.");
	if(!request.session.user_id ||request.session.user_id.length==0)
		{
			var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("You are not logged in!")'+
							'</script>'+
							'<body background="bg.jpg">'+
							'<script>'+
							'location.replace("http://localhost:8888/start");'+
							'</script>'+
							'</body>'+
							'</html>';						
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
		}
	else 
		{
	request.on('data',function(chunk) {
		str=chunk.toString();
		var n=str.indexOf("fol%3DFollowE-mail%3A+");
		var n1=str.indexOf("uname%3D");
		var n2=str.indexOf("First+");
		var uname=str.substring(n1+8,n);
		var fname=str.substring(n+22,n2);
		var a=uname.indexOf("%40");
		var abc=uname.substring(a+3);
		uname=uname.substring(0,a)+'@'+abc;
		a=fname.indexOf("%40");
		abc=fname.substring(a+3);
		fname=fname.substring(0,a)+'@'+abc;
		console.log(str);
		console.log(uname+' '+fname);
		str="You are now following ";
		db.users1.find({email:fname},function(err,us) {
			if(us)
				{		
					db.followers.find({uemail:uname},function(err,users1) {
						if(users1.length==0)
							{
								db.followers.save({"uemail":uname,femail:[{"email":fname}],nof:1});
							}						
						else if(users1)
							{
								var x=0;
								users1.forEach( function(follower) {
									console.log(follower.femail);
									var fmail=[];
									fmail=follower.femail;
									fmail.forEach(function(f){
										if(f.email==fname)
										{console.log(f.email);
										x=1;
										response.writeHead(200, {"Content-Type": "text/plain"});
      										response.write("you are already a follower of "+fname);
      										response.end();
										}
									});
									if(x==0)
											{
												fmail.push({email:fname});
												db.followers.update( { uemail:uname }, { $set: 													{ femail : fmail } } );
												db.followers.update( { uemail:uname }, { $set: 													{ nof : follower.femail.length } } );
											}							
								});
							}
					});
				}
			else
				{
					response.writeHead(200, {"Content-Type": "text/plain"});
      					response.write("No such user exists!");
      					response.end();							
				}
		});
		response.writeHead(200, {"Content-Type": "text/plain"});
      		response.write(str+fname);
      		response.end();
	});
}
}
function signup(response,request,db) {
   var str=" ";
if(request.session.user_id)
		{
			if(request.session.user_id.length>0)
			{
				response.writeHead(302, {'Location':"http://localhost:8888/home"});
				response.end();
			}
		}
	else 
		{
console.log("Request handler 'signup' was called.");
request.on('data',function(chunk)
{
str=chunk.toString();
console.log(str);
str1=querystring.parse(str);
var n=str.indexOf("fname=");
var n1=str.indexOf("lname=");
var n2=str.indexOf("uname=");
var n3=str.indexOf("pwd=");
var n4=str.indexOf("pwd1=");
var fname=str.substring(n+6,n1-1);
fname=fname.replace(/</g,"<.");
var lname=str.substring(n1+6,n2-1);
lname=lname.replace(/</g,"<.");
var uname=str.substring(n2+6,n3-1);
var pwd=str.substring(n3+4,n4-1);
pwd=pwd.replace(/</g,"<.");
var pwd1=str.substring(n4+5);
pwd1=pwd1.replace(/</g,"<.");
var a=uname.indexOf("%40");
var abc=uname.substring(a+3);
uname=str1.uname;
uanme=uname.replace(/</g,"<.");
if(pwd != pwd1)
{
var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("Passwords do not match!")'+
							'</script>'+
							'<body background="bg.jpg">'+
							'<script>'+
							'location.replace("http://localhost:8888/signup.html");'+
							'</script>'+
							'</body>'+
							'</html>';						
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
}
db.users1.find({email:uname},function(err,users1) {
	if(users1.length>0)
	{
		 var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("Username already taken!")'+
							'</script>'+
							'<body background="bg.jpg">'+
							'<script>'+
							'location.replace("http://localhost:8888/signup.html");'+
							'</script>'+
							'</body>'+
							'</html>';						
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
	}	
	else	db.users1.save({email: uname, firstname: fname, lastname: lname, password: pwd}, function(err, saved)
			{
  				if( err || !saved )
					{
						var form='<!DOCTYPE html>'+
						'<html>'+
						'<head>'+
						'</head>'+
						'<body background="bg.jpg">'+
						'<form method="POST" action="/signup_html"/>'+
						'<p>'+"Encountered an error!"+'<br/></p>'+
						'<input type="submit" value="TRY AGAIN">'+
						'</form>'+
						'</body>'+
						'</html>';
						
						console.log("User not saved");
						response.writeHead(200,{"Content Type":"text/html"});
						response.write(form);
						response.end();
					}
  				else
					{
						request.session.user_id=uname;
						request.session.pwd=pwd;						
						response.writeHead(302, {'Location':"http://localhost:8888/home"});
			response.end();
					}
			});
});
/*
else
		{
			console.log("Username alread exists!");
			response.writeHead(200,{"Content Type":"text/plain"});
			response.write("Username alread exists!");
			response.end();
		}*/
}); 
}
}

function shakehands_png(response,request,db)
{
	console.log("shakehands_png");
	fs.readFile("./shakehands.png", "binary", function(error, file) {
    if(error) {
	console.log("file error");
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
	console.log("file returned");
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });

}

function signup_jpg(response,request,db)
{
	console.log("signup_jpg");
	fs.readFile("./signup.jpg", "binary", function(error, file) {
    if(error) {
	console.log("file error");
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
	console.log("file returned");
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });

}

function logo_png(response,request,db)
{
	console.log("logo_png");
	fs.readFile("./logo.png", "binary", function(error, file) {
    if(error) {
	console.log("file error");
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
	console.log("file returned");
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });

}

function bg_jpg(response,request,db)
{
	console.log("bg_jpg");
	fs.readFile("./bg.jpg", "binary", function(error, file) {
    if(error) {
	console.log("file error");
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
	console.log("file returned");
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });

}
function following(response,request,db)
{
	if(!request.session.user_id ||request.session.user_id.length==0)
		{
			var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("You are not logged in!")'+
							'</script>'+
							'<body background="bg.jpg">'+
							'<script>'+
							'location.replace("http://localhost:8888/start");'+
							'</script>'+
							'</body>'+
							'</html>';						
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
		}
	else 
		{
	console.log("Request handler 'following' was called.");
	var str="";
	var str1="";
	request.on('data', function(chunk)
	{
      		console.log("Received body data:");
		str=chunk.toString();
		uname=str.substring(6);
		var n=str.indexOf("uname=");
		var a=uname.indexOf("%40");
		var abc=uname.substring(a+3);
		uname=uname.substring(0,a)+'@'+abc;
		console.log(uname);
		var str="";
		db.followers.find({uemail: uname}, function(err, followers) {
			if( err || !followers) console.log("No followers found");
			else
				{
					var fmail=[];
					followers.forEach(function(follower){
						fmail=follower.femail;
						fmail.forEach(function(f){
							str+='<div class="ex"><button class="unfollow">Unfollow</button><p>E-mail: '+f.email+'</p></div>';
						});
						console.log(str);
					}); 
				     if(str=="[]")
						{
							str="You currently do not follow anyone!";
						}
				      var form1='<!DOCTYPE html>'+
						'<html>'+
						'<head>'+
						'<script type="text/javascript" src=http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js></script>'+
						'<script type="text/javascript">'+
						'$(document).ready(function(){'+
  							'$(".ex .unfollow").click(function(){'+
								'var str23="uname="+document.getElementById("uname1").textContent	+"fol="+$(this).parents(".ex").text();'+
    								'$(this).parents(".ex").load("/unfollow",{data: str23});'+
  							'});'+
						'});'+
						'</script>'+
						'<style type="text/css">'+ 
						'div.ex'+
						'{'+
						'background-color:#e5eecc;'+
						'padding:7px;'+
						'border:solid 1px #c3c3c3;'+
						'}'+
						'</style>'+
						'</head>'+
						'<body background="bg.jpg">'+
						'<font size="5" color="black"> <a href="home.html">Home</a></font>'+
						'<h1>You are following:</h1><p id="uname1" align="right">'+uname+'</p>'+
						'<p>'+str+'<br/></p>'+
						'</body>'+
						'</html>';
				}	
			response.writeHead(200, {"Content-Type": "text/html"});
    			response.write(form1);
    			response.end();			
		});

	});
}
}
function unfollow(response,request,db)
	{
		if(!request.session.user_id ||request.session.user_id.length==0)
		{
			var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("You are not logged in!")'+
							'</script>'+
							'<body background="bg.jpg">'+
							'<script>'+
							'location.replace("http://localhost:8888/start");'+
							'</script>'+
							'</body>'+
							'</html>';						
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
		}
	else 
		{
		var str=" ";
		console.log("Request handler 'unfollow' was called.");
		request.on('data',function(chunk) {
			str=chunk.toString();
			console.log(str);
			var n=str.indexOf("fol%3DUnfollowE-mail%3A+");
			var n1=str.indexOf("data=uname%3D");
			var fname=str.substring(n+24);
			var uname=str.substring(n1+13,n);
			var a=fname.indexOf("%40");
			var b=fname.substring(a+3);
			fname=fname.substring(0,a)+"@"+b;
			a=uname.indexOf("%40");
			b=uname.substring(a+3);
			uname=uname.substring(0,a)+"@"+b;
			console.log(uname+' '+fname);
			
			db.followers.find({uemail:uname},function(err,follo) {
				if( err || !follo) console.log("No followers found");
				else if(follo.length>0)
					{
						var str=fname;
						var fmail=[];
						var fmail1=[];
						console.log(JSON.stringify(follo));
						follo.forEach( function(follower) {
								console.log(follower.femail);
								fmail=follower.femail;	
								fmail.forEach(function(unfollo){ 
									if(unfollo.email!=fname)
									fmail1.push({email:unfollo.email});
								});	
						db.followers.update( { uemail:uname }, { $set: { femail : fmail1 } } );
						db.followers.update( { uemail:uname }, { $set: { nof : follower.femail.length } } );
						});					
						response.writeHead(200, {"Content-Type": "text/html"});
    						response.write("User Unfollowed");
    						response.end();							
					}
			});		
		});		
	}
}
function logout(response,request,db)
{
	
	delete request.session.user_id;
	delete request.session.pwd;
	response.writeHead(302, {'Location': 'http://localhost:8888/start'});
      	response.end();
						
}
exports.tmp=tmp;
exports.upload_html=upload_html;
exports.upload=upload;
exports.home=home;
exports.Home=Home;
exports.delete1=delete1;
exports.direct=direct;
exports.logo_png=logo_png;
exports.bg_jpg=bg_jpg;
exports.signup_jpg=signup_jpg;
exports.shakehands_png=shakehands_png;
exports.signup_html=signup_html;
exports.add=add;
exports.login_html=login_html;
exports.start = start;
exports.home = home;
exports.show = show;
exports.signup=signup;
exports.search1=search1;
exports.provideData=provideData;
exports.provideData1=provideData1;
exports.follow=follow;
exports.following=following;
exports.unfollow=unfollow;
exports.logout=logout;
