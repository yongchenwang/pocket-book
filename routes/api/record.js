var express = require('express');
var router = express.Router();

let moment = require('moment');
const RecordModel = require('../../models/RecordModel');

router.get('/', function(req, res) {
  res.render('index', { title: 'Pocket Book' });
});

router.get('/record', function(req, res) {
  RecordModel.find().sort({time: -1}).then((records) => {
    res.render('list', {records: records, moment: moment});
  })
  .catch((err) => {
    res.status(500).send(err);
    return;
  })
});

router.get('/record/create', function(req, res,) {
  res.render('create');
});

router.post('/record', function(req, res) {
  RecordModel.create({
    ...req.body,
    time: moment(req.body.time).toDate(),
  }).then((record) => {
    res.render('success', {msg: 'Create record success!', url: '/record'});
  })
  .catch((err) => {
    res.status(500).send(err);
    return;
  })
});

router.get('/record/delete/:id', function(req, res) {
  let id = req.params.id;
  RecordModel.deleteOne({_id: id}).then((record) => {
    res.render('success', {msg: 'Delete record success!', url: '/record'});
  })
  .catch((err) => {
    res.status(500).send(err);
    return;
  })
});

router.all('*',(req,res)=>{
  res.render('error', {msg: '404 Not Found', url: '/record'})
});

module.exports = router;
