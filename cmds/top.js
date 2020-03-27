module.exports.run = (msg, args) => {
  const prompt = {
    type: "top",
    count: 10,
    name: "звёздам",
    output: ""
  };
  if (args.length) {
    if (args[0] == "cp") {
      prompt.type = "creators";
      prompt.name = "очкам создания";
    }
    if (args.length == 2) {
      let n = Number(args[1]);
      if (n != NaN) {
        if (n < 1) {
          prompt.count = 10;
        } else if (n > 10) {
          prompt.count = 100;
        } else {
          prompt.count = n * 10;
        }
      }
    }
  }
  client.login().then(async () => {
    const top = await api.tops.get(prompt);
    for (let n = 0; n < 10; n++) {
      let obj = top[prompt.count - 10 + n];
      prompt.output += `${obj.top}. ${obj.nick}, AID: ${obj.accountID}.\n`;
    }
    msg.channel.send(
      new RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Топ по ${prompt.name}.`)
        .addField(`Страница ${prompt.count / 10}.`, prompt.output)
    );
  });
};
