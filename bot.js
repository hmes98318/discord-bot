const Discord = require('discord.js');
var request = require("request");
var cheerio = require("cheerio");
var logger = require('winston');
var auth = require('./auth.json');
var file = require("./file/file.js");
var base = require('./file/base.json');




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
    bot.channels.cache.get("channelID").setName(file.exam());
    bot.user.setPresence({ activity: { name: `+help | Drive : ${file.list_drive()}` }, status: 'online' });
  }, 60)
})

//深淵結算剩餘時間 send to 崩三頻道  loop in every 10 minutes 
setInterval(function () {

  var Today = new Date();
  var clock_hours = Today.getUTCHours();
  var clock_weekday = Today.getUTCDay();
  var clock_minutes = Today.getUTCMinutes();

  var hours = 13 - clock_hours;
  var minutes = 60 - clock_minutes;
  var weekdays = 7 - clock_weekday;

  if (clock_weekday === 3 && clock_hours === 13) { // 星期三 2100
    bot.channels.cache.get('channelID').send(consoleLog = file.third(minutes))
    file.write('EZR', consoleLog)
    return;
  }
  else if (clock_weekday === 0 && clock_hours === 13) { // 星期日 2100
    bot.channels.cache.get('channelID').send(consoleLog = file.third(minutes))
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
      console.log(file.printSet(userSet, consoleLog));
      break;

    case "+HELP":
      message.channel.send(consoleLog = file.help());
      file.write(userSet, 'help')
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
      file.write(userSet, consoleLog)
      break;
    //-------------------------------//
    case "EZR開車":
      message.channel.send(consoleLog = file.book_1());
      file.write(userSet, consoleLog)
      break;

    case "DRIVE":
      message.channel.send(consoleLog = file.drive());
      file.write(userSet, consoleLog)
      break;

    case "+FAVORITE":
      message.channel.send("", { files: ["./file/FileBase/favorite.txt"] });
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
      base.reserve = message.content.replace("-","")//comment_MESSAGE //write to base.json
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
      //message.channel.send(message.content + '0');
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


    case '+R6':
      let tracker = []
      let newTracker = []

      if (args[1] == 'RANK') { //season ranked [42]-[53]  //(O)
        var url = `https://r6.tracker.network/profile/pc/${r6_name[2]}`;

        request(url, function (error, response, body) {
          if (!error) {
            //console.log(body)
            var $ = cheerio.load(body);

            $('#profile .trn-defstat__value').each(function (i, elem) {
              tracker.push($(this).text().split('\n'))
            })
            for (i = 0; i < tracker.length; ++i) {
              newTracker[i] = filterArray(String(tracker[i]).split(','))
            }

            let imgurl = $('img').map(function () {
              return $(this).attr('src')
            });//console.log(imgurl.toArray());
            var header = imgurl.toArray()[0]
            var rank_img = imgurl.toArray()[4]
            rank_img = `https://tabstats.com/images/r6/ranks/?rank=${RankImage(newTracker[51])}&champ=0`


            //r6 = `Ranked\n遊戲名稱: ${r6_name[2]}\n遊玩時數: ${newTracker[12]}\n勝率: ${newTracker[18]}\nK/D: ${newTracker[19]}\n每場均殺: ${newTracker[20]}`
            //header, user, url, win_percent, win, loss, kd, kill, death, killMatch, rank, mmr, rank_img
            message.channel.send(R6_Ranked_Embed(header, r6_name[2], url, newTracker[46], newTracker[47], newTracker[48], newTracker[42], newTracker[44], newTracker[45], newTracker[43], newTracker[51], String(newTracker[52]), rank_img))
          } else {
            console.log("擷取錯誤：" + error);
          }
        });
      }
      else if (args[1] == 'CASUAL') { //casual [32]-[41]  //(O)
        var url = `https://r6.tracker.network/profile/pc/${r6_name[2]}`;

        request(url, function (error, response, body) {
          if (!error) {
            //console.log(body)
            var $ = cheerio.load(body);

            $('#profile .trn-defstat__value').each(function (i, elem) {
              tracker.push($(this).text().split('\n'))
            })
            for (i = 0; i < tracker.length; ++i) {
              newTracker[i] = filterArray(String(tracker[i]).split(','))
            }

            let imgurl = $('img').map(function () {
              return $(this).attr('src')
            });//console.log(imgurl.toArray());
            var header = imgurl.toArray()[0]
            var rank_img = imgurl.toArray()[4]
            rank_img = `https://tabstats.com/images/r6/ranks/?rank=${RankImage(newTracker[62])}&champ=0`


            //header, user, url, timePlayed, win_percent, win, loss, kd, kill, death, killMatch, rank, mmr, rank_img
            message.channel.send(R6_Casual_Embed(header, r6_name[2], url, newTracker[32], newTracker[38], newTracker[33], newTracker[34], newTracker[39], newTracker[37], newTracker[36], newTracker[40], newTracker[62], String(newTracker[64]), rank_img))
            //file.write(userSet, consoleLog = 'R6 Ranked')
          } else {
            console.log("擷取錯誤：" + error);
          }
        });
      }
      else if (args[1] == 'HELP') {
        message.channel.send(R6_help())
        break;
      }
      else { //general [0]-[11]  //(X)
        var url = `https://r6.tracker.network/profile/pc/${r6_name[1]}`;

        request(url, function (error, response, body) {
          if (!error) {
            //console.log(body)
            var $ = cheerio.load(body);

            $('#profile .trn-defstat__value').each(function (i, elem) {
              tracker.push($(this).text().split('\n'))
            })

            for (i = 0; i < tracker.length; ++i) {
              newTracker[i] = filterArray(String(tracker[i]).split(','))
            }

            let imgurl = $('img').map(function () {
              return $(this).attr('src')
            });//console.log(imgurl.toArray());
            var header = imgurl.toArray()[0]


            //header, user, url, timePlayed, win_percent, win, loss, kd, death, handShot, handShots, meleeKills, blindKills 
            message.channel.send(R6_General_Embed(header, r6_name[1], url, newTracker[7], newTracker[6], newTracker[4], newTracker[5], newTracker[1], newTracker[2], newTracker[0], newTracker[3], newTracker[10], newTracker[11]))
          } else {
            console.log("擷取錯誤：" + error);
          }
        });
      }
      break;

  }

});




