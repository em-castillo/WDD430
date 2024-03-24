var Sequence = require('../models/sequence');

let sequenceId = null;

const sequenceGenerator = {
  async init() {
    try {
      const sequence = await Sequence.findOne({}).exec();
      if (!sequence) {
        throw new Error('Sequence not found');
      }
      sequenceId = sequence._id;
    } catch (err) {
      console.error('Error initializing SequenceGenerator:', err);
      throw err;
    }
  },

  async nextId(collectionType) {
    // Ensure the generator is initialized. If not, call the init() function above.
    if (!sequenceId) {
      await this.init();
    }

    let updateObject = {};
    let nextId;

    try {
      // Await the nextId function call to resolve the Promise
      switch (collectionType) {
        case 'documents':
          const maxDocumentId = await this.nextDocumentId();
          nextId = maxDocumentId.toString(); // Convert to string
          updateObject = { maxDocumentId: maxDocumentId };
          break;
        case 'messages':
          const maxMessageId = await this.nextMessageId();
          nextId = maxMessageId.toString(); // Convert to string
          updateObject = { maxMessageId: maxMessageId };
          break;
        case 'contacts':
          const maxContactId = await this.nextContactId();
          nextId = maxContactId.toString(); // Convert to string
          updateObject = { maxContactId: maxContactId };
          break;
        default:
          return -1;
      }

      // Update the sequence collection with the new maximum ID
      await Sequence.updateOne({ _id: sequenceId }, { $set: updateObject });

      return nextId;
    } catch (err) {
      console.log("nextId error = " + err);
      return null;
    }
  },

  async nextDocumentId() {
    const sequence = await Sequence.findOneAndUpdate({}, { $inc: { maxDocumentId: 1 } }, { new: true });
    return sequence.maxDocumentId;
  },

  async nextMessageId() {
    const sequence = await Sequence.findOneAndUpdate({}, { $inc: { maxMessageId: 1 } }, { new: true });
    return sequence.maxMessageId;
  },

  async nextContactId() {
    const sequence = await Sequence.findOneAndUpdate({}, { $inc: { maxContactId: 1 } }, { new: true });
    return sequence.maxContactId;
  }
};

module.exports = sequenceGenerator;