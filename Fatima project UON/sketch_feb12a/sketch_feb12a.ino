#include <Wire.h> 
#include <LiquidCrystal_I2C.h>
// #include <Servo.h> 

LiquidCrystal_I2C lcd(0x27,16,2);
// Servo myservo;


int Bzr = 11;
int Green = 12;
int Red = 13;
int IR1 = 2;
int IR2 = 3;
int M1 = 6;

int Slot = 4;
int flag1 = 0;
int flag2 = 0;

void setup() {
  Serial.begin(9600); 
  lcd.init();
  lcd.backlight();

  pinMode(Bzr, OUTPUT);
  pinMode(Green, OUTPUT);
  pinMode(Red, OUTPUT);
  pinMode(IR1, INPUT);
  pinMode(IR2, INPUT);
  pinMode(M1, INPUT);
 
  // myservo.attach(4);
  // myservo.write(100);

  lcd.setCursor(0,0);
  lcd.print("     ARSLAN     ");
  lcd.setCursor (0,1);
  lcd.print(" PARKING SYSTEM ");

  delay (2000);
  lcd.clear();
}
// /*
void loop(){
  if(digitalRead (IR1) == LOW && flag1==0){
    flag1=1;
    if(Slot>0){
        // myservo.write(0);
        digitalWrite(Bzr,HIGH);
        digitalWrite(Green,HIGH);
        delay(1000);
        // myservo.write(100);
        digitalWrite(Bzr,LOW);
        digitalWrite(Green,LOW);
        Slot = Slot-1;
    }
    else{
      lcd.setCursor (0,0);
      lcd.print("    SORRY :(    ");  
      lcd.setCursor (0,1);
      lcd.print("  Parking Full  "); 
      digitalWrite(Bzr,HIGH);
      digitalWrite(Red,HIGH);
      delay (3000);
      digitalWrite(Bzr,LOW);
      digitalWrite(Red,LOW);
      lcd.clear(); 
    }
  }
  else if(digitalRead (IR1) == HIGH && flag1==1){
    // myservo.write(100);
    flag1 = 0;
  }

  if (digitalRead (IR2) == LOW && flag2==0){
      flag2=1;
      // myservo.write(0);
      digitalWrite(Bzr,HIGH);
      digitalWrite(Green,HIGH);
      delay(1000);
      digitalWrite(Bzr,LOW);
      digitalWrite(Green,LOW);
      // myservo.write(100);
      Slot = Slot+1;
  }
  else if(digitalRead (IR2) == HIGH && flag2==1){
    // myservo.write(100);
    flag2 = 0;
  }
  lcd.setCursor (0,0);
  lcd.print("    Welcome!    ");
  lcd.setCursor (0,1);
  lcd.print("Slot Left: ");
  lcd.print(Slot);
  if (Slot<10) {
    lcd.setCursor(12, 1);
    lcd.print(" ");
  }
}
// */

void alarm(){
  digitalWrite(Bzr,HIGH);
  delay(100);
  digitalWrite(Bzr,LOW);
  delay(30);
  digitalWrite(Bzr,HIGH);
  delay(100);
  digitalWrite(Bzr,LOW);
  delay(30);
  delay(300);
}
