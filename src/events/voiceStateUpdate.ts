// src/events/voiceStateUpdate.ts
import { VoiceState, Client, TextChannel } from "discord.js";
import { TARGET_VOICE_CHANNEL_ID, NOTIFICATION_CHANNEL_ID } from "../config";

export default (client: Client) => {
  client.on(
    "voiceStateUpdate",
    async (oldState: VoiceState, newState: VoiceState) => {
      // 対象のボイスチャンネル以外は無視
      if (
        newState.channelId !== TARGET_VOICE_CHANNEL_ID &&
        oldState.channelId !== TARGET_VOICE_CHANNEL_ID
      ) {
        return;
      }

      const notificationChannel = await client.channels.fetch(
        NOTIFICATION_CHANNEL_ID!
      );
      if (!notificationChannel?.isTextBased()) {
        console.error(
          "通知チャンネルが見つからないか、テキストチャンネルではありません。"
        );
        return;
      }

      const member = newState.member || oldState.member;
      if (!member) return;

      const notificationChannelText = notificationChannel as TextChannel;

      // 入室
      if (
        !oldState.channelId &&
        newState.channelId === TARGET_VOICE_CHANNEL_ID
      ) {
        notificationChannelText.send(`${member.displayName} が入室しました。`);
      }

      // 退室
      if (
        oldState.channelId === TARGET_VOICE_CHANNEL_ID &&
        !newState.channelId
      ) {
        notificationChannelText.send(`${member.displayName} が退室しました。`);
      }

      // 移動 (同じチャンネルIDの場合は無視)
      if (
        oldState.channelId === TARGET_VOICE_CHANNEL_ID &&
        newState.channelId === TARGET_VOICE_CHANNEL_ID &&
        oldState.sessionId !== newState.sessionId
      ) {
        // ユーザーがミュートやスピーカーの状態を変えた場合など、sessionId が変わることがある
        return;
      }
    }
  );
};
