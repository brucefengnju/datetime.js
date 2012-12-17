test('no args',function(){
	var date = new DateTime();
	var time = +(new Date());
	return Math.abs(date.getTime() - time) < 1000;
});
test("from Datetime",function(){
	var dateTime1 = new DateTime();
	var datetime2 = new DateTime(dateTime1);
	return dateTime1.getTime() === datetime2.getTime();
});
test('from Date',function(){
	var time = new Date();
	var dateTime = new DateTime(time);
	return Math.abs(dateTime.getTime() - time.getTime())<1000;
});
test('from string',function(){
	var time = new Date();
	var datetime = new DateTime(time.toString());
	return Math.abs(datetime.getTime() - time.getTime())<1000;
});
test('from year month day',function(){
	var year = 2012,month = 11,day = 6;
	var dateTime1 = new DateTime(year,month,day);
	var dateTime2 = new DateTime(year,month,day);
	return Math.abs(dateTime1.getTime()-dateTime2.getTime())<1000
		  && dateTime1.getFullYear() === year
		  && dateTime1.getMonth() === month
		  && dateTime1.getDate() === day
		  && !dateTime1.getHours()
		  && !dateTime1.getMinutes()
		  && !dateTime1.getSeconds()
		  && !dateTime1.getMilliseconds();
});
test('from year/month/day/hour/minute/second',function(){
	var year = 2012,month = 11, day = 6,hour = 15, minute = 40,second = 2;
	var dateTime1 = new DateTime(year,month,day,hour,minute,second);
	var dateTime2 = new DateTime(year,month,day,hour,minute,second);
	return Math.abs(dateTime1.getTime()-dateTime2.getTime())<1000
		&& dateTime1.getFullYear() === year
		&& dateTime1.getMonth() === month
		&& dateTime1.getDate() === day
		&& dateTime1.getHours() === hour
		&& dateTime1.getMinutes() === minute
		&& dateTime1.getSeconds() === second
		&& !dateTime1.getMilliseconds();
});

test('addYears',function(){
	var date = new DateTime();
	var year1 = date.getFullYear();
	var year2 = date.addYears(1).getFullYear();
	var year3 = date.addYears(-2).getFullYear();
	return (year2-year1) === 1 && (year1 - year3)===1;

});
test('addMonths',function(){
	var date = new DateTime();
	var month = date.getMonth();
	var month1 = date.addMonths(-2).getMonth();
	var month2 = date.addMonths(1).getMonth();
	return month - month1 ===2 && month2 - month1 === 1;
});
test('addDays',function(){
	var date = new DateTime();
	var day = date.getDate();
	var day1 = date.addDays(1).getDate();
	var day2 = date.addDays(-2).getDate();
	return day1 - day === 1 && day - day2 === 1;
});
test('addHours',function(){
	var date = new DateTime();
	var hour = date.getHours();
	var hour1 = date.addHours(1).getHours();
	var hour2 = date.addHours(-2).getHours();
	return hour1 - hour === 1 && hour - hour2 === 1;
});
test("addMinutes",function(){
	var date = new DateTime();
	var minute = date.getMinutes();
	var minute1 = date.addMinutes(1).getMinutes();
	var minute2 = date.addMinutes(-2).getMinutes();
	return minute1 - minute === 1 && minute - minute2 === 1;
});
test("addSeconds",function(){
	var date = new DateTime();
	var second = date.getSeconds();
	var second1 = date.addSeconds(1).getSeconds();
	var second2 = date.addSeconds(-2).getSeconds();
	return second1 - second === 1 && second - second2 === 1;
});
test('addMilliseconds',function(){
	var date = new DateTime();
	var milsecond = date.getMilliseconds();
	var milsecond1 = date.addMilliseconds(1).getMilliseconds();
	var milsecond2 = date.addMilliseconds(-2).getMilliseconds();
	return milsecond1 - milsecond === 1 && milsecond - milsecond2 === 1;
});
test('spanYears',function(){
	var date = new DateTime();
	var date1  = new DateTime(date.getFullYear() + 1,date.getMonth(),date.getDate());
	var date2 = new DateTime(date.getFullYear() -1 ,date.getMonth(),date.getDate());
	return date1.spanYears(date) === 1 && date.spanYears(date2) === 1;
});
test('spanMonths',function(){
	var date = new DateTime();
	var date1 = new DateTime(date.getFullYear(),date.getMonth() -2,date.getDate());
	var date2 = new DateTime(date.getFullYear(),date.getMonth() - 1,date.getDate());
	return date.spanMonths(date2) ===1 && date2.spanMonths(date1) === 1;
});
test('spanDays',function(){
	var date = new DateTime();
	var date1 = new DateTime(date.getFullYear(),date.getMonth(),date.getDate() +1);
	var date2 = new DateTime(date.getFullYear(),date.getMonth(),date.getDate() -1);
	return date1.spanDays(date) ===1 && date.spanDays(date2) ===1;
});
test('spanHours',function(){
	var date = new DateTime();
	var date1 = (new DateTime()).addHours(1);
	var date2 = (new DateTime()).addHours(-2);
	return date1.spanHours(date) === 1 && date.spanHours(date2) ===2 ;
});
test('spanMinutes',function(){
	var date = new DateTime();
	var date1 = new DateTime(date.getFullYear(),date.getMonth(),date.getDate(),
		date.getHours(),date.getMinutes() + 10,date.getSeconds());
	var date2 = new DateTime(date.getFullYear(),date.getMonth(),date.getDate(),
		date.getHours(),date.getMinutes() -10,date.getSeconds());
	return date1.spanMinutes(date) === 10 && date.spanMinutes(date2) === 10;
});
test('spanSeconds',function(){
	var date = new DateTime();
	var date1 = new DateTime(date.getFullYear(),date.getMonth(),date.getDate(),
		date.getHours(),date.getMinutes(),date.getSeconds()+1);
	var date2 = new DateTime(date.getFullYear(),date.getMonth(),date.getDate(),
		date.getHours(),date.getMinutes(),date.getSeconds() -1);
	return date1.spanSeconds(date) ===1 && date.spanSeconds(date2) === 1;
});

