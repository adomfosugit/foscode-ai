import express from 'express'
import * as dotenv from 'dotenv'
// allow to process data from .env 
import cors from 'cors'
// to make cross origin request
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()
//console.log(process.env.OPENAI_API_KEY)

const configuration = new Configuration({
  apiKey: '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',
});
// openai documentaion
const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from FOSCODE AI!'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0, 
      max_tokens: 3000, 
      top_p: 1, 
      frequency_penalty: 0.5, 
      presence_penalty: 0, 
        });
// sending information back to the frontend

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))