function filterArray(clearArray) {
  let index = -1,
    arrayLength = clearArray ? clearArray.length : 0,
    resIndex = -1,
    result = [];

  while (++index < arrayLength) {
    let value = clearArray[index];
    if (value != null && value !== '' && value !== undefined && value !== false && value !== 0 && value != ',') {
      result[++resIndex] = value;
    }
  }
  return result
}




function R6_Ranked_Embed(header, user, url, win_percent, win, loss, kd, kill, death, killMatch, rank, mmr, rank_img) {
  const trackerEmbed = new Discord.MessageEmbed()
    .setColor('#ff00ee')
    .setTitle(`Open ${user} R6 Tracker Profile`)
    .setURL(url)
    .setAuthor(user, header, url)
    .setDescription('Ranked')
    .setThumbnail(rank_img)
    .addFields(
      { name: 'Ranked', value: `**${rank}**`, inline: true },
      { name: 'MMR', value: `**${mmr}**`, inline: true },
      { name: '\u200B', value: '\u200B' },
      { name: 'Win/Loss', value: `**${win_percent}**\nWin **${win}**\nLoss **${loss}**`, inline: true },
      { name: 'K/D', value: `**${kd}**\nKill **${kill}**\nDeath **${death}**`, inline: true },
      { name: 'Kill/Match', value: `**${killMatch}**`, inline: true },
    )
    .setTimestamp()
    .setFooter('', url);

  return trackerEmbed
}

