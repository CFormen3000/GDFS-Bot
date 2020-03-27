module.exports.run = async (msg, args) => {
  if (
    msg.author.id == "676128096927350805" || msg.guild.member(msg.author.id).roles.has("681101265350295558")
  ) {
    const clean = text => {
      if (typeof text === "string") {
        return text
          .replace(/`/g, "`" + String.fromCharCode(8302))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      } else {
        return text;
      }
    };
    try {
      if (args.length != 0) {
        let input = args.join(" "),
          evalcode = await eval(input);
        if (typeof evalcode !== "string") {
          evalcode = require("util").inspect(evalcode);
          msg.channel.send(
            new RichEmbed()
              .setColor("RANDOM")
              .addField("Получено.", `**${input}**`)
              .addField("Вывод.", `**${clean(evalcode)}**`)
              .addField("Тип.", `**${typeof evalcode}**`)
              .setFooter(msg.author.tag, msg.author.avatarURL)
              .setTimestamp()
          );
        }
      } else {
        msg.channel.send(
          new RichEmbed().setColor("RANDOM").setAuthor("Пустой запрос.")
        );
      }
    } catch (e) {
      msg.channel.send(
        new RichEmbed()
          .setColor("RANDOM")
          .addField("Ошибка.", `**${clean(e)}**`)
          .setFooter(msg.author.tag, msg.author.avatarURL)
          .setTimestamp()
      );
    }
  } else {
    msg.channel.send(
      new RichEmbed()
        .setColor("RANDOM")
        .addField("Произошла ошибка.", "У вас нет прав использовать команду.")
    );
  }
};
