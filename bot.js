const Discord = require('discord.js');
var request = require("request");
var cheerio = require("cheerio");
var logger = require('winston');

var auth = require('./auth.json');
var file = require("./file/file.js");
var base = require('./file/base.json');

var TRN = require('./r6/r6');
var embed = require('./r6/embed.js');
var record = require('./r6/r6_record');




//--------- discord.js initialize ---------//

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, { colorize: true });
logger.level = "debug";


// Initialize Discord Bot
const bot = new Discord.Client();
bot.login(auth.token);


// Event area
bot.on('ready', () => {
  logger.info("Connected");
  logger.info("Logged in as: ");
  logger.info(bot.user.tag + bot.user);
  console.log(`Logged in as ${bot.user.tag}`);
  bot.user.setPresence({ activity: { name: `+help | Drive : ${file.list_drive()}` }, status: 'online' });
  console.log(`Drive : ${file.list_drive()}`)
});


// Bot auto reconnect
bot.on('disconnect', message => {
  console.log(file.dateSet() + " Bot Disconnected");
  process.exit(1);
});

bot.on('reconnecting', message => {
  console.log(file.dateSet() + " Bot Reconnecting");
});

bot.on('resume', message => {
  console.log(file.dateSet() + " Bot Connected");
});

bot.on('error', err => {
  console.log(file.dateSet() + " Bot Error");
  console.error(err)
  process.exit(1);
});

//-----------------------------------------//


//record uptime
var uptime = new Date();


//學測倒數計時器
bot.on('ready', message => {
  setInterval(function () {
    bot.channels.cache.get("730233116475654204").setName(file.exam());
    bot.user.setPresence({ activity: { name: `+help | Drive : ${file.list_drive()}` }, status: 'online' });
  }, 600000)
})


setInterval(function () {

  var Today = new Date();
  var clock_hours = Today.getUTCHours();
  var clock_weekday = Today.getUTCDay();
  var clock_minutes = Today.getUTCMinutes();

  var hours = 13 - clock_hours;
  var minutes = 60 - clock_minutes;
  var weekdays = 7 - clock_weekday;

  if (clock_weekday === 3 && clock_hours === 13) { // 星期三 2100
    bot.channels.cache.get('725045894466109471').send(consoleLog = file.third(minutes))
    file.write('EZR', consoleLog)
    return;
  }
  else if (clock_weekday === 0 && clock_hours === 13) { // 星期日 2100
    bot.channels.cache.get('725045894466109471').send(consoleLog = file.third(minutes))
    file.write('EZR', consoleLog)
    return;
  }
}, 1500000)


