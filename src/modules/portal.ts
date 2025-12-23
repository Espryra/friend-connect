import { BedrockPortal, Joinability, Modules } from "bedrock-portal";
import { Titles } from "prismarine-auth";
import FileManager from "../utils/fileManager";

export default class Portal {
  private static instance: BedrockPortal;

  public static async Start(): Promise<void> {
    const config = FileManager.Config();

    if (!config.ip || !config.port) {
      throw new Error("Missing IP or port in config.json");
    }

    this.instance = new BedrockPortal({
      authflow: {
        cache: "lib/account/",
        username: "account",
        options: {
          flow: "live",
          authTitle: Titles.MinecraftNintendoSwitch,
        },
      },
      ip: config.ip,
      port: config.port,
      joinability: Joinability.FriendsOfFriends,
      updatePresence: true,
    });

    this.instance.use(Modules.AutoFriendAccept, {});
    this.instance.use(Modules.AutoFriendAdd, {});

    await this.instance.start();

    console.log(
      `Friend Connect started: ${this.instance.host.profile?.gamertag}`
    );

    this.instance.on("friendAdded", (player) => {
      const { profile } = player;

      console.log(`Friend added: ${profile?.gamertag}`);
    });
    this.instance.on("playerLeave", (player) => {
      const { profile } = player;

      console.log(`Player redirected: ${profile?.gamertag}`);
    });
  }
}
