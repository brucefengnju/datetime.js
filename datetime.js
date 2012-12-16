var DateTime = (function(Date,Math,undefined){

	var proto = DateTime.prototype;
	
	/** 
	 * methods for get set
	**/
	var MethodNames = [

		'FullYear',     
		'Month',       
		'Date',        
		'Hours',        
		'Minutes',      
		'Seconds',      
		'Milliseconds', 
		'Day',          
		'Year',         
		'Time',
		'TimezoneOffset',
		'UTCDate',
		'UTCDay',
		'UTCMonth',
		'UTCFullYear',
		'UTCHours',
		'UTCMinutes',
		'UTCSeconds',
		'UTCMilliseconds'
	];

	/**
	 * toString methods
	**/
	var StringMethodNams = [
		'TimeString',
		'GMTString',
		'UTCString',
		'LocaleString',
		'LocaleTimeString',
		'LocaleDateString',
		'DateString'
	];

	/**
	 * time string formatter
	 **/
	var Format = {
		'Year':/y{4}/g,
		'Short_Year':/y{2}/g,
		'Month':/MM/g,
		'Day':/dd/g,
		'Hour':/HH/g,
		'Minute':/mm/g,
		'Second':/ss/g,
		'Millisecond':/ms/g
	};

	function DateTime(){

		return this._init(arguments);
	}

	/**
	 * @private
	**/
	DateTime.prototype._init = function(args){
		var length = args.length;
		if(length===0){
			this._date = new Date();
		}else if(length === 1){
			if(isNumber(args[0])|| args[0] instanceof Date){
				this._date = new Date(+args[0]);
			}else if(args[0] instanceof DateTime){
				this._date = args[0]._date;
			}else if(isString(args[0])){
				this._date = new Date(args[0]);
			}
		}else if(length === 3){
			
			var year = args[0];
			var month = args[1];
			var day = args[2];
			this._date = new Date(year,month,day);
		}else if(length === 6){

			var year = args[0];
			var month = args[1];
			var day = args[2];
			var hour = args[3];
			var min = args[4];
			var sec = args[5];
			this._date = new Date(year,month,day,hour,min,sec);
		}
		return this;
	}

	/**
	 * clone get and set methods of Date
	**/
	cloneMethod(MethodNames,function(name){
		proto['get'+ name] = function(){
			return this._date['get' + name]();
		}
		proto['set' + name] = function(value){
			this._date['set'+ name](value);
			return this;
		}
	});

	/**
	 * clonet to*String methods of Date
	**/
	cloneMethod(StringMethodNams,function(name){
		proto['to' + name] = function(){
			return this._date['to' + name]();
		}
	});

	/**
	 * @public 
	 * convert DateTime to string with a given formater. 
	 * yyyy and yy means year , MM means month,dd means day
	 * HH means hour, mm means minutes, ss means seconds and ms means milliseconds.
	**/
	proto.toString = function(formatter){

	 	if(formatter === undefined){

	 		return this._date.toString();
	 	}

	 	if(Format.Year.test(formatter)){

	 		formatter = formatter.replace(Format.Year,this._date.getUTCFullYear()+"");

	 	}else if(Format.Short_Year.test(formatter)){

	 		formatter = formatter.replace(Format.Short_Year,(this._date.getUTCFullYear()+"").substr(2,2));
	 	}

	 	var monstr = "";

	 	if(this._date.getUTCMonth() + 1< 10){

	 		monstr = "0" + (this._date.getUTCMonth() + 1);

	 	}else{

	 		monstr = '' + this._date.getUtcDate();
	 	}

	 	var daystr = '' + this._date.getUtcDate();

	 	if(this._date.getUTCDate() < 10){

	 		daystr = '0' + daystr;
	 	}

	 	var hourstr = '';

	 	if(this._date.getUTCHours()<10){

	 		hourstr = '0' + this._date.getUTCHours();

	 	}else{

	 		hourstr = "" + this._date.getUTCHours();

	 	}

	 	var minstr = '' + this._date.getUTCMinutes();

	 	if(this._date.getUTCMinutes < 10){
	 		minstr = '0' + minstr;
	 	}
	 	var seconstr = '' + this._date.getUTCSeconds();
	 	if(this._date.getUTCSeconds()<10){
	 		seconstr = '0' + seconstr;
	 	}
	 	var milistr = '' + this._date.getUTCMilliseconds();
	 	if(this._date.getUTCMilliseconds<10){
	 		milistr = '0' + milistr;
	 	}
	 	return formatter.replace(Format.Month,monstr)
	 					.replace(Format.Day,daystr)
	 					.replace(Format.Hour,hourstr)
	 					.replace(Format.Minute,minstr)
	 					.replace(Format.Second,seconstr)
	 					.replace(Format.Millisecond,milistr);

	}

	/**
	 * @public
	 * parse DateTime string
	**/
	proto.parse = function(datestr,formatter){

	 	if(typeof datestr == DateTime || typeof datestr == Date){

	 		return new DateTime(datestr);
	 	}

	 	if(typeof formatter === undefined){

	 		return Date.parse(datestr);
	 	}

	 	var year,month,day,hour,minute,second,millisecond;

	 	var result;

	 	if((result = Format.Year.exec(formatter)) !== null){

	 		year = datestr.substr(result.index,result[0].length)*1;

	 	}else if ((result = Format.Short_Year.exec(formatter)) !== null) {

	 		year = datestr.substr(result.index,result[0].length)*1 +2000;

	 	}else{
	 		return null;
	 	}

	 	if ((result = Format.Month.exec(formatter)) !== null) {

	 		month = datestr.substr(result.index,result[0].length)*1;

	 	}else{

	 		return null;
	 	}

	 	if ((result = Format.Day.exec(formatter)) !== null){

	 		day = datestr.substr(result.index,result[0].length)*1;

	 	} else{

	 		return null;
	 	}
	 	if ((result = Format.Hour.exec(formatter)) !== null){

	 		hour = datestr.substr(result.index,result[0].length)*1;

	 	} else{

	 		hour = 0;
	 	}

	 	if ((result = Format.Minute.exec(formatter)) !== null){

	 		minute = datestr.substr(result.index,result[0].length)*1;

	 	} else{

	 		minute = 0;
	 	}

	 	if ((result = Format.Second.exec(formatter)) !== null){

	 		second = datestr.substr(result.index,result[0].length)*1;

	 	} else{

	 		second = 0;
	 	}

	 	return new DateTime(year,month,day,hour,minute,second);

	 }

	/**
	 * @public 
	 * add delta years to datetime
	**/
	proto.addYears = function(delta){

	 	return this.addMonths(delta * 12);
	}

	/**
	 * @public 
	 * add delta months to datetime
	**/
	proto.addMonths = function(delta){
        var n = this.getDate();
        this.setDate(1);
        this.setMonth(this.getMonth() + delta * 1);
        this.setDate(Math.min(n, DateTime.getDaysInMonth(this.getFullYear(), this.getMonth())));
        return this;
	}

	/** 
	 * @public 
	 * add delta days to datetime
	**/
	proto.addDays = function(delta){
	 	this.setDate(this.getDate() + delta * 1);
	 	return this;
	}

	/**
	 * @public 
	 * add delta hours to datetime
	**/
	proto.addHours = function(delta){

		return this.addMilliseconds(delta * 3600000);
	}

	/**
	 * @public 
	 * add delta minutes to datetime 
	**/
	proto.addMinutes = function(delta){
	 	
	 	return this.addMilliseconds(delta * 60000); /* 60*1000 */
	}

	/**
	 * @public 
	 * add delta seconds to datetime
	**/
	proto.addSeconds = function(delta){

		return this.addMilliseconds(delta * 1000); 
	}

	/**
	 * @public 
	 * add delta milliseconds to datetime
	**/
	proto.addMilliseconds = function(delta){
	
	 	this.setMilliseconds(this.getMilliseconds() + delta * 1);
	 	return this;
	}
	
	/**
	 * @public 
	 * diff years with datetime
	**/
	proto.spanYears = function(dateTime){
	
	 	return this.getFullYear() - dateTime.getFullYear();
	}
	
	/**
	 * @public 
	 * diff months with datetime
	**/
	proto.spanMonths = function(dateTime){
	
	 	return this.getMonth() - dateTime.getMonth();
	}

	/**
	 * @public 
	 * diff days with datetime
	**/
	proto.spanDays = function(dateTime){
	
	 	return this.getDate() - dateTime.getDate();
	}

	/**
	 * @public 
	 * diff hours with datetime
	**/
	proto.spanHours = function(dateTime){

	 	return this.getHours() - dateTime.getHours();
	}

	/**
	 * @public 
	 * diff minutes with datetime
	**/
	proto.spanMinutes = function(dateTime){

	 	return this.getMinutes() - dateTime.getMinutes();
	}
	
	/**
	 * @public 
	 * diff seconds with datetime
	**/
	proto.spanSeconds = function(dateTime){

	 	return this.getSeconds() - dateTime.getSeconds();
	}
	
	/**
	 * @public 
	 * diff milliseconds with datetime
	**/	
	proto.spanMilliseconds = function(dateTime){

	 	return this.getMilliseconds() - dateTime.getMilliseconds();
	}

	/**
	 * @public 
	 * convert DateTime object to DateTime
	**/
	proto.toDate = function(){
	 	return this._date;
	 }

	/**
	 * @public 
	 * compare with datetime;
	 * @return -1 while it is earlier than datetime
	 * @return 0 while it is same with datetime
	 * @return 1 while it is later than dateime
	**/
	proto.compareTo = function(dateTime){
	 	if(isNan(dateTime)){
	 		throw new Error(dateTime);
	 	}

	 	if(dateTime instanceof DateTime){
	 		return (this._date < dateTime.toDate()) ? -1 : (this._date > dateTime.toDate()) ? 1 : 0;
	 	}
	}

	/**
	 * @public 
	 * clone method
	**/
	proto.clone = function(){
	
	 	return new DateTime(this._date.getTime());
	}

	/**
	 * @public 
	 * validate datetime
	**/
	proto.validDate = function(dateTime){
	 	if(typeof dateTime === undefined){
	 		dateTime = this;
	 	}
	 	return !isNaN(+dateTime._date);
	}

	/**
	 * static method 
	 * today for example 2012-12-12 00:00:00
	**/
	DateTime.today = function(){
	 	var dt = DateTime.now();
	 	dt.setHours(0)
	 	  .setMinutes(0)
	 	  .setSeconds(0)
	 	  .setMilliseconds(0);
	 	return dt;
	}

	/**
	 * @public 
	 * static method
	 * @return now ,for example 2012-12-12 17:04:04
	**/
	DateTime.now = function(){
	
	 	var dt = new DateTime();
	 	return dt;
	}

	/**
	 * @public 
	 * static method
	 * @return true if year is leap year
	**/
	DateTime.isLeapYear = function(year){
	 	
	 	return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0); 
	}

	/**
	 * @public 
	 * static method
	 * get how many days in month 
	**/
	DateTime.getDaysInMonth = function(year,month){
	
	 	return [31, (DateTime.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
	}

	/***********************************    Utilities    ************************************************/
	
	function cloneMethod(names,fun){
	 	for(var i =0;i<names.length;i++){
	 		fun(names[i],i);
	 	}
	}

	function isNumber(arg){
		return typeof arg === 'number';
	}
	
	function isString(arg){
		return typeof arg === "string";
	}
	
	return DateTime;	
})(Date,Math)