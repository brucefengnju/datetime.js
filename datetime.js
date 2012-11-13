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
	'TimezoneOffset'
	]
	var StringMethodNams = [
		'TimeString',
		'DateString',
		'GMTString',
		'UTCString',
		'LocaleString',
		'LocaleTimeString',
		'LocaleDateString'
	]

	var Format = [
		'yyyy',//year
		'yy',
		'MM', // month
		'dd', // day
		'HH', // hour
		'mm', // minutes
		'ss', //second
		'ms' //Millisecond
	]
	
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
		cloneMethod();
		return this;
	}

	/**
	 * DateTime methods
	 **/
	 proto.toString = function(formatter){
	 	if(typeof formatter === undefined){
	 		return this._date.toString();
	 	}

	 }
	 proto.parse = function(){

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

	 /**
	  * static method 
	  **/
	 DateTime.today = function(){

	 }
	 DateTime.now = function(){

	 }
	 DateTime.UTC = function(year,month,date,hrs,min,sec){

	 }
	 DateTime.clone = function(dateTime){

	 }
	/**
	 * clone get and set methods from Date
	 **/
	function cloneMethod(){
		var length = MethodNames.length;
		for(var i =0;i< length;i++){
			var mn = 'get'+ MethodNames[i];
			proto[mn]  = function(){
				return this._date[mn]();
			}
			mn = 'set' + MethodNames[i];
			proto[mn] = function(){
				return this._date[mn]();
			}
		}
		length = StringMethodNams.length;
		for(var i =0; i <length;i++){
			var mn = 'to'+ StringMethodNams[i];
			proto[mn] = function(){
				return this._date[mn]();
			}
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