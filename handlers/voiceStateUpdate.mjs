import { EmbedBuilder } from "discord.js";

import Notification from "../models/notification.mjs";

export default async (oldState, newState) => {
  if (newState.channelId != null && oldState.channelId == null) {
    // 入室処理
    const title = `<#${newState.channel.id}> で通話を開始しました！`;
    await sendNotification(
      newState.member,
      newState.channel.id,
      newState.channel.id,
      newState.guild.id,
      0x5cb85c,
      title
    );
  } else if (oldState.channelId != null && newState.channelId == null) {
    // 退出処理
    const title = `<#${oldState.channel.id}> から退出しました`;
    await sendNotification(
      oldState.member,
      oldState.channel.id,
      oldState.channel.id,
      oldState.guild.id,
      0xff6347,
      title
    );
  }
};

// 通知を送信する関数
async function sendNotification(
  member,
  channelId,
  voiceChannelId,
  guildId,
  color,
  title
) {
  const notifications = await Notification.findAll({
    where: {
      guildId: guildId,
      voiceChannelId: voiceChannelId,
    },
  });

  const embed = new EmbedBuilder()
    .setColor(color)
    .setAuthor({
      name: member.displayName,
      iconURL: member.displayAvatarURL(),
    })
    .setTitle(title)
    .setTimestamp();

  await Promise.all(
    notifications.map(async (n) => {
      const channel = await member.guild.channels.fetch(n.textChannelId);
      await channel.send({ embeds: [embed] });
    })
  );
}
