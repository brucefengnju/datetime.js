# datetime.js
## A New JavaScript Date Library.
DateTime is a thin wrapper around JavaScript's native.object and provides enhanced functionality for parsing, formatting, and manipulating dates.

## How to use
	DateTime has all methods of Date.

	### You can get DateTime object as follows:

	var d1 = new DateTime();
	var d2 = new DateTime(2012,11,27);
	var d3 = new DateTime(2012,11,27,20,3,30);
	var d4 = new DateTime(d1);
	var d5 = new DateTime(new Date());
	var d6 = DateTime.clone(d2);
	var d7 = DateTime.today();
	var d8 = DateTime.now();

	### You can get the string and parse string

	var timeStr1 = d1.toString("Time is yyyy-MM-dd HH:mm:ss");
	var timeStr2 = d1.toString("also can get like this yy-MM-dd");

	var date1 = DateTime.parse(timeStr1,"Time is yyyy-MM-dd HH:mm:ss");

	### DateTime support compare time

	var earlier = d2.compareTo(d3);
	var same = d4.compareTo(d1);
	var later = d8.compareTo(d7);

	### DateTime support add and span methods
	
	d1.addYears(year);
	d1.addMonths(month);
	d1.addDays(day);
	d1.addHours(hour);
	d1.addMinutes(min);
	d1.addSeconds(sec);
	d1.addMillseconds(milsec);

	var spanYear = d1.spanYear(d2);
	var sapnMonth = d1.spanMonth(d2);
	var spanDay = d1.spanDay(d2);
	var spanHour = d1.spanHour(d2);
	var spanMin = d1.spanMinute(d2);
	var spanSec = d1.spanSecond(d2);

	### and some another methods

	var time = d3.toDate();
	var valid = DateTime.validDate(d3);
	var leapYear = DateTime.isLeapYear(2012);
	var days1 = DateTime.getDaysInMonth(2012,1);


You can get every thing at https://github.com/brucefengnju/datetime.js
