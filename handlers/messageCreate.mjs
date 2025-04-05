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
  if (
    message.content.match(/やすば|やすちん|安場悠斗|やっすん|安場|武蔵新城/)
  ) {
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
      "俺、貯金700万以上あるから。",
      "貯金貯まって一括で車買えるねんけど、車種何がいいと思う？",
      "恋愛？今はいいわ。",
      "付き合ってたけど、何も覚えてない。",
      "彼女がいたこともあるけど、何も覚えてない。",
      "前川いらんことしすぎ。(実際前ちゃんは何もやってない)",
      "今年は帰省する？",
      "ハァ〜ねむい。うるさい。",
      "(ライブハウスで音うるさすぎて不機嫌になり耳栓をつける)",
      "いいから勉強しろよ、お前のせいで卒研進まんやろ",
    ];
    const choice = res[Math.floor(Math.random() * res.length)];
    await message.reply(choice);
  }
};
