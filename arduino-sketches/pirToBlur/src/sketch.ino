const int pirPin = 2;
const int ledPin = 13; 
const int d = 50; // ms

const float outMin = 0;// 0 - 100
const float outMax = 90;// 0 - 100

const int timeIn = 2000; // in ms 
const int timeOut = 7000; // in ms

const int howlong = 5000;// in ms

int pirState = 0; 
int lastPirState = 0;
int stepOut = 0;
int lastStepOut = 0;

unsigned long ts;
unsigned long dt;

bool wait = false;


void setup()
{
  pinMode(pirPin, INPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
  
  ts = millis();
}
 
void loop()
{
  pirState = digitalRead(pirPin);
  
  if(pirState == HIGH){
	  digitalWrite(ledPin,HIGH);
	
	  if(pirState != lastPirState){
	  	  wait = true;
		  ts = millis();
		  if(stepOut > outMin)// we didn't finish the last slope
		  	  ts-=timeIn*(stepOut - outMin)/(outMax - outMin);
	  }
	  
	  dt = millis() - ts;
	  
	  if(dt<timeIn)
		stepOut = outMin + dt*(outMax - outMin)/timeIn;  
	  else
	  	stepOut = outMax;
	
  }else{
	  digitalWrite(ledPin,LOW);
	  
	  if(pirState != lastPirState){
		  wait = true;
		  ts = millis();
		  //if(stepOut < outMax)// we didn't finish the last slope
			//  ts-=timeOut*(stepOut - outMax)/(outMin - outMax);
	  }

	  dt = millis() - ts;
	  
	  if(!wait){
		  if(dt<timeOut)
			stepOut = outMax + dt*(outMin - outMax)/timeOut; 
		  else
			stepOut = outMin;
	  }else{
	  	  if(dt>=howlong){
	  	  	wait = false;
			ts = millis();
			if(stepOut < outMax)// we didn't finish the last slope
				ts-=timeOut*(stepOut - outMax)/(outMin - outMax);
		  }
	  }
	

	
		
  }
  
  if(stepOut != lastStepOut){
	  Serial.print("{\"name\":\"gaussianBlur\",\"args\":{\"value\":");
	  Serial.print(outMax - stepOut);
	  Serial.print(",\"pir\":");
	  Serial.print(pirState);
	  Serial.print("}}");
	  Serial.println();
  }
  
  lastStepOut = stepOut;
  lastPirState = pirState;
     
  delay(d);
  
}
