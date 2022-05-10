import React, { useEffect, useState } from 'react'
import { DateTime } from 'luxon';
import { idText } from 'typescript';


type Props = {}




const Home = (props: Props) => {
  
  let actionB = false
  const [aktual, setAktual] = useState("Načitavam")
  const [den, setDen] = useState(0)
  const [hodina, setHodina] = useState(0)
  const [minuta, setMinuta] = useState(0)
  const [sekunda, setSekunda] = useState(0)
  const [cas, setCas] = useState(new Date())
  const [caso, setCaso] = useState("0:0:0")


  function timeDifference(date1: any,date2: any) {
    var difference = date1.getTime() - date2.getTime();
  
    var daysDifference = Math.floor(difference/1000/60/60/24);
    difference -= daysDifference*1000*60*60*24
  
    var hoursDifference = Math.floor(difference/1000/60/60);
    difference -= hoursDifference*1000*60*60
  
    var minutesDifference = Math.floor(difference/1000/60);
    difference -= minutesDifference*1000*60
  
    var secondsDifference = Math.floor(difference/1000);
    

    setDen(daysDifference)
    setHodina(hoursDifference);
    setMinuta(minutesDifference);
    setSekunda(secondsDifference);
  }

  function actualStatus(indexo: String){
    let indexo1 = Number(indexo)
    if(indexo1 == 999){
      setAktual("Vidíme sa v pondelok")
      return
    }
    if(indexo1 == 9999){
      setAktual("Vidíme sa zajtra")
      return
    }
    if(indexo1 == 99999){
      setAktual("Do začiatku vyučovania zostáva")
      return
    }
    if(String(indexo1/2).includes(".5")){
      setAktual("Prebieha " + String((indexo1/2)+0.5) + " hodina" )
      if(aktn !==indexo1){
        
      }
    }else{ 
      setAktual("Prebieha prestávka pred " + String((indexo1/2)+1) + " hodinou" )
      if(aktn !==indexo1){
        akt = indexo1
      }
    }
  }
  let akt = 0;
  let aktn = 0;
  let start = 0;
  let url = "";
  let audio = new Audio();

  useEffect(()=>{
    setInterval(()=>{
      let values: (string)[] = ['','07:30:00', '08:15:00', '08:20:00', '09:05:00', '09:15:00', '10:00:00', '10:20:00', '11:05:00', '11:10:00', '11:55:00', '12:25:00', '13:10:00', '13:15:00', '14:00:00', '14:05:00', '14:50:00'];
      // 1 hodina - 16
      // 1 hod koniec - 1
      // 2 hod - 2
      // 2 hod koniec - 3
      // 3 hod - 4 
      // 3 hod koniec - 5
      // 4 hod - 6
      // 4 hod koniec - 7
      // 5 hod - 8 
      // 5 hod koniec - 9
      // 6 hod - 10
      // 6 hod koniec - 11
      // 7 hod - 12
      // 7 hod koniec - 13
      // 8 hod - 14
      // 8 hod koniec - 15


      aktn=akt;

      
      


      for(let index in values){
        let cass = new Date();

        let hodnotaList = values[index].split(":")
        let hodnota = new Date()
        hodnota.setHours(Number(hodnotaList[0]))
        hodnota.setMinutes(Number(hodnotaList[1]))
        hodnota.setSeconds(Number(hodnotaList[2]))

        let hodnota2 = new Date()
        if(Number(index)  == 16){
          let hodnota2List = values[1].split(":")
          hodnota2.setHours(Number(hodnota2List[0]))
          hodnota2.setMinutes(Number(hodnota2List[1]))
          hodnota2.setSeconds(Number(hodnota2List[2]))
        }else{
          let hodnota2List = values[Number(index)+1].split(":")
          hodnota2.setHours(Number(hodnota2List[0]))
          hodnota2.setMinutes(Number(hodnota2List[1]))
          hodnota2.setSeconds(Number(hodnota2List[2]))
        }
        

        let koniec = new Date();
        koniec.setHours(14);
        koniec.setMinutes(50);
        koniec.setSeconds(0);

        let zaciatok = new Date();
        zaciatok.setHours(7)
        zaciatok.setMinutes(30)
        zaciatok.setSeconds(0);


        //aktualny čas
        setCaso(cass.toLocaleTimeString())

        //osetrenie vykendu
        if(koniec.getDay() >= 6){
          let odober = cass.getDay()-5;
          koniec.setDate(zaciatok.getDate()-odober);
        }
        




        //ked je po skole 
        if(cass.getTime() > koniec.getTime()){
          
        //ked je vykend + piatok
          if(cass.getDay() >= 5){
            let pridavok = 8 - cass.getDay();
            zaciatok.setDate(zaciatok.getDate()+pridavok) 
            timeDifference(zaciatok, cass)
            actualStatus("999")
          }else{
            zaciatok.setDate(zaciatok.getDate()+1) 
            timeDifference(zaciatok, cass)
            actualStatus("9999")
          }
        }

        
    
        //počaš skoly
        if( hodnota.getTime() < cass.getTime()&& cass.getTime() < hodnota2.getTime()){
            timeDifference(hodnota2 ,cass)
            actualStatus(index)
            akt = Number(index)
        }
          
        //pred školou
        if(cass.getTime() < zaciatok.getTime()){
          timeDifference(zaciatok ,cass)
          actualStatus("99999")
          akt = 999
        }

        


      }

        
        

      console.log("start    "+start)
      console.log("aktn     "+aktn)
      if(akt !== aktn){
        if(start == 0){
          start = 1;
        }else{
          console.log(aktn)
          url = "https://rozhlas.kasik.sk/ring/play/"+aktn;
          audio = new Audio(url);
          audio.play();
        }
      }
      
    }, 1000)
  }, []); 
 
  

  
  return (
    <>
<h2>{aktual}</h2> 	
<div className="countdown styled">
  {den > 0 &&
    <div>
      {den}
      <span>Den</span>
    </div>
  }
  {hodina > 0 &&
    <div>
      {hodina}
      <span>Hodín</span>
    </div>
  }
  {minuta > 0 &&
    <div>
      {minuta}
      <span>Minút</span>
    </div>
  }
  <div>
    {sekunda}
    <span>Sekúnd</span>
  </div>
</div>
<br /><br />
<h2>{caso}</h2> 
    </>
  )
}

export default Home