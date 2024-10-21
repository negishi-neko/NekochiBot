import { ndnDice } from "../commands/utils/dice.mjs"



export default async(message) => {
  if (message.content.match(/ぽてと|ポテト|じゃがいも|ジャガイモ|🥔|🍟/)) {
    await message.react("🥔");
  }
  
  if (message.content.match(/にゃん|にゃーん|にゃ～ん/)) {
    await message.reply("にゃ～ん");
  }
  
  if (message.content.match(/^\d+d\d+$/)) {
    await message.reply(ndnDice(message.content));
  }
  
  // 安場 bot
  if (message.content.match(/やすば|やすちん|安場悠斗|やっすん|安場/)) {
    const res = ["なにぃ？", "今集中しててんけど。", "言ってくれれば工具貸したのに。", "夜勤やから無理。"];
    const choice = res[Math.floor(Math.random() * res.length)];
    await message.reply(choice);
  }
};
