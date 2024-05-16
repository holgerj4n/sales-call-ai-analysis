import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';

export interface ChatCompletionResponse {
    id: string,
    created: number,
    message: string
}

export class OpenAIClient {
    private _client: OpenAI;
    private _model: string;

    constructor(model: string = "gpt-3.5-turbo-16k") {
        this._client = new OpenAI();
        this._model = model;
    }

    public async createChatCompletion(messages: ChatCompletionMessageParam[]): Promise<ChatCompletionResponse> {
        const data = {
            model: this._model,
            messages: messages
        };

        const response = await this._client.chat.completions.create(data);

        if (response.choices[0].finish_reason !== "stop")
            throw new Error(`Encountered unexpected finish reason from OpenAI API: ${response.choices[0].finish_reason}`);

        if (!response.choices[0].message.content)
            throw new Error("Missing content from OpenAI API response");

        return {
            id: response.id,
            created: response.created,
            message: response.choices[0].message.content
        };
    }
}