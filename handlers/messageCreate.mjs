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

  // 安場 bot
  if (message.content.match(/やすば|やすちん|安場悠斗|やっすん|安場/)) {
    const res = [
      "なにぃ？",
      "今集中しててんけど。",
      "言ってくれれば工具貸したのに。",
      "夜勤やから無理。",
      "聞こえてるから、そんなでかい声出すなよ。",
      "はぁ？ それくらい自分でなんとかしろよ。",
      "興味ねぇし。",
      "お前のせいで、集中できんやろ。",
      "前川さぁ.....",
      "マジでどうてもいい",
      "(無視)",
    ];
    const choice = res[Math.floor(Math.random() * res.length)];
    await message.reply(choice);
  }
};
