"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOTIFICATION_CHANNEL_ID = exports.TARGET_VOICE_CHANNEL_ID = exports.TOKEN = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.TOKEN = process.env.TOKEN;
exports.TARGET_VOICE_CHANNEL_ID = process.env.TARGET_VOICE_CHANNEL_ID;
exports.NOTIFICATION_CHANNEL_ID = process.env.NOTIFICATION_CHANNEL_ID;
if (!exports.TOKEN || !exports.TARGET_VOICE_CHANNEL_ID || !exports.NOTIFICATION_CHANNEL_ID) {
    console.error("環境変数 BOT_TOKEN, TARGET_VOICE_CHANNEL_ID, NOTIFICATION_CHANNEL_ID が設定されていません。");
    process.exit(1);
}
