var express = require('express')
	, path = require('path')
	, logger = require('morgan')
	, bodyParser = require('body-parser')
  , favicon = require('serve-favicon')


var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
/*import routes*/

console.time("Loading route index");
var indexRouter = requireFromRoot("routes/index");
app.use("/",indexRouter);
console.timeEnd("Loading route index");
var versions = config.version || ["v1.0"];
var type =  config.type || "dev";
/*end load*/
routes = ["users"];
_.each(versions, function(version){
	_.each(routes, function(route){
	  console.time("Loading route " + version + " " + route);
	  contentRouter = requireFromRoot("routes/"  + version + "/" + route);
	  app.use(route,contentRouter);
	  console.timeEnd("Loading route " + version + " " + route);
	});
});

/*end load routes*/
module.exports = app;