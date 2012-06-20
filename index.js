var server = require("./server");
var router = require("./router");
var requestHandlers = require("./reqHandler");

var databaseUrl = "mydb"; // "username:password@example.com/mydb"
var collections = ["users1","tweets1","followers","test1"]
var db = require("mongojs").connect(databaseUrl, collections);

//db.followers.remove({uemail: "sanju@gmail.com"});

/*db.followers.save({uemail: "sanju@gmail.com", femail : [ { "email":"sanjeevtagra@gmail.com" }, { "email":"smith@anna.com" }],nof:2}, function(err, saved) {
  if( err || !saved ) console.log("User not saved");
  else console.log("follower added");
});*/
var handle = {}
handle["/home.html"] = requestHandlers.home;
handle["/tmp"] = requestHandlers.tmp;
handle["/upload_html"] = requestHandlers.upload_html;
handle["/upload"] = requestHandlers.upload;
handle["/login_html"] = requestHandlers.start;
handle["/logout.html"] = requestHandlers.logout;
handle["/start"] = requestHandlers.start;
handle["/"] = requestHandlers.start;
handle[""] = requestHandlers.start;
handle["/delete1"] = requestHandlers.delete1;
handle["/home"] = requestHandlers.home;
handle["/Home"] = requestHandlers.Home;
handle["/urhome"] = requestHandlers.urhome;
handle["/show"] = requestHandlers.show;
handle["/add"]=requestHandlers.add;
handle["/signup"]=requestHandlers.signup;
handle["/signup.html"]=requestHandlers.signup_html;
handle["/shakehands.png"]=requestHandlers.shakehands_png;
handle["/signup.jpg"]=requestHandlers.signup_jpg;
handle["/bg.jpg"]=requestHandlers.bg_jpg;
handle["/logo.png"]=requestHandlers.logo_png;
handle["/direct"]=requestHandlers.direct;
handle["/search1"]=requestHandlers.search1;
handle["/provideData"]=requestHandlers.provideData;
handle["/provideData1"]=requestHandlers.provideData1;
handle["/follow"]=requestHandlers.follow;
handle["/unfollow"]=requestHandlers.unfollow;
handle["/following"]=requestHandlers.following;
server.start(router.route, handle,db);
