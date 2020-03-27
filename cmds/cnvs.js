module.exports.run = (msg, args) => {
  if (msg.author.id == "676128096927350805") {
    try {
      client.login().then(async () => {
        const s = await api.levels.getDaily()
        console.log(s)
      });
    } catch(e) {
        msg.channel.send(e.message);
      
    }
  } else {
    let rTxt = "Тестовая команда доступна только создателю бота.";
    switch (Math.floor(Math.random() * (2 - 0 + 1)) + 0) {
      case 0:
        rTxt = "Вы кто такие? Я вас не звал. Идите нахуй.";
        break;
      case 1:
        rTxt =
          "А я не понял, что вы делаете в моём тестовой команде? Вы хотите ошибок?";
        break;
    }
    msg.channel.send(
      new RichEmbed().setColor("RANDOM").addField("Произошла ошибка.", rTxt)
    );
  }
};
