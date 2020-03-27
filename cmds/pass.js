module.exports.run = (msg, args) => {
  if (args.length) {
    if (Number(args[0])) {
      client.login().then(async () => {
        const lvl = await api.levels.getById({ levelID: args[0] });
        console.log(lvl)
        let mess = "";
        switch (lvl.password) {
          case 0:
            mess = "Уровень не копируется";
            break;
          case 1:
            mess = "Уровень без пароля";
            break;
          default:
            mess = "Пароль от уровня: " + lvl.password.toString();
            break;
        }
        msg.channel.send(
          new RichEmbed()
            .setColor("RANDOM")
            .addField("Уровень: " + lvl.name + ".", mess + ".")
        );
      });
    } else {
      msg.channel.send(
        new RichEmbed()
          .setColor("RANDOM")
          .addField("Произошла ошибка.", "АйДи уровня должно быть числом.")
      );
    }
  } else {
    msg.channel.send(
      new RichEmbed()
        .setColor("RANDOM")
        .addField("Произошла ошибка.", "Введите АйДи уровня.")
    );
  }
};
