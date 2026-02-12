import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 👇 IMPORTANT: force Node.js runtime
export const config = {
  runtime: "nodejs"
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const { messages } = req.body;

    if (!messages) {
      return res.status(400).json({ error: "No messages provided" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are Jarvis, a futuristic AI assistant." },
        ...messages
      ]
    });

    return res.status(200).json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    console.error("API ERROR:", error);
    return res.status(500).json({
      error: error.message
    });
  }
}
