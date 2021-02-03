// const fetch = require('node-fetch');
const { MongoClient } = require('mongodb');

async function getData() {
  const uri =
    'mongodb+srv://<user>:<password>@cluster0-2pfxk.mongodb.net/test?retryWrites=true&w=majority';
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  try {
    await client.connect();
    const test = await client
      .db('sample_airbnb')
      .collection('listingsAndReviews')
      .findOne({ name: 'Apt Linda Vista Lagoa - Rio' });
    return test;
  } catch (err) {
    console.log(err); // output to netlify function log
  } finally {
    await client.close();
  }
}

exports.handler = async function(event, context) {
  try {
    const data = await getData();
    return {
      statusCode: 200,
      body: JSON.stringify({ id: data._id })
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) 
    };
  }
};