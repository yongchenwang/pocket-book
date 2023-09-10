var express = require('express');
var router = express.Router();

let low = require('lowdb');
let FileSync = require('lowdb/adapters/FileSync');

let adapter = new FileSync(__dirname + '/../data/db.json');
let db = low(adapter);

let shortid = require('shortid');

router.get('/', function(req, res) {
  res.render('index', { title: 'Pocket Book' });
});

router.get('/record', function(req, res) {
  let records = db.get('records').value();
  res.render('list', {records: records});
});

router.get('/record/create', function(req, res,) {
  res.render('create');
});

router.post('/record', function(req, res) {
  let id = shortid.generate();
  db.get('records').unshift({id:id, ...req.body}).write();
  res.render('success', {msg: 'Create record success!', url: '/record'});
});

router.get('/record/delete/:id', function(req, res) {
  let id = req.params.id;
  db.get('records').remove({id: id}).write();
  res.render('success', {msg: 'Delete record success!', url: '/record'});
});

router.all('*',(req,res)=>{
  res.render('error', {msg: '404 Not Found', url: '/record'})
});

module.exports = router;
