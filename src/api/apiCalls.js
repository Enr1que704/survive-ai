import OpenAI from "openai";
import 'dotenv/config';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY
});

const generateResponse = async(message) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: [
            {"role": "user", "content": message},
        ],
    });
    return completion.choices[0].message.content;
};

export default generateResponse;