
 var fs = require('fs');
 var path = require('path');
 var express = require('express');
 var app = express();
 
 var COMMENTS_FILE = path.join(__dirname, 'db.json');
 app.set('port', (process.env.PORT || 9000));
 
 app.use('/', express.static(path.join(__dirname, 'public')));
 app.use(express.json());
 
 // Additional middleware which will set headers that we need on each request.
 app.use(function(req, res, next) {
     // Set permissive CORS header - this allows this server to be used only as
     // an API server in conjunction with something like webpack-dev-server.
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Headers', '*');
     res.setHeader(`Access-Control-Allow-Methods`, `GET, POST, PUT, DELETE, OPTIONS`);
     res.setHeader('Access-Control-Max-Age', 3600 ); // 1 hour
     // Disable caching so we'll always get the latest comments.
     res.setHeader('Cache-Control', 'no-cache');
     next();
 });
 
 app.get('/api/annotations', function(req, res) {
   fs.readFile(COMMENTS_FILE, function(err, data) {
     if (err) {
       console.error(err);
       process.exit(1);
     }
     res.json(JSON.parse(data));
   });
 });
 
 app.post('/api/annotations', function(req, res) {
   fs.readFile(COMMENTS_FILE, function(err, data) {
     if (err) {
       console.error(err);
       process.exit(1);
     }
     var comments = JSON.parse(data);
     // NOTE: In a real implementation, we would likely rely on a database or
     // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
     // treat Date.now() as unique-enough for our purposes.
     var newComment = {
       id: Date.now(),
       title: req.body.title,
       content: req.body.content,
       status: req.body.status,
       created: Date.now(),
       modified: Date.now()
     };
     comments.push(newComment);
     fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
       if (err) {
         console.error(err);
         process.exit(1);
       }
       res.status(201).location(`/api/annotations/${newComment.id}`).json(newComment);
     });
   });
 });
 
 app.put('/api/comments/:id', function(req, res) {
   fs.readFile(COMMENTS_FILE, function(err, data) {
     if (err) {
       console.error(err);
       process.exit(1);
     }
     var comments = JSON.parse(data);
     // NOTE: In a real implementation, we would likely rely on a database or
     // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
     // treat Date.now() as unique-enough for our purposes.
     const commentId = +req.params.id;
     const comment = req.body;
     if(commentId !== comment.id) {
       res.status(400).json({code: 400, message: `IDs in the URL and message body are different.`});
       return;
     }
     const index = comments.findIndex(c => c.id === commentId);
     if(index < 0) {
       res.status(404).json({code: 404, message: `Comment with ID=${commentId} not found.`});
       return;
     }
     comments.modified = Date.now();
     comments[index] = comment;
     fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
       if (err) {
         console.error(err);
         process.exit(1);
       }
       res.json(comment); //200 OK with comment in the body
     });
   });
 });
 
 app.delete('/api/comments/:id', function(req, res) {
   fs.readFile(COMMENTS_FILE, function(err, data) {
     if (err) {
       console.error(err);
       process.exit(1);
     }
     let comments = JSON.parse(data);
     // NOTE: In a real implementation, we would likely rely on a database or
     // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
     // treat Date.now() as unique-enough for our purposes.
     const commentId = +req.params.id;
     const index = comments.findIndex(c => c.id === commentId);
     if(index < 0) {
       res.status(404).json({code: 404, message: `Comment with ID=${commentId} not found.`});
       return;
     }
     const deleted = comments[index]
     comments.splice(index, 1);
     fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
       if (err) {
         console.error(err);
         process.exit(1);
       }
       res.json(deleted); //200 OK with deleted comment in the body
     });
   });
 });
 
 
 app.listen(app.get('port'), function() {
   console.log('Server started: http://localhost:' + app.get('port') + '/');
 });
 