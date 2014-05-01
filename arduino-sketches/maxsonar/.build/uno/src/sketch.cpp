#include <Arduino.h>
#include "Maxbotix.h"
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

Maxbotix rangeSensorPW(8, Maxbotix::PW, Maxbotix::LV);
//Maxbotix rangeSensorTX(6, Maxbotix::TX, Maxbotix::LV);
//Maxbotix rangeSensorAD(A0, Maxbotix::AN, Maxbotix::LV);


void setup()
{
  Serial.begin(9600);
}

void loop()
{
  unsigned long start;
  
  // PW range in cm from the sensor
  float range = rangeSensorPW.getRange() ;
 
  
  // sound indicating range
  int thisPitch = map(range, 300, 10, 120, 1500);
  tone(9, thisPitch, 30);
  
  Serial.print(range);
  Serial.println();
  delay(50);
}
