var base = require('./base.json');


function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};


module.exports = {
	food: function () {
		var random = getRandom(0, 15);

		return base.food[random]

	},

	howFeel: function () {
		var random = getRandom(0, 1);

		return base.howFeel[random]
	},

	yesNo: function () {
		var random = getRandom(0, 6);

		return base.yesNo[random]

	},

	nutTime: function () {
		var random = getRandom(0, 6);

		if (random === 6)
			return base.nutTime[random] + `\n${this.book_1()}`
		else
			return base.nutTime[random]
	},

	dcGif: function () {
		var random = getRandom(0, 5);

		return base.dcGif[random]
	},

	DBD: function () {
		var random = getRandom(0, 16);

		return base.DBD[random]
	},

	words: function (user) {
		var fs = require('fs');
		var word = fs.readFileSync('./file/FileBase/words.txt').toString().split("\r");
		/*
		for(i= 0;i<word.length;i=i+2) {
			console.log(word[i]);
		}*/

		var words = [];
		var i = 0;
		var j = 0;
		var num = 0;
		var wordReturn = [];

		for (i = 0; i < word.length; i = i + 2) {
			j++;
			words[j] = word[i];
		}


		//print word record					 
		//console.log( this.dateSet() + 'USER:"' + user + '">>{"');
		for (i = 0; i < 5; ++i) {
			num = getRandom(1, words.length);
			wordReturn[i] = words[num];
			//console.log('\t\t\t\t\t' + wordReturn[i]);
		}
		//console.log('\t\t\t\t       "}');
		return wordReturn;
	},

	link: function (link) {
		return `https://nhentai.net/g/${link}/`
	},

	book_1: function () {
		var num_1 = getRandom(210000, 300000);
		//引入篩選車號的檔案
		var fs = require('fs');
		//將txt轉成array
		var array = fs.readFileSync('./file/FileBase/badCar.txt').toString().split("\n");
		/*
		for(i in array) {
			console.log(array[i]);
		}
		*/
		//設一個新的陣列來儲存array[]
		var badChoose = [];
		//將Object轉型成Number並儲存至badchoose[]
		for (i = 0; i < array.length; ++i) {
			badChoose[i] = parseInt(array[i], 10);
		}
		//檢測num有無選中任一badNehentai
		for (i = 0; i < array.length; ++i) {
			if (num_1 == badChoose[i]) {
				console.log(num_1);
				return this.book_1();
			}
		}
		return this.link(num_1);
	},
	/*
		book_2: function () { //broken
			var num_2 = getRandom(200, 96640);
	
			return num_2;
		},
	*/
	drive: function () {
		var fs = require('fs');
		var drive = fs.readFileSync('./file/FileBase/favorite.txt').toString().split("\n");

		console.log(`line: ${drive.length}`)

		drive = parseInt(drive[getRandom(0, drive.length - 1)], 10)
		console.log(drive)

		return this.link(drive);
	},

	list_drive: function () {
		var fs = require('fs');
		var list = fs.readFileSync('./file/FileBase/favorite.txt').toString().split("\n");
		return list.length
	},

	bookCheck: function (bookCheck) {
		//引入篩選車號的檔案
		var fs = require('fs');
		//將txt轉成array[]
		var bookArray = fs.readFileSync('./file/FileBase/badCar.txt').toString().split("\n");
		/*
		for(i in array) {
			console.log(bookArray[i]);
		}*/
		//設一個新的陣列來儲存bookArray[]
		var bookError = [];
		//將Object轉型成Number並儲存至bookError[]
		for (i = 0; i < bookArray.length; ++i) {
			bookError[i] = parseInt(bookArray[i], 10);
		}
		//檢測num有無選中任一badNehentaiCar
		for (i = 0; i < bookArray.length; ++i) {
			if (bookCheck == bookError[i]) {
				console.log(bookCheck);
				return 0;
			}
		}
		return 1;
	},

	driveCheck: function (driveCheck) {
		var fs = require('fs');
		var driveArray = fs.readFileSync('./file/FileBase/favorite.txt').toString().split("\n");

		for (i = 0; i < driveArray.length; ++i) {
			driveArray[i] = parseInt(driveArray[i], 10);
		}
		for (i = 0; i < driveArray.length; ++i) {
			if (driveCheck == driveArray[i]) {
				return 0;
			}
		}
		return 1;
	},

	report: function (args) {
		var fs = require('fs');
		// var book = fs.readFileSync('./file/FileBase/badCar.txt').toString().split("\n");
		/*
		for(i in book) {
			console.log(book[i]);
		}
		*/
		fs.writeFileSync('./file/FileBase/badCar.txt', '\n' + args, {
			flag: 'a'
		},
			function (err) {
				if (err) throw err;
				console.log('systemRecord.txt 已存在，內容將被覆蓋');
				return;
			});

		return;
	},

	favorite: function (args) {
		var fs = require('fs');
		fs.writeFileSync('./file/FileBase/favorite.txt', '\n' + args, {
			flag: 'a'
		},
			function (err) {
				if (err) throw err;
				console.log('systemRecord.txt 已存在，內容將被覆蓋');
				return;
			});

		return;
	},
	//------------- time record -------------//
	dateSet: function () {
		//設定時間
		var Today = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });
		//var dateFuntion = Today.getFullYear()+ '/' + (Today.getMonth()+1) + "/" + Today.getDate() + ' '+Today.getHours(+6)  +':'+Today.getMinutes()+':'+Today.getSeconds()+'  ';
		return Today;
	},

	printSet: function (user, consoleLog) {
		user = user;//print imformation to cmd
		date = this.dateSet() + '  USER:"' + user + '">>{"' + consoleLog + '"}';
		return date;
	},

	write: function (userSet, consoleLog) {
		var fs = require('fs');
		fs.writeFileSync('./file/FileBase/systemRecord.txt', this.printSet(userSet, consoleLog) + '\n', {
			flag: 'a'
		},

			function (err) {
				if (err) throw err;
				console.log('systemRecord.txt 已存在，內容將被覆蓋');
			});

		console.log(this.printSet(userSet, consoleLog));

		return;
	},

	record: function () {
		var fs = require('fs');
		var systemRecord = fs.readFileSync('./file/FileBase/systemRecord.txt').toString().split("\n");

		var long = systemRecord.length;
		var returnRecord = [long - 1];
		var i = 0;
		var j = 0;

		for (i = long - 1; i > long - 12; --i) {
			++j;
			returnRecord[j] = '\n' + systemRecord[i];
		}


		console.log(returnRecord);

		return '```' + returnRecord + '```';
	},
	//---------------------------------------//
	help: function () {
		var fs = require('fs');
		var help = fs.readFileSync('./file/FileBase/help.txt').toString().split("\r");

		return '```' + help + '```';
	},

	uptime: function (uptime) {

		var Today = new Date();
		var uptime = uptime.getTime()
		var date1 = uptime
		var date2 = Today.getTime()
		var total = (date2 - date1) / 1000;

		var day = parseInt(total / (24 * 60 * 60));//計算整數天數
		var afterDay = total - day * 24 * 60 * 60;//取得算出天數後剩餘的秒數
		var hour = parseInt(afterDay / (60 * 60));//計算整數小時數
		var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60;//取得算出小时数后剩余的秒数
		var min = parseInt(afterHour / 60);//计算整数分
		var afterMin = Math.round(total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60);//取得算出分后剩余的秒数
		console.log(day + ' / ' + hour + ':' + min + ':' + afterMin)

		return day + ' / ' + hour + ':' + min + ':' + afterMin
	},

	exam: function () {

		var Today = new Date();
		var exam = new Date('2021/01/22 08:00')
		var date1 = Today.getTime()
		var date2 = exam.getTime()
		var total = (date2 - date1) / 1000;

		var day = parseInt(total / (24 * 60 * 60));//計算整數天數
		var afterDay = total - day * 24 * 60 * 60;//取得算出天數後剩餘的秒數
		var hour = parseInt(afterDay / (60 * 60));//計算整數小時數
		//var afterHour = total - day*24*60*60 - hour*60*60;//取得算出小时数后剩余的秒数
		//var min = parseInt(afterHour/60);//计算整数分
		//var afterMin = Math.round(total - day*24*60*60 - hour*60*60 - min*60);//取得算出分后剩余的秒数
		//console.log(day + ' / ' + hour + ':' + min + ':' + afterMin)

		//return '學測剩餘' + day + '天' + hour + '小時'
		return `學測剩餘${(day*24)+hour}小時`
	},

	third: function (minutes) {
		console.log('深淵結算剩餘 ' + minutes + '分');
		return '<@&726788518168231947> ' + '深淵結算剩餘 : ' + minutes + '分';
		//console.log('現在時間  week ' + clock_weekday+' hour '+ clock_hours);
		//console.log('深淵結算剩餘 ' + weekdays + '天' + hours + '小時' + minutes + '分');
	}
};