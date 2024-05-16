import * as fs from 'fs';

export interface Config {
    openai: {
        model: string
    }
}

export class ConfigReader {

    public static readConfig(configFile: string): Config {
        const configFileContent = fs.readFileSync(configFile, "utf-8");
        return JSON.parse(configFileContent);
    }
}