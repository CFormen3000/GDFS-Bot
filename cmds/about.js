module.exports.run = (msg, args) => {
  msg.channel.send(
    new RichEmbed()
      .setColor("RANDOM")
      .addField(
        "Информация о боте.",
        'Бот и сайт для него сделан энтузиастом Клинтом (||<@676128096927350805>||), специально для сервера "Geometry Dash Freedom Server [GDFS]".'
      )
      .addField(
        "Контактная информация.",
        "[Сайт бота](http://gdfs-bot.glitch.me/)."
      )
      .setFooter(
        "Powered by Glitch.",
        "https://oldsss.7m.pl/2bdfb3f8-05ef-4035-a06e-2043962a3a13_logo-day.png"
      )
      .setTimestamp()
  );
};
