const http = require("http"),
  express = require("express"),
  app = express();
app.get("/", (request, res) => {
  const msg = request.query.message;
  switch (request.query.request) {
    case "bot":
      res.send('OK');
      console.log(new Date() + " пинг получен.");
    case "bug":
      if (msg != "null") {
        res.redirect("http://gdfs-bot.glitch.me/?request=s&type=bug");
bot.channels.get("682636438172467201").send(
          new RichEmbed()
            .setColor("RANDOM")
            .addField("Баг репорт.", msg.toString())
            .setTimestamp()
        );
      } else {
        res.sendFile(__dirname + "/web/bug.html");
      }
      break;
    case "idea":
      if (msg != "null") {
        res.redirect("http://gdfs-bot.glitch.me/?request=s&type=idea");
        bot.channels.get("682636396690669613").send(
          new RichEmbed()
            .setColor("RANDOM")
            .addField("Идея.", msg.toString())
            .setTimestamp()
        );
      } else {
        res.sendFile(__dirname + "/web/idea.html");
      }
      break;
    case "s":
      let html = `<!DOCTYPE html>
<html>
	<head>
		<title>GDFS Bot site.</title>
		<meta charset="UTF-8"/>
		<meta http-equiv="Content-Type" content="text/html;"/>
		<meta name="description" content="Официальный сайт бота GDFS сервера."/>
		<meta name="keywords" content="GDFS GD DISCORD BOT NODE.JS"/>
	</head>
	<body align='center'><h1>`,
        html2 =
          '<a href="http://gdfs-bot.glitch.me/">На главную.</a></h1></body></html>';
      switch (request.query.type) {
        case "idea":
          res.send(
            html +
              "Ваша идея была отправлена. Если она плохая её проигнорируют. Если она хорошая то её добавят." +
              html2
          );
          break;
        case "bug":
          res.send(
            html +
              "Ваш баг репорт был отправлен. Если такого бага нет его проигнорируют. Если такой баг существует он будет пофикшен." +
              html2
          );
          break;
        default:
          res.redirect("http://gdfs-bot.glitch.me/");
          break;
      }
    /*case "Wmfd2893gb7":
      res.sendFile(__dirname + "/web/hM.html");
      break;*/
    default:
      res.sendFile(__dirname + "/web/index.html");
      break;
  }
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const { RichEmbed, Client } = require("discord.js");
const GDClient = require("geometry-dash-api");
global.RichEmbed = RichEmbed;
global.bot = new Client();
global.client = new GDClient({
  server: 'http://litesrve.ru/gdfs/srve/data',
  userName: process.env.UN,
  password: process.env.PW
});
const { api } = client,
  cmds = ["user", "eval", "restart", "help", "about", "top", "cnvs", "pass"],
  del = id => {
    cD.delete(id);
  };
global.api = api;
let cD = new Map();
bot.login(process.env.TOKEN);
bot.on("ready", () => {
  bot.user.setPresence({ game: { name: "GDFS | F#help", type: 0 } });
});
bot.on("message", msg => {
  if (!msg.author.bot) {
    if (msg.content.startsWith("F#") || msg.content.startsWith("f#")) {
      const args = msg.content
          .toLowerCase()
          .trim()
          .split(/ +/g),
        req = args.shift().slice(2);
      if (cmds.includes(req)) {
        if (cD.has(msg.author.id)) {
          const delM = m => {
            m.delete();
          };
          msg.channel
            .send(
              new RichEmbed()
                .setColor("RANDOM")
                .addField(
                  "Пожалуйста подождите чуть-чуть.",
                  "Длительность кулдауна 5 секунд."
                )
            )
            .then(msg => {
              setTimeout(delM, 2500, msg);
            });
        } else {
          cD.set(msg.author.id, setTimeout(del, 5000, msg.author.id));
          require("./cmds/" + req + ".js").run(msg, args);
        }
      }
    }
  }
});
