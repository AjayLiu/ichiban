// const fetch = require('node-fetch');
const { MongoClient } = require('mongodb');

async function getData() {
  const user = process.env.USER;
  const password = process.env.PASSWORD;
  const uri =
    `mongodb+srv://${user}:${password}@cluster0.szv2q.mongodb.net/test?retryWrites=true&w=majority`;
  
    const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  try {
    await client.connect();
    const test = await client
      .db('ichiban')
      .collection('highscore')
      .find().sort({"score":-1}).limit(1).toArray()
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
    // console.log(data);
    return {
      statusCode: 200,
      body: JSON.stringify({ score: data[0].score })
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) 
    };
  }
};