// src/events/voiceStateUpdate.ts
import { VoiceState, Client, TextChannel } from "discord.js";
import { TARGET_VOICE_CHANNEL_ID, NOTIFICATION_CHANNEL_ID } from "../config";
import { formatDuration } from "../utils";

// ユーザーごとの入室時刻を保存するオブジェクト
const userEntryTimes: { [userId: string]: Date } = {};

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
        userEntryTimes[member.id] = new Date(); // 入室時刻を保存
        notificationChannelText.send(`${member.displayName} が入室しました。`);
      }

      // 退室
      if (
        oldState.channelId === TARGET_VOICE_CHANNEL_ID &&
        !newState.channelId
      ) {
        const entryTime = userEntryTimes[member.id];

        if (!entryTime) {
          // 入室記録がない場合 (Bot起動中に既に入室していたなど)
          notificationChannelText.send(
            `${member.displayName} が退室しました。（入室時刻の記録なし）`
          );
          return;
        }

        const exitTime = new Date();
        const duration = exitTime.getTime() - entryTime.getTime(); // 滞在時間 (ミリ秒)
        delete userEntryTimes[member.id]; // 退室したので記録を削除

        const formattedDuration = formatDuration(duration); // formatDuration 関数を呼び出す
        notificationChannelText.send(
          `${member.displayName} が退室しました。\n滞在時間: ${formattedDuration}`
        );
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
