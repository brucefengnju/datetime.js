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