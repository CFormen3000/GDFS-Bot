module.exports.run = (msg, args) => {
  if (args.length) {
    client.login().then(async () => {
      let u = await api.users.getByNick(args[0]);
      if (!u) {
        u = await api.users.getById(args[0]);
      }
      if (!u) {
        msg.channel.send(
          new RichEmbed()
            .setColor("RANDOM")
            .addField("Произошла ошибка.", "Аккаунт не обнаружен.")
        );
      } else {
        switch (u.rights) {
          case 0:
            u.rights = "пользователя";
            break;
          case 1:
            u.rights = "модератора";
            break;
          case 2:
            u.rights = "старшего модератора";
            break;
        }
        if (!u.top) {
          u.top = "Аккаунт забанен.";
        } else {
          u.top = "Место в топе: " + u.top.toString() + ".";
        }
        let links = "";
        if (!u.youtube) {
          links = "Ютуб отсутствует.\n";
        } else {
          links = `[Ютуб.](${u.youtube})\n`;
        }
        if (!u.twitter) {
          links += "Твиттер отсутствует.\n";
        } else {
          links += `[Твиттер.](${u.twitter})\n`;
        }
        if (!u.twitch) {
          links += "Твитч отсутствует.\n";
        } else {
          links += `[Твитч.](${u.twitch})`;
        }
        msg.channel.send(
          new RichEmbed()
            .setColor("RANDOM")
            .setAuthor(`Профиль ${u.rights} "${u.nick}".`)
            .addField(
              "Статистика.",
              u.top +
                `\nЗвёзд: ${u.stars}.\nАлмазов: ${u.diamonds}.\nМонет: ${u.coins}.\nПользовательских монет: ${u.userCoins}.\nДемонов: ${u.demons}.\nОЧКОв создания: ${u.creatorPoints}.\nАйди пользователя: ${u.userID}.\nАйди аккаунта: ${u.accountID}.`
            )
            .addField("Ссылки.", links)
            .setFooter(msg.author.tag, msg.author.avatarURL)
            .setTimestamp()
        );
      }
    });
  } else {
    msg.channel.send(new RichEmbed().setColor('RANDOM').addField('Произошла ошибка.', 'Введите ник или айди пользователя или айди аккаунта.'));
  };
};
