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

