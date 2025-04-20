import dotenv from "dotenv";
dotenv.config();

export const TOKEN = process.env.TOKEN;
export const TARGET_VOICE_CHANNEL_ID = process.env.TARGET_VOICE_CHANNEL_ID;
export const NOTIFICATION_CHANNEL_ID = process.env.NOTIFICATION_CHANNEL_ID;

if (!TOKEN || !TARGET_VOICE_CHANNEL_ID || !NOTIFICATION_CHANNEL_ID) {
  console.error(
    "環境変数 BOT_TOKEN, TARGET_VOICE_CHANNEL_ID, NOTIFICATION_CHANNEL_ID が設定されていません。"
  );
  process.exit(1);
}
