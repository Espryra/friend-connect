import * as fs from "fs";
import type { Config } from "../types/fileManager";

export default class FileManager {
  public static Config(): Config {
    return JSON.parse(fs.readFileSync("lib/config.json", "utf8"));
  }
}
