#include "Maxbotix.h"
#include <stdlib.h>


Maxbotix rangeSensorPW(8, Maxbotix::PW, Maxbotix::LV);

const float rangeMin = 200;// cm
const float rangeMax = 260;// cm
const float outMin = 0;// 0 - 100
const float outMax = 100;// 0 - 100
const int d = 0; // ms

float GLITCH_DIFF = 100;
float range;//measured ranges
float prevRange;//measured ranges
float out = 0;
float stepOut = 0;
float lastStepOut = 0;

void setup()
{
  Serial.begin(9600);
  range = prevRange = rangeSensorPW.getRange(); 
  out = stepOut = lastStepOut = outMin;
}

void loop()
{
  
  // PW range in cm from the sensor
  range = rangeSensorPW.getRange() ;
  
  
  // filtering
  if(abs(range-prevRange) > GLITCH_DIFF){
  		float tmp = range;  
  		range = prevRange;
  		prevRange = tmp;
  }
  
  
 
  out = constrain(range,rangeMin,rangeMax);
  out = map(out,rangeMin,rangeMax,outMin,outMax);
  
  if(out > stepOut) stepOut++;
  if(out < stepOut) stepOut--;
  
  if(stepOut == lastStepOut)
  	  return;
  
  //if(stepOut <10)
  	//  stepOut = 0;
  
  Serial.print("{\"name\":\"gaussianBlur\",\"args\":{\"value\":");
  Serial.print(stepOut);
  Serial.print(",\"range\":");
  Serial.print(range);
  Serial.print("}}");
  Serial.println();
  
  lastStepOut = stepOut;
  
  delay(d);
}
