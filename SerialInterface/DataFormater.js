
var store = {};

module.exports = {
		format:function(inData, parameters){
			var outData;
			/* specific format script  */

				outData = map(inData,parameters.inMin,parameters.inMax,parameters.outMin,parameters.outMax);
				outData = constrain(outData,parameters.outMin,parameters.outMax);
				//invert
				outData = parameters.outMax - outData;
				// raw easing
				outData = store.lastValue + (outData - store.lastValue)*0.8;			
			
				store.lastValue = outData
			/**************************/
			return outData;
		}
}

// Helpers functions

function map(value,inMin,inMax,outMin,outMax){
  return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function constrain(value,min,max){
	if(value>max)
		return max;
	if(value<min)
		return min;
	
	return value;
}