const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');

var express = require('express');
var router = express.Router();


//get
router.get('/', async (req, res, next) => {
    Message.find()
      .populate('sender')
      .then((messages) => {
        res.status(200).json({
          message: 'Retrieved messages from database.',
          messages: messages
        });
    })
      .catch((err) => {
        res.status(500).json({
          message: 'Cannot get messages.',
          error: err
        });
    });
});

 //post
router.post('/', async (req, res, next) => {
  try {
      const maxMessageId = await sequenceGenerator.nextId("messages");
      const message = new Message({
          id: maxMessageId, 
          subject: req.body.subject, 
          msgText: req.body.msgText, 
          sender: req.body.sender
      });

      const newMessage = await message.save();
      res.status(201).json({
          message: 'Message added successfully',
          newMessage: createdMessage
      });
  } catch (error) {
      res.status(500).json({
          message: 'An error occured creating the message',
          error: error
      });
  }
});



  module.exports = router; 
