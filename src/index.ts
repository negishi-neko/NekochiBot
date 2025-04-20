import { GatewayIntentBits, Client } from "discord.js";
import dotenv from "dotenv";
import voiceStateUpdateEvent from "./events/voiceStateUpdate";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

async function initialize() {
  try {
    // 環境変数の読み込み
    dotenv.config();

    // Bot の準備完了イベント
    client.on("ready", () => {
      console.log(`${client.user?.tag} がログインしました！`);
    });

    // ボイスチャンネルの入退室イベントを登録
    voiceStateUpdateEvent(client);

    // Discord Bot へのログイン
    await client.login(process.env.TOKEN);
    console.log("Bot がログインしました！");
  } catch (error) {
    console.error("アプリの初期化中にエラーが発生しました:", error);
  }
}

// アプリの初期化を実行
initialize();
