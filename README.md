# AI Sales Call Analysis

This project provides a number of scripts which leverage the OpenAI Chat Completion API to generate and analyze sales call transcripts. The following features are supported:

1. **Generate** : Create a fictional sales call transcript and store the output in a file
2. **Summarize** : Summarize the key points of a given sales call transcript
3. **Answer questions** : Answer a user question in relation to a given sales call transcript

The code is implemented with TypeScript and Node.js, and uses OpenAI's official node module.

## Setup

To install and run the application you will need Node.js and NPM. If you do not have those tools installed, I recommend using [Node Version Manager](https://github.com/nvm-sh/nvm).

After cloning the repository, run the following commands:
```
npm install
npx tsc
```
This will install the required modules and compile the TypeScript files.

### OpenAI API Key

To use the OpenAI GPT API you will need a valid API key. A new key can be created [on their website](https://platform.openai.com/api-keys). Once you have a key, you will need to store it as an environment variable.
```
export OPENAI_API_KEY="your_api_key"
```

### GPT Version

By default this application uses `gpt-3.5-turbo-16k`. If you would like to change this, edit the config value in `config/default.json`.

## Usage

1. Generate a sales call transcript
```
npm run gen transcript.txt
```
This will create a new transcript and store the content in `./output/transcript.txt`. The transcript will also be printed to the console. If the file name is omitted, the ID returned by the OpenAI API will be used instead.

2. Summarize a transcript
```
npm run sum output/transcript.txt
```
This will read the file contents of `output/transcript.txt` and print a summary to the console.

3. Answer a question
```
npm run ask output/transcript.txt "Your question"
```
The answer to the question will be printed to the console.

*Remember to enclose the question in quotation marks!*

---

### Transparency on AI Usage

All code within this project is my original work. An AI assistant was used to generate code documentation. For more details please refer to the commit history.