function R6_Casual_Embed(header, user, url, timePlayed, win_percent, win, loss, kd, kill, death, killMatch, rank, mmr, rank_img) {
  const trackerEmbed = new Discord.MessageEmbed()
    .setColor('#ff00ee')
    .setTitle(`Open ${user} R6 Tracker Profile`)
    .setURL(url)
    .setAuthor(user, header, url)
    .setDescription('Casual')
    .setThumbnail(rank_img)
    .addFields(
      { name: 'Ranked', value: `**${rank}**`, inline: true },
      { name: 'MMR', value: `**${mmr}**`, inline: true },
      { name: 'Time Played', value: `**${timePlayed}**`, inline: true },

      { name: '\u200B', value: '\u200B' },
      { name: 'Win/Loss', value: `**${win_percent}**\nWin **${win}**\nLoss **${loss}**`, inline: true },
      { name: 'K/D', value: `**${kd}**\nKill **${kill}**\nDeath **${death}**`, inline: true },
      { name: 'Kill/Match', value: `**${killMatch}**`, inline: true },
    )
    .setTimestamp()
    .setFooter('', url);

  return trackerEmbed
}

function R6_General_Embed(header, user, url, timePlayed, win_percent, win, loss, kd, death, handShot, handShots, meleeKills, blindKills) {
  const trackerEmbed = new Discord.MessageEmbed()
    .setColor('#ff00ee')
    .setTitle(`Open ${user} R6 Tracker Profile`)
    .setURL(url)
    .setAuthor(user, header, url)
    .setDescription('General Profile')
    .setThumbnail(header)
    .addFields(
      { name: 'Win/Loss', value: `**${win_percent}**\nWin **${win}**\nLoss **${loss}**`, inline: true },
      { name: 'K/D', value: `**${kd}**\n\Death **${death}**`, inline: true },
      { name: 'Time Played', value: `**${timePlayed}**`, inline: true },
      { name: '\u200B', value: '\u200B' },
      { name: 'Hand Shot', value: `**${handShot}**\nHand Shots **${handShots}**`, inline: true },
      { name: 'Melee Kills', value: `**${meleeKills}**`, inline: true },
      { name: 'Blind Kills', value: `**${blindKills}**`, inline: true },
    )
    .setTimestamp()
    .setFooter('', url);

  return trackerEmbed
}

function R6_help() {
  const trackerEmbed = new Discord.MessageEmbed()
    .setColor('#ff00ee')
    .addFields(
      { name: 'R6 Tracker', value: `+r6 [your name] >> 總覽\n+r6 casual [your name] >> 一般場\n+r6 rank [your name] >> 排位`, inline: true },
      { name: 'example:', value: `+r6 blahaj_waifu\n+r6 casual blahaj_waifu\n+r6 rank blahaj_waifu`, inline: false },
    )

  return trackerEmbed
}


function RankImage(Img) {
  switch (String(Img)) {
    case 'COPPER V':
      return '1'

    case 'COPPER IV':
      return '2'

    case 'COPPER III':
      return '3'

    case 'COPPER II':
      return '4'

    case 'COPPER I':
      return '5'

    case 'BRONZE III':
      return '6'

    case 'BRONZE II':
      return '7'

    case 'BRONZE I':
      return '8'

    case 'SILVER IV':
      return '9'

    case 'SILVER III':
      return '10'

    case 'SILVER II':
      return '11'

    case 'SILVER I':
      return '12'

    case 'GOLD IV':
      return '13'

    case 'GOLD III':
      return '14'

    case 'GOLD II':
      return '15'

    case 'GOLD I':
      return '16'

    case 'PLATINUM III':
      return '17'

    case 'PLATINUM II':
      return '18'

    case 'PLATINUM I':
      return '19'

    case 'DIAMON':
      return '20'

    case 'CHAMPIONS':
      return '21'

    case 'UNRANKED':
      return '22'

  }
}