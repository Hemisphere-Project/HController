























.build/micro/arduinoMaxbotix/Maxbotix.o : lib/arduinoMaxbotix/Maxbotix.cpp
	@echo [93marduinoMaxbotix/Maxbotix.cpp[0m
	@mkdir -p .build/micro/arduinoMaxbotix
	@/Applications/Arduino.app/Contents/Resources/Java/hardware/tools/avr/bin/avr-g++ -mmcu=atmega32u4 -DF_CPU=16000000L -DARDUINO=105 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -ffunction-sections -fdata-sections -g -Os -w -DUSB_VID=0x2341 -DUSB_PID=0x8037 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/variants/micro -Ilib/arduinoMaxbotix -Ilib/Base64 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/avr-libc -fno-exceptions  -o $@ -c lib/arduinoMaxbotix/Maxbotix.cpp
include .build/micro/arduinoMaxbotix/Maxbotix.d

.build/micro/arduinoMaxbotix/RxSoftwareSerial.o : lib/arduinoMaxbotix/RxSoftwareSerial.cpp
	@echo [93marduinoMaxbotix/RxSoftwareSerial.cpp[0m
	@mkdir -p .build/micro/arduinoMaxbotix
	@/Applications/Arduino.app/Contents/Resources/Java/hardware/tools/avr/bin/avr-g++ -mmcu=atmega32u4 -DF_CPU=16000000L -DARDUINO=105 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -ffunction-sections -fdata-sections -g -Os -w -DUSB_VID=0x2341 -DUSB_PID=0x8037 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/variants/micro -Ilib/arduinoMaxbotix -Ilib/Base64 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/avr-libc -fno-exceptions  -o $@ -c lib/arduinoMaxbotix/RxSoftwareSerial.cpp
include .build/micro/arduinoMaxbotix/RxSoftwareSerial.d



.build/micro/arduinoMaxbotix/libarduinoMaxbotix.a : .build/micro/arduinoMaxbotix/Maxbotix.o .build/micro/arduinoMaxbotix/RxSoftwareSerial.o
	@echo [92mLinking libarduinoMaxbotix.a[0m
	@/Applications/Arduino.app/Contents/Resources/Java/hardware/tools/avr/bin/avr-ar rcs $@ $^












.build/micro/Base64/Base64.o : lib/Base64/Base64.cpp
	@echo [93mBase64/Base64.cpp[0m
	@mkdir -p .build/micro/Base64
	@/Applications/Arduino.app/Contents/Resources/Java/hardware/tools/avr/bin/avr-g++ -mmcu=atmega32u4 -DF_CPU=16000000L -DARDUINO=105 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -ffunction-sections -fdata-sections -g -Os -w -DUSB_VID=0x2341 -DUSB_PID=0x8037 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/variants/micro -Ilib/arduinoMaxbotix -Ilib/Base64 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/avr-libc -fno-exceptions  -o $@ -c lib/Base64/Base64.cpp
include .build/micro/Base64/Base64.d



.build/micro/Base64/libBase64.a : .build/micro/Base64/Base64.o
	@echo [92mLinking libBase64.a[0m
	@/Applications/Arduino.app/Contents/Resources/Java/hardware/tools/avr/bin/avr-ar rcs $@ $^







.build/micro/arduino/avr-libc/malloc.o : /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/avr-libc/malloc.c
	@echo [93marduino/avr-libc/malloc.c[0m
	@mkdir -p .build/micro/arduino/avr-libc
	@/Applications/Arduino.app/Contents/Resources/Java/hardware/tools/avr/bin/avr-gcc -mmcu=atmega32u4 -DF_CPU=16000000L -DARDUINO=105 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -ffunction-sections -fdata-sections -g -Os -w -DUSB_VID=0x2341 -DUSB_PID=0x8037 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/variants/micro -Ilib/arduinoMaxbotix -Ilib/Base64 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/avr-libc   -o $@ -c /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/avr-libc/malloc.c
include .build/micro/arduino/avr-libc/malloc.d

.build/micro/arduino/avr-libc/realloc.o : /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/avr-libc/realloc.c
	@echo [93marduino/avr-libc/realloc.c[0m
	@mkdir -p .build/micro/arduino/avr-libc
	@/Applications/Arduino.app/Contents/Resources/Java/hardware/tools/avr/bin/avr-gcc -mmcu=atmega32u4 -DF_CPU=16000000L -DARDUINO=105 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -ffunction-sections -fdata-sections -g -Os -w -DUSB_VID=0x2341 -DUSB_PID=0x8037 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/variants/micro -Ilib/arduinoMaxbotix -Ilib/Base64 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/avr-libc   -o $@ -c /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/avr-libc/realloc.c
include .build/micro/arduino/avr-libc/realloc.d

.build/micro/arduino/WInterrupts.o : /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/WInterrupts.c
	@echo [93marduino/WInterrupts.c[0m
	@mkdir -p .build/micro/arduino
	@/Applications/Arduino.app/Contents/Resources/Java/hardware/tools/avr/bin/avr-gcc -mmcu=atmega32u4 -DF_CPU=16000000L -DARDUINO=105 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -ffunction-sections -fdata-sections -g -Os -w -DUSB_VID=0x2341 -DUSB_PID=0x8037 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/variants/micro -Ilib/arduinoMaxbotix -Ilib/Base64 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/avr-libc   -o $@ -c /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/WInterrupts.c
include .build/micro/arduino/WInterrupts.d

.build/micro/arduino/wiring.o : /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/wiring.c
	@echo [93marduino/wiring.c[0m
	@mkdir -p .build/micro/arduino
	@/Applications/Arduino.app/Contents/Resources/Java/hardware/tools/avr/bin/avr-gcc -mmcu=atmega32u4 -DF_CPU=16000000L -DARDUINO=105 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -ffunction-sections -fdata-sections -g -Os -w -DUSB_VID=0x2341 -DUSB_PID=0x8037 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/variants/micro -Ilib/arduinoMaxbotix -Ilib/Base64 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/avr-libc   -o $@ -c /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/wiring.c
include .build/micro/arduino/wiring.d

.build/micro/arduino/wiring_analog.o : /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/wiring_analog.c
	@echo [93marduino/wiring_analog.c[0m
	@mkdir -p .build/micro/arduino
	@/Applications/Arduino.app/Contents/Resources/Java/hardware/tools/avr/bin/avr-gcc -mmcu=atmega32u4 -DF_CPU=16000000L -DARDUINO=105 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -ffunction-sections -fdata-sections -g -Os -w -DUSB_VID=0x2341 -DUSB_PID=0x8037 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/variants/micro -Ilib/arduinoMaxbotix -Ilib/Base64 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/avr-libc   -o $@ -c /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/wiring_analog.c
include .build/micro/arduino/wiring_analog.d

.build/micro/arduino/wiring_digital.o : /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/wiring_digital.c
	@echo [93marduino/wiring_digital.c[0m
	@mkdir -p .build/micro/arduino
	@/Applications/Arduino.app/Contents/Resources/Java/hardware/tools/avr/bin/avr-gcc -mmcu=atmega32u4 -DF_CPU=16000000L -DARDUINO=105 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -ffunction-sections -fdata-sections -g -Os -w -DUSB_VID=0x2341 -DUSB_PID=0x8037 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/variants/micro -Ilib/arduinoMaxbotix -Ilib/Base64 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/avr-libc   -o $@ -c /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/wiring_digital.c
include .build/micro/arduino/wiring_digital.d

.build/micro/arduino/wiring_pulse.o : /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/wiring_pulse.c
	@echo [93marduino/wiring_pulse.c[0m
	@mkdir -p .build/micro/arduino
	@/Applications/Arduino.app/Contents/Resources/Java/hardware/tools/avr/bin/avr-gcc -mmcu=atmega32u4 -DF_CPU=16000000L -DARDUINO=105 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -ffunction-sections -fdata-sections -g -Os -w -DUSB_VID=0x2341 -DUSB_PID=0x8037 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/variants/micro -Ilib/arduinoMaxbotix -Ilib/Base64 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/avr-libc   -o $@ -c /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/wiring_pulse.c
include .build/micro/arduino/wiring_pulse.d

.build/micro/arduino/wiring_shift.o : /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/wiring_shift.c
	@echo [93marduino/wiring_shift.c[0m
	@mkdir -p .build/micro/arduino
	@/Applications/Arduino.app/Contents/Resources/Java/hardware/tools/avr/bin/avr-gcc -mmcu=atmega32u4 -DF_CPU=16000000L -DARDUINO=105 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -ffunction-sections -fdata-sections -g -Os -w -DUSB_VID=0x2341 -DUSB_PID=0x8037 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/variants/micro -Ilib/arduinoMaxbotix -Ilib/Base64 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/avr-libc   -o $@ -c /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/wiring_shift.c
include .build/micro/arduino/wiring_shift.d






.build/micro/arduino/CDC.o : /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/CDC.cpp
	@echo [93marduino/CDC.cpp[0m
	@mkdir -p .build/micro/arduino
	@/Applications/Arduino.app/Contents/Resources/Java/hardware/tools/avr/bin/avr-g++ -mmcu=atmega32u4 -DF_CPU=16000000L -DARDUINO=105 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -ffunction-sections -fdata-sections -g -Os -w -DUSB_VID=0x2341 -DUSB_PID=0x8037 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/variants/micro -Ilib/arduinoMaxbotix -Ilib/Base64 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/avr-libc -fno-exceptions  -o $@ -c /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/CDC.cpp
include .build/micro/arduino/CDC.d

.build/micro/arduino/HardwareSerial.o : /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/HardwareSerial.cpp
	@echo [93marduino/HardwareSerial.cpp[0m
	@mkdir -p .build/micro/arduino
	@/Applications/Arduino.app/Contents/Resources/Java/hardware/tools/avr/bin/avr-g++ -mmcu=atmega32u4 -DF_CPU=16000000L -DARDUINO=105 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -ffunction-sections -fdata-sections -g -Os -w -DUSB_VID=0x2341 -DUSB_PID=0x8037 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/variants/micro -Ilib/arduinoMaxbotix -Ilib/Base64 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/avr-libc -fno-exceptions  -o $@ -c /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/HardwareSerial.cpp
include .build/micro/arduino/HardwareSerial.d

.build/micro/arduino/HID.o : /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/HID.cpp
	@echo [93marduino/HID.cpp[0m
	@mkdir -p .build/micro/arduino
	@/Applications/Arduino.app/Contents/Resources/Java/hardware/tools/avr/bin/avr-g++ -mmcu=atmega32u4 -DF_CPU=16000000L -DARDUINO=105 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -ffunction-sections -fdata-sections -g -Os -w -DUSB_VID=0x2341 -DUSB_PID=0x8037 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/variants/micro -Ilib/arduinoMaxbotix -Ilib/Base64 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/avr-libc -fno-exceptions  -o $@ -c /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/HID.cpp
include .build/micro/arduino/HID.d

.build/micro/arduino/IPAddress.o : /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/IPAddress.cpp
	@echo [93marduino/IPAddress.cpp[0m
	@mkdir -p .build/micro/arduino
	@/Applications/Arduino.app/Contents/Resources/Java/hardware/tools/avr/bin/avr-g++ -mmcu=atmega32u4 -DF_CPU=16000000L -DARDUINO=105 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -ffunction-sections -fdata-sections -g -Os -w -DUSB_VID=0x2341 -DUSB_PID=0x8037 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/variants/micro -Ilib/arduinoMaxbotix -Ilib/Base64 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/avr-libc -fno-exceptions  -o $@ -c /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/IPAddress.cpp
include .build/micro/arduino/IPAddress.d

.build/micro/arduino/main.o : /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/main.cpp
	@echo [93marduino/main.cpp[0m
	@mkdir -p .build/micro/arduino
	@/Applications/Arduino.app/Contents/Resources/Java/hardware/tools/avr/bin/avr-g++ -mmcu=atmega32u4 -DF_CPU=16000000L -DARDUINO=105 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -ffunction-sections -fdata-sections -g -Os -w -DUSB_VID=0x2341 -DUSB_PID=0x8037 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/variants/micro -Ilib/arduinoMaxbotix -Ilib/Base64 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/avr-libc -fno-exceptions  -o $@ -c /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/main.cpp
include .build/micro/arduino/main.d

.build/micro/arduino/new.o : /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/new.cpp
	@echo [93marduino/new.cpp[0m
	@mkdir -p .build/micro/arduino
	@/Applications/Arduino.app/Contents/Resources/Java/hardware/tools/avr/bin/avr-g++ -mmcu=atmega32u4 -DF_CPU=16000000L -DARDUINO=105 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -ffunction-sections -fdata-sections -g -Os -w -DUSB_VID=0x2341 -DUSB_PID=0x8037 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/variants/micro -Ilib/arduinoMaxbotix -Ilib/Base64 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/avr-libc -fno-exceptions  -o $@ -c /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/new.cpp
include .build/micro/arduino/new.d

.build/micro/arduino/Print.o : /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/Print.cpp
	@echo [93marduino/Print.cpp[0m
	@mkdir -p .build/micro/arduino
	@/Applications/Arduino.app/Contents/Resources/Java/hardware/tools/avr/bin/avr-g++ -mmcu=atmega32u4 -DF_CPU=16000000L -DARDUINO=105 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -ffunction-sections -fdata-sections -g -Os -w -DUSB_VID=0x2341 -DUSB_PID=0x8037 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/variants/micro -Ilib/arduinoMaxbotix -Ilib/Base64 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/avr-libc -fno-exceptions  -o $@ -c /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/Print.cpp
include .build/micro/arduino/Print.d

.build/micro/arduino/Stream.o : /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/Stream.cpp
	@echo [93marduino/Stream.cpp[0m
	@mkdir -p .build/micro/arduino
	@/Applications/Arduino.app/Contents/Resources/Java/hardware/tools/avr/bin/avr-g++ -mmcu=atmega32u4 -DF_CPU=16000000L -DARDUINO=105 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -ffunction-sections -fdata-sections -g -Os -w -DUSB_VID=0x2341 -DUSB_PID=0x8037 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/variants/micro -Ilib/arduinoMaxbotix -Ilib/Base64 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/avr-libc -fno-exceptions  -o $@ -c /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/Stream.cpp
include .build/micro/arduino/Stream.d

.build/micro/arduino/Tone.o : /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/Tone.cpp
	@echo [93marduino/Tone.cpp[0m
	@mkdir -p .build/micro/arduino
	@/Applications/Arduino.app/Contents/Resources/Java/hardware/tools/avr/bin/avr-g++ -mmcu=atmega32u4 -DF_CPU=16000000L -DARDUINO=105 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -ffunction-sections -fdata-sections -g -Os -w -DUSB_VID=0x2341 -DUSB_PID=0x8037 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/variants/micro -Ilib/arduinoMaxbotix -Ilib/Base64 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/avr-libc -fno-exceptions  -o $@ -c /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/Tone.cpp
include .build/micro/arduino/Tone.d

.build/micro/arduino/USBCore.o : /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/USBCore.cpp
	@echo [93marduino/USBCore.cpp[0m
	@mkdir -p .build/micro/arduino
	@/Applications/Arduino.app/Contents/Resources/Java/hardware/tools/avr/bin/avr-g++ -mmcu=atmega32u4 -DF_CPU=16000000L -DARDUINO=105 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -ffunction-sections -fdata-sections -g -Os -w -DUSB_VID=0x2341 -DUSB_PID=0x8037 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/variants/micro -Ilib/arduinoMaxbotix -Ilib/Base64 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/avr-libc -fno-exceptions  -o $@ -c /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/USBCore.cpp
include .build/micro/arduino/USBCore.d

.build/micro/arduino/WMath.o : /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/WMath.cpp
	@echo [93marduino/WMath.cpp[0m
	@mkdir -p .build/micro/arduino
	@/Applications/Arduino.app/Contents/Resources/Java/hardware/tools/avr/bin/avr-g++ -mmcu=atmega32u4 -DF_CPU=16000000L -DARDUINO=105 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -ffunction-sections -fdata-sections -g -Os -w -DUSB_VID=0x2341 -DUSB_PID=0x8037 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/variants/micro -Ilib/arduinoMaxbotix -Ilib/Base64 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/avr-libc -fno-exceptions  -o $@ -c /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/WMath.cpp
include .build/micro/arduino/WMath.d

.build/micro/arduino/WString.o : /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/WString.cpp
	@echo [93marduino/WString.cpp[0m
	@mkdir -p .build/micro/arduino
	@/Applications/Arduino.app/Contents/Resources/Java/hardware/tools/avr/bin/avr-g++ -mmcu=atmega32u4 -DF_CPU=16000000L -DARDUINO=105 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -ffunction-sections -fdata-sections -g -Os -w -DUSB_VID=0x2341 -DUSB_PID=0x8037 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/variants/micro -Ilib/arduinoMaxbotix -Ilib/Base64 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/avr-libc -fno-exceptions  -o $@ -c /Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/WString.cpp
include .build/micro/arduino/WString.d



.build/micro/arduino/libarduino.a : .build/micro/arduino/avr-libc/malloc.o .build/micro/arduino/avr-libc/realloc.o .build/micro/arduino/WInterrupts.o .build/micro/arduino/wiring.o .build/micro/arduino/wiring_analog.o .build/micro/arduino/wiring_digital.o .build/micro/arduino/wiring_pulse.o .build/micro/arduino/wiring_shift.o .build/micro/arduino/CDC.o .build/micro/arduino/HardwareSerial.o .build/micro/arduino/HID.o .build/micro/arduino/IPAddress.o .build/micro/arduino/main.o .build/micro/arduino/new.o .build/micro/arduino/Print.o .build/micro/arduino/Stream.o .build/micro/arduino/Tone.o .build/micro/arduino/USBCore.o .build/micro/arduino/WMath.o .build/micro/arduino/WString.o
	@echo [92mLinking libarduino.a[0m
	@/Applications/Arduino.app/Contents/Resources/Java/hardware/tools/avr/bin/avr-ar rcs $@ $^















.build/micro/src/sketch.o : .build/micro/src/sketch.cpp
	@echo [93msrc/sketch.cpp[0m
	@mkdir -p .build/micro/src
	@/Applications/Arduino.app/Contents/Resources/Java/hardware/tools/avr/bin/avr-g++ -mmcu=atmega32u4 -DF_CPU=16000000L -DARDUINO=105 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -ffunction-sections -fdata-sections -g -Os -w -DUSB_VID=0x2341 -DUSB_PID=0x8037 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/variants/micro -Ilib/arduinoMaxbotix -Ilib/Base64 -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino -I/Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/cores/arduino/avr-libc -fno-exceptions -iquote src  -o $@ -c .build/micro/src/sketch.cpp
include .build/micro/src/sketch.d







.build/micro/firmware.elf : .build/micro/src/sketch.o .build/micro/arduinoMaxbotix/libarduinoMaxbotix.a .build/micro/Base64/libBase64.a .build/micro/arduino/libarduino.a
	@echo [92mLinking firmware.elf[0m
	@/Applications/Arduino.app/Contents/Resources/Java/hardware/tools/avr/bin/avr-gcc -mmcu=atmega32u4 -Wl,-Os -Wl,--gc-sections -o $@ $^ -lm


.build/micro/firmware.hex : .build/micro/firmware.elf
	@echo [92mConverting to firmware.hex[0m
	@/Applications/Arduino.app/Contents/Resources/Java/hardware/tools/avr/bin/avr-objcopy -O ihex -R .eeprom $^ $@

include .build/micro/src/dependencies.d .build/micro/arduino/dependencies.d .build/micro/arduinoMaxbotix/dependencies.d .build/micro/Base64/dependencies.d

all : .build/micro/firmware.hex
	@true

