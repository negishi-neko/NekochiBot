"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const voiceStateUpdate_1 = __importDefault(require("./events/voiceStateUpdate"));
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildVoiceStates,
    ],
});
async function initialize() {
    try {
        // 環境変数の読み込み
        dotenv_1.default.config();
        // Bot の準備完了イベント
        client.on("ready", () => {
            console.log(`${client.user?.tag} がログインしました！`);
        });
        // ボイスチャンネルの入退室イベントを登録
        (0, voiceStateUpdate_1.default)(client);
        // Discord Bot へのログイン
        await client.login(process.env.TOKEN);
        console.log("Bot がログインしました！");
    }
    catch (error) {
        console.error("アプリの初期化中にエラーが発生しました:", error);
    }
}
// アプリの初期化を実行
initialize();
