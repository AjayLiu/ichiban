// const fetch = require('node-fetch');
const { MongoClient } = require("mongodb");

async function getData() {
  const user = process.env.USER;
  const password = process.env.PASSWORD;
  const uri = `mongodb+srv://${user}:${password}@cluster0.szv2q.mongodb.net/test?retryWrites=true&w=majority`;

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    let date = new Date();
    date.setDate(date.getDate() - 30);
    date = date.toISOString();
    // console.log(date);
    const test = await client
      .db("ichiban")
      .collection("highscore")
      .find({ time: { $gte: date } })
      .sort({ score: -1 })
      .limit(1)
      .toArray();
    // .find().sort({"score":-1}).limit(1).toArray()
    return test;
  } catch (err) {
    // reached here probably because no high score was logged in past 30 days
    return [{ score: 0 }];
    console.log(err); // output to netlify function log
  } finally {
    await client.close();
  }
}

exports.handler = async function (event, context) {
  try {
    const data = await getData();
    // console.log(data[0].time)
    // console.log(data[0].score);
    return {
      statusCode: 200,
      body: JSON.stringify({ score: data[0].score }),
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