bot.on('message', message => {

  var userSet = message.author.username;

  var args = message.content.toUpperCase().split(' ');
  var cmd = args[0];


  var comment_MESSAGE = message.content.split(' ');
  var r6_name = message.content.split(' ')



  for (i = 0; i <= base.ban.length; ++i) {
    if (message.content.indexOf("```⚠️由于此讯息不符合南投国田家安全法规，已被屏蔽。```") > -1) {
      break;
    }
    else if (message.content.indexOf(base.ban[i]) > -1) {
      message.channel.send("```⚠️由于此讯息不符合南投国田家安全法规，已被屏蔽。```")
      message.delete()
      break;
    }
  }


  switch (cmd) {
    case "EZR晚餐吃什麼":
      message.channel.send(consoleLog = file.food());
      file.write(userSet, consoleLog)
      break;

    case "EZR你覺得呢":
      message.channel.send(consoleLog = file.howFeel());
      file.write(userSet, consoleLog)
      break;

    case "EZR你說是不是":
      message.channel.send(consoleLog = file.yesNo());
      file.write(userSet, consoleLog)
      break;

    case "今天要不要尻一發":
      message.channel.send(consoleLog = file.nutTime());
      file.write(userSet, consoleLog)
      break;

    case "EZR":
      message.channel.send(consoleLog = file.dcGif());
      file.write(userSet, consoleLog)
      break;

    case "EZR早安":
      message.reply(consoleLog = "早安")
      file.write(userSet, consoleLog)
      break;

    case "EZR你好棒":
      message.channel.send(consoleLog = "喵傲嗚");
      file.write(userSet, consoleLog)
      break;

    case "EZR你真的很G8":
      message.channel.send(consoleLog = "我知道");
      file.write(userSet, consoleLog)
      break;

    case "蛤":
      message.channel.send(consoleLog = "虫合");
      file.write(userSet, consoleLog)
      break;

    case "我也沒有啊":
      message.channel.send(consoleLog = "<@638728761357107205>啊我的術師匠呢?");
      file.write(userSet, consoleLog)
      break;

    case "浪漫DUKE":
      message.channel.send({
        files: [{ attachment: './file/picture/duck.png' }]
      })
      console.log(file.printSet(userSet, '浪漫duke'));
      break;

    case "今晚我想來點":
      var order = file.DBD()
      consoleLog = order
      message.channel.send(order[0]);
      message.channel.send({
        files: [{ attachment: order[1] }]
      })//.then(console.log).catch(console.error);
      file.write(userSet, consoleLog)
      break;

    case "WORD":
      message.channel.send(consoleLog = file.words(userSet));
      file.write(userSet, consoleLog)
      break;
    //--------- instruction ---------//
    case "+WINSTON":
      message.channel.send(consoleLog = file.record());
      file.write(userSet, 'system log');
      break;

    case "+HELP":
      message.channel.send(consoleLog = file.help());
      file.write(userSet, 'help');
      break;

    case "+UPTIME":
      message.channel.send(consoleLog = file.uptime(uptime));
      //file.write(userSet, consoleLog)
      break;

    case "+EXAM":
      message.channel.send(consoleLog = file.exam());
      console.log(file.printSet(userSet, consoleLog));
      break;

    case "+PING":
      message.channel.send(consoleLog = `Ping : ${bot.ws.ping}ms.`);
      file.write(userSet, consoleLog);
      break;
    //-------------------------------//
    case "EZR開車":
      message.channel.send(consoleLog = file.book_1());
      file.write(userSet, consoleLog);
      break;

    case "DRIVE":
      message.channel.send(consoleLog = file.drive());
      file.write(userSet, consoleLog);
      break;

    case "+FAVORITE":
      message.channel.send("", { files: ["./file/FileBase/favorite.txt"] });
      file.write(userSet, 'favorite download');
      break;

    case "BOOK":
      var bookCheck = file.bookCheck(args[1]);

      if (bookCheck === 1) {
        message.channel.send(consoleLog = file.link(args[1]));
        file.write(userSet, consoleLog)

        var driveCheck = file.driveCheck(args[1]);
        if (driveCheck == 1) {
          file.favorite(args[1])
          bot.user.setPresence({ activity: { name: `+help | Drive : ${file.list_drive()}` }, status: 'online' });
          console.log(`Drive : ${file.list_drive()}`)
          message.react('👍')
        }
      }
      else {
        message.channel.send(`靈車警告 // ${args[1]}\n||${file.link(args[1])}||`);
        file.write(userSet, `靈車警告 // ${args[1]}`)
      }
      break;

    case "REPORT":
      var bookCheck = file.bookCheck(args[1]);
      console.log(typeof (args[1]))
      var bad = Number(args[1])

      if (parseFloat(bad).toString() != "NaN" && parseFloat(bad).toString() != 0) {
        console.log(typeof (bad))

        if (bookCheck == 1) {
          file.report(args[1]);//寫入badcar.txt
          message.react('👎')
          file.write(userSet, 'report : ' + bad)
        }
      }
      else {
        console.log(typeof (bad))
        file.write(userSet, 'report wrong : ' + bad)
      }
      break;

    case "-":
      base.reserve = message.content.replace("-", "");//write to base.json
      consoleLog = 'INPUT >> ' + base.reserve
      file.write(userSet, consoleLog)
      break;

    case "&":
      message.channel.send(consoleLog = base.reserve);
      file.write(userSet, 'OUTPUT >> ' + consoleLog)
      message.delete({ timeout: 100 })
      base.reserve = "";
      break;

    case "00":
      bot.channels.cache.get('724167102319034428').send(tracker.speak())
      //message.guild.channels.cache.get('642724792742445061').setName("Testing");
      //message.guild.channels.find("name", "general").setName("Testing");
      //bot.channels.cache.get('724167102319034428').send('Hello here!')
      /*
            message.channel.get('642724792742445061').setName('not_general')
              .then(newChannel => console.log(`Channel's new name is newChannel.name`))
              .catch(console.error);
      */
      //message.channel.send(consoleLog = );
      //file.write(userSet, consoleLog)
      /*
      var id = message.id
      console.log(id)
      message.react('👍');
      */
      /*
      message.reply("Your stuff").then(sent => { // 'sent' is that message you just sent
        let id = sent.id;
        console.log(id);
      })*/
      //message.delete({ timeout: 0 })
      //message.channel.send("Testing message.", { files: ["./file/FileBase/favorite.txt"] });

      break;






    //----------------- R6 Tracker -----------------//

    case '+R':
      R6_request(r6_name[1], args[2], message.channel.id)
      //message.channel.send(R6_request(r6_name[1], args[2],message.channel.id))
      break;
  }
});










function R6_request(r6name, type, id) {


  let tracker = [];
  let newTracker = [];
  let url = `https://r6.tracker.network/profile/pc/${r6name}`;


  request(url, function (error, response, body) {
    if (!error) {
      //console.log(body)
      var $ = cheerio.load(body);

      $('#profile .trn-defstat__value').each(function (i, elem) {
        tracker.push($(this).text().split('\n'))
      })

      for (i = 0; i < tracker.length; ++i) {
        newTracker[i] = TRN.filterArray(String(tracker[i]).split(','))
      }

      let imgurl = $('img').map(function () {
        return $(this).attr('src')
      });//console.log(imgurl.toArray());
      var header = imgurl.toArray()[0];
      //var rank_img = imgurl.toArray()[4];

      TRN.R6_record(header, r6name, url, newTracker);
    }
    else {
      console.log("擷取錯誤：" + error);
    }
    bot.channels.cache.get(id).send(TRN.R6_type(type, r6name, newTracker))
  });
}
