var allowedInputTypes = ["number", "string"];


module.exports = function(){

	if(arguments.length == 0 || allowedInputTypes.indexOf(arguments[0]) == -1) {
		return "";
	}

  var input = arguments[0],
      output = "";


  return output;

};