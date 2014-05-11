#include <Arduino.h>
#include "Maxbotix.h"
#include <stdlib.h>
void setup();
void loop();
#line 1 "src/sketch.ino"
//#include "Maxbotix.h"
//#include <stdlib.h>


Maxbotix rangeSensorPW(8, Maxbotix::PW, Maxbotix::LV);

const float rangeMin = 50;// cm
const float rangeMax = 150;// cm
const float volMin = 20;// 0 - 100
const float volMax = 70;// 0 - 100
const int d = 200; // ms

float GLITCH_DIFF = 20;
float prevRange;


void setup()
{
  Serial.begin(9600);
  prevRange = rangeSensorPW.getRange(); 
}

void loop()
{
  
  // PW range in cm from the sensor
  float range = rangeSensorPW.getRange() ;
  
  
  // filtering
  if(abs(range-prevRange) > GLITCH_DIFF){
  		float tmp = range;  
  		range = prevRange;
  		prevRange = tmp;
  }
  
 
  range = constrain(range,rangeMin,rangeMax);
  range = map(range,rangeMax,rangeMin,volMin,volMax);
  
  Serial.print("{\"name\":\"volume\",\"args\":{\"value\":");
  Serial.print(range);
  Serial.print("}}");
  Serial.println();
  delay(d);
}
