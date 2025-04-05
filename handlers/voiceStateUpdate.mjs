import { EmbedBuilder } from "discord.js";
import Notification from "../models/notification.mjs";

// ユーザーごとの勉強開始時間を保持するオブジェクト
const studySessions = {};

export default async (oldState, newState) => {
  if (newState.channelId != null && oldState.channelId == null) {
    // 既に同じユーザが別端末で入っている場合などは何もせず抜ける
    if (studySessions[newState.member.id] != null) return;

    // 入室処理 - 勉強開始時刻を記録
    const startTime = new Date(); // 現在時刻を取得
    studySessions[newState.member.id] = startTime; // ユーザーIDをキーに開始時刻を保存

    const title = `${newState.member.displayName} が勉強を開始しました！`;
    const embedBuilderColor = 0x5cb85c;
    await sendNotification(
      newState.member,
      newState.channel.id,
      newState.guild.id,
      embedBuilderColor,
      title
    );
  } else if (oldState.channelId != null && newState.channelId == null) {
    // 退出処理 - 勉強時間を計算
    const endTime = new Date(); // 現在時刻を取得
    const startTime = studySessions[oldState.member.id]; // 勉強開始時刻を取得

    if (startTime) {
      const studyDuration = Math.floor((endTime - startTime) / 1000 / 60); // 勉強時間を分単位で計算
      delete studySessions[oldState.member.id]; // 勉強時間を記録したら削除

      const title = `${
        newState.member.displayName
      } が勉強を終了しました - 勉強時間: ${studyDuration} 分\n${comment(
        studyDuration
      )}`;
      const embedBuilderColor = 0xff6347;
      await sendNotification(
        oldState.member,
        oldState.channel.id,
        oldState.guild.id,
        embedBuilderColor,
        title
      );
    }
  }
};

// 通知を送信する関数
async function sendNotification(member, voiceChannelId, guildId, color, title) {
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

// コメントを返す関数;
function comment(studyDuration) {
  let comment = "";
  switch (true) {
    case studyDuration >= 240:
      comment = "すごすぎるって...";
      break;
    case studyDuration >= 120:
      comment = "集中力の鬼！";
      break;
    case studyDuration >= 60:
      comment = "頑張ってるな！ゆっくり休んで！";
      break;
    case studyDuration >= 30:
      comment = "頑張ってるから、ねこちからおやつをあげよう";
      break;
    case studyDuration >= 20:
      comment = "小学校の昼休みの時間を丸々勉強したんか！すごい！";
      break;
    case studyDuration >= 10:
      comment = "今日も積み上げナイス！成長してる！";
      break;
    case studyDuration >= 3:
      comment =
        "これを毎日積み重ねられるかどうかが大事やねん、ナイス！お疲れ！";
      break;
    default:
      comment = "お疲れ様！";
  }
  return comment;
}
