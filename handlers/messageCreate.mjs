export default async (message) => {
  if (message.content.match(/ぽてと|ポテト|じゃがいも|ジャガイモ|🥔|🍟/)) {
    await message.react("🥔");
  }

  if (message.content.match(/にゃん|にゃーん|にゃ～ん/)) {
    await message.reply("にゃ～ん");
  }

  if (message.content.match(/褒めて/)) {
    await message.reply("すごい！");
  }
};
