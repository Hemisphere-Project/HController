#include "Maxbotix.h"
#include <stdlib.h>


Maxbotix rangeSensorPW(8, Maxbotix::PW, Maxbotix::LV);

const float rangeMin = 50;// cm
const float rangeMax = 150;// cm
const float volMin = 20;// 0 - 100
const float volMax = 60;// 0 - 100
const int d = 200; // ms

float GLITCH_DIFF = 100;
float range;//measured ranges
float prevRange;//measured ranges
float volume = 0;
float stepVolume = 0;

void setup()
{
  Serial.begin(9600);
  range = prevRange = rangeSensorPW.getRange(); 
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
  
  
 
  volume = constrain(range,rangeMin,rangeMax);
  volume = map(volume,rangeMax,rangeMin,volMin,volMax);
  
  if(volume > stepVolume) stepVolume++;
  if(volume < stepVolume) stepVolume--;
  
  Serial.print("{\"name\":\"volume\",\"args\":{\"value\":");
  Serial.print(stepVolume);
  Serial.print(",\"range\":");
  Serial.print(range);
  Serial.print("}}");
  Serial.println();
  delay(d);
}
