import * as fs from 'fs';
import { OpenAIClient } from './openai-client';
import { ChatCompletionMessageParam } from 'openai/resources';

export async function generateSalesTranscript(
        client: OpenAIClient,
        fileName: string | undefined
    ): Promise<void> {
    const prompt: ChatCompletionMessageParam[] = [{
        role: "user",
        content: `Generate a fictional sales call transcript. Here is an example of what a transcript format should look like:

            00:00:00 Sam (openai.com): Hey there Staya.
            00:00:02 Satya  (microsoft.com): Hi Sam, how are you?
            00:00:05 Sam (openai.com): I'm doing good. Do you think you can give us 10000 more GPUs?
            00:00:06 Satya (microsoft.com): I'm sorry Sam we can't do 10000, how about 5000?
            
            Your response should include only the transcript and nothing else.`
    }];
	const response = await client.createChatCompletion(prompt);

    if (!fileName || !fileName.startsWith('./output/'))
        fileName = `./output/${fileName || response.id}`;

    fs.writeFileSync(fileName, response.message);
	console.log(response.message);
}

export async function summarizeTranscript(
        client: OpenAIClient,
        fileName: string | undefined
    ): Promise<void> {
    if (!fileName)
        throw new Error("Usage: node main.js summarize <file_name>");

    const fileContent = fs.readFileSync(fileName, "utf-8");
    const prompt: ChatCompletionMessageParam[] = [
        { role: "system", content: `You are an AI meeting assistant that reads a sales call transcript as input and responds
            with a summary of the key points from the call.` },
        { role: "user", content: fileContent }
    ];
    const response = await client.createChatCompletion(prompt);

    console.log(response.message);
}

export async function answerQuery(
        client: OpenAIClient,
        fileName: string | undefined,
        query: string | undefined
    ): Promise<void> {
    if (!fileName || !query)
        throw new Error("Usage: node main.js answer <file_name> <question>");

    const fileContent = fs.readFileSync(fileName, "utf-8");
    const prompt: ChatCompletionMessageParam[] = [
        { role: "system", content: `You are an AI assistant who will answer user questions in relation to a provided
            sales call transcript.` },
        { role: "user", content: fileContent },
        { role: "user", content: query }
    ];
    const response = await client.createChatCompletion(prompt);

    console.log(response.message);
}