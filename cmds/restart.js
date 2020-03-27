module.exports.run = async (msg, args) => {
  if (
    msg.author.id == "676128096927350805" ||
    msg.guild.member(msg.author.id).roles.has("681101265350295558")
  ) {
    await msg.channel.send(
      new RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Перезагрузка бота.")
        .setFooter(msg.author.tag, msg.author.avatarURL)
        .setTimestamp()
    );
    process.exit(1);
  } else {
    msg.channel.send(
      new RichEmbed()
        .setColor("RANDOM")
        .addField("Произошла ошибка.", "У вас нет прав использовать команду.")
    );
  }
};
