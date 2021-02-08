const { MongoClient } = require('mongodb');

async function setData(newScore) {
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
    await client.db('ichiban').collection('highscore').insertOne(
        { 
            "score" : newScore,
            "time": new Date().toISOString()
        }
    )
  } catch (err) {
    console.log(err); // output to netlify function log
  } finally {
    await client.close();
  }
}

exports.handler = async function(event, context) {

  const data = JSON.parse(event.body) 

  try {
    await setData(data.score);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'success' })
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) 
    };
  }
};