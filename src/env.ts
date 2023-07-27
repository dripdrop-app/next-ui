import assert from "assert";

interface EnvOptions {
    serverOnly?: boolean;
    defaultValue?: string;
}

const get_env = (variableName: string, options: EnvOptions) => {
    if (options.serverOnly && typeof window !== "undefined") {
        return "";
    }
    const envVariable = process.env[variableName];
    if (typeof envVariable !== "string") {
        if (options.defaultValue !== undefined) {
            return options.defaultValue;
        }
        assert(typeof envVariable === "string");
    }
    return envVariable;
};

export const API_SERVER_URL = get_env("API_SERVER_URL", { serverOnly: true });
