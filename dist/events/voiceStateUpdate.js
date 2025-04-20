"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
exports.default = (client) => {
    client.on("voiceStateUpdate", async (oldState, newState) => {
        // 対象のボイスチャンネル以外は無視
        if (newState.channelId !== config_1.TARGET_VOICE_CHANNEL_ID &&
            oldState.channelId !== config_1.TARGET_VOICE_CHANNEL_ID) {
            return;
        }
        const notificationChannel = await client.channels.fetch(config_1.NOTIFICATION_CHANNEL_ID);
        if (!notificationChannel?.isTextBased()) {
            console.error("通知チャンネルが見つからないか、テキストチャンネルではありません。");
            return;
        }
        const member = newState.member || oldState.member;
        if (!member)
            return;
        const notificationChannelText = notificationChannel;
        // 入室
        if (!oldState.channelId &&
            newState.channelId === config_1.TARGET_VOICE_CHANNEL_ID) {
            notificationChannelText.send(`${member.displayName} が入室しました。`);
        }
        // 退室
        if (oldState.channelId === config_1.TARGET_VOICE_CHANNEL_ID &&
            !newState.channelId) {
            notificationChannelText.send(`${member.displayName} が退室しました。`);
        }
        // 移動 (同じチャンネルIDの場合は無視)
        if (oldState.channelId === config_1.TARGET_VOICE_CHANNEL_ID &&
            newState.channelId === config_1.TARGET_VOICE_CHANNEL_ID &&
            oldState.sessionId !== newState.sessionId) {
            // ユーザーがミュートやスピーカーの状態を変えた場合など、sessionId が変わることがある
            return;
        }
    });
};
