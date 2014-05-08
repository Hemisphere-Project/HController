#include <Arduino.h>
#include "Maxbotix.h"
#include <stdlib.h>
#include "Base64.h"
void setup();
void loop();
#line 1 "src/sketch.ino"
//#include "Maxbotix.h"
//#include <stdlib.h>
//#include "Base64.h"

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
  
  char rangeString[25];
  sprintf(rangeString, "hello %f", range);
  // sound indicating range
  //int thisPitch = map(range, 300, 10, 120, 1500);
  //tone(9, thisPitch, 30);
  //dtostrf(range,5,2,command[1]);
  //char rangeString[10];
  //dtostrf(range,1,2,rangeString);
  //String command = "{\"name\":\"volume\",\"args\":{\"value\":\"";
  //command += rangeString;
  //command += "\"}}";
  Serial.println(rangeString);
  //char* cs = ;
  //base64_encode(cs,
  /*Serial.print(cs);
  Serial.print("{\"name\":\"volume\",\"args\":{\"value\":\"");
  Serial.print(range);
  Serial.print("\"}}");
  Serial.println();*/
  delay(d);
}
