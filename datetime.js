var DateTime = (function(Date,Math,undefined){

	var proto = DateTime.prototype;
	/** methods for get set
	 **/
	var MethodNames = [
	'FullYear',     // 0
	'Month',        // 1
	'Date',         // 2
	'Hours',        // 3
	'Minutes',      // 4
	'Seconds',      // 5
	'Milliseconds', // 6
	'Day',          // 7
	'Year',         // 8
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
	]
	var StringMethodNams = [
		'TimeString',
		'GMTString',
		'UTCString',
		'LocaleString',
		'LocaleTimeString',
		'LocaleDateString',
		'DateString'
	]
	var Format = {
		'Year':/y{4}/g,
		'Short_Year':/y{2}/g,
		'Month':/MM/g,
		'Day':/dd/g,
		'Hour':/HH/g,
		'Minute':/mm/g,
		'Second':/ss/g,
		'Millisecond':/ms/g
	}

	function DateTime(){
		return this._init(arguments);
	}
	
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
		//cloneMethod();
		return this;
	}

	cloneMethod(MethodNames,function(name){
		proto['get'+ name] = function(){
			return this._date['get' + name]();
		}
		// need clone set method
		proto['set' + name] = function(value){
			return this._date['set'+ name](value);
		}
	});
	cloneMethod(StringMethodNams,function(name){
		proto['to' + name] = function(){
			return this._date['to' + name]();
		}
	})
	/**
	 * DateTime methods
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
	 proto.parse = function(datestr,formatter){
	 	if(typeof formatter === undefined){
	 		var tdate = new Date(datestr*1);
	 		return new DateTime(tdate);
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
	 proto.addYears = function(delta){
	 	return this;

	 }
	 proto.addMonths = function(delta){
	 	return this;
	 }
	 proto.addDays = function(delta){
	 	return this;
	 }
	 proto.addHours = function(delta){
	 	return this;
	 }
	 proto.addMinutes = function(delta){
	 	return this;
	 }
	 proto.addSeconds = function(delta){
	 	return this;
	 }
	 proto.addMilliseconds = function(delta){
	 	return this;
	 }
	 proto.spanYears = function(dateTime){

	 }
	 proto.spanMonths = function(dateTime){

	 }
	 proto.spanDays = function(dateTime){

	 }
	 proto.spanHours = function(dateTime){

	 }
	 proto.spanMinutes = function(dateTime){

	 }
	 proto.spanSeconds = function(dateTime){

	 }
	 proto.spanMilliseconds = function(dateTime){

	 }
	 proto.compareTo = function(dateTime){

	 }
	 proto.validDate = function(dateTime){
	 	if(typeof dateTime === undefined){
	 		dateTime = this;
	 	}
	 	return !isNaN(+dateTime._date);
	 }
	 proto.getDayInMonth = function(){

	 }
	 /**
	  * static method 
	  **/
	 DateTime.today = function(){

	 }
	 DateTime.now = function(){

	 }
	 /*
	 DateTime.UTC = function(year,month,date,hrs,min,sec){

	 }
	 **/
	 DateTime.clone = function(dateTime){

	 }

	/**
	 * clone get and set methods from Date
	 **/
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