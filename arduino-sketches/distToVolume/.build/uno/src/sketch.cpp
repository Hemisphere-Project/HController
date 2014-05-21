#include <Arduino.h>
#include "Maxbotix.h"
#include<stdlib.h>
void setup();
void loop();
#line 1 "src/sketch.ino"
/*
  Maxbotix simple test

  Instructions:
  - At least one of: (comment the appropriate code below)
    * PW is digital pin 8
    * TX is digital pin 6
    * AN is analog pin A0
  - Change code below according to your model (LV, XL and
  HRLV supported)

  Note:
  For convenience, the getRange method will always return centimeters.
  You can use convert fuctions to convert to another unit (toInches and
  toCentimeters are available)

*/
//#include "Maxbotix.h"
//#include<stdlib.h>

Maxbotix rangeSensorPW(8, Maxbotix::PW, Maxbotix::LV);

const float rangeMin = 50;// cm
const float rangeMax = 150;// cm
const float volMin = 20;// 0 - 100
const float volMax = 100;// 0 - 100
const int d = 50; // ms

float GLITCH_DIFF = 100;
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
  
  // sound indicating range
  //int thisPitch = map(range, 300, 10, 120, 1500);
  //tone(9, thisPitch, 30);
  //dtostrf(range,5,2,command[1]);
  Serial.print("{\"name\":\"volume\",\"args\":{\"value\":");
  Serial.print(range);
  Serial.print("}}");
  Serial.println();
  delay(d);
}
