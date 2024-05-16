import * as fs from 'fs';

export interface Config {
    openai: {
        model: string
    }
}

export class ConfigReader {

    /**
     * Reads a JSON formatted configuration file.
     * 
     * @param configFile - The name of the config file.
     * 
     * @returns An object containing the parsed configuration data.
     */
    public static readConfig(configFile: string): Config {
        const configFileContent = fs.readFileSync(configFile, "utf-8");
        return JSON.parse(configFileContent);
    }
}