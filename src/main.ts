import { ConfigReader } from './config';
import { OpenAIClient } from './openai-client';
import { answerQuery, generateSalesTranscript, summarizeTranscript } from './interactions';

/**
 * The main entry point of the application.
 * 
 * Executes one of three commands based on the command-line arguments:
 * - generate: generates a sales call transcript
 * - summarize: summarizes a sales call transcript
 * - answer: answers a user query in relation to a provided sales call transcript
 * 
 * @throws Error if the command is missing.
 * @throws Error if the command is not one of the supported commands (generate, summarize, answer).
 */
async function main() {
	if (process.argv.length < 3) {
		throw new Error("Usage: node main.js command [file_name] [query]");
	}

	const configFile = "./config/default.json";
	const config = ConfigReader.readConfig(configFile);

	const client = new OpenAIClient(config.openai.model);

	switch (process.argv[2]) {
		case "generate":
			generateSalesTranscript(client, process.argv[3]);
			break;
		case "summarize":
			summarizeTranscript(client, process.argv[3]);
			break;
		case "answer":
			answerQuery(client, process.argv[3], process.argv[4]);
			break;
		default:
			throw new Error("Command should be one of: generate, summarize, answer");
	}
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});