test('toDate',function(){
	var date = new DateTime();
	var time = date.toDate();
	return Math.abs(date.getTime() - time.getTime()) < 1000;
});
test('compareTo',function(){
	var date = new DateTime();
	var date1 = new DateTime(DateTime.now().addDays(2));
	var date2 = new DateTime(DateTime.now().addDays(-1));
	var date3 = new DateTime(date);
	return date.compareTo(date1) < 0 && date.compareTo(date2) > 0 && date.compareTo(date3) === 0;
});
test('clone',function(){
	var date = new DateTime();
	var date1 = date.clone();
	return date.compareTo(date1) === 0;
});
test('validDate',function(){
	var date = new DateTime();
	var time = new Date();
	return DateTime.validDate(date) && DateTime.validDate(time);
});
test('toString',function(){
	var date = new DateTime();
	var format = "time is yyyy-MM-dd HH:mm:ss";
	var shortformat = "time is yy-MM-dd HH:mm:ss";
	var datestr = date.toString(format);
	var shortDatestr = date.toString(shortformat);
/*	console.log(datestr);
	console.log(shortDatestr);
	console.log(date.toString());*/
});
test('parse',function(){
	var datestr = "time is 2012-12-17 20:38:25";
	var format = "time is yyyy-MM-dd HH:mm:ss";
	var date = DateTime.parse(datestr,format);
	console.log(date.toString());
	var shortformat = "time is yy-MM-dd HH:mm:ss";
	var shortdatestr = "time is 12-12-17 20:38:25 "
	var shortDate = DateTime.parse(shortdatestr,shortformat);
	console.log(shortDate.toString());
	return DateTime.validDate(date) && DateTime.validDate(shortDate);
});
test('isLeapYear',function(){
	var leapYear = DateTime.isLeapYear(2000);
	var noLeapYear = DateTime.isLeapYear(2001);
	return leapYear&&!noLeapYear;
});
test("now",function(){
	return Math.abs(+new Date() - DateTime.now().getTime())<1000;
});
test("today",function(){
	var dateTime = DateTime.today();
	var time = new Date();
	return dateTime.getFullYear() === time.getFullYear()
	       && dateTime.getMonth() === time.getMonth()
	       && dateTime.getDate() === time.getDate()
	       && !dateTime.getHours()
	       && !dateTime.getMinutes()
	       && !dateTime.getSeconds()
	       && !dateTime.getMilliseconds();
});
test('getDaysInMonth',function(){
	var days1 = DateTime.getDaysInMonth(2012,1);
	var days2 = DateTime.getDaysInMonth(2011,1);
	var days3 = DateTime.getDaysInMonth(2012,2);
	var days4 = DateTime.getDaysInMonth(2012,3);
	return days1 === 29 && days2 === 28 && days3 === 31 && days4 === 30;
});