import React, { useEffect, useState } from 'react'
import { DateTime } from 'luxon';


type Props = {}




const Home = (props: Props) => {
  
  const [aktual, setAktual] = useState("Načitavam")
  const [den, setDen] = useState(0)
  const [hodina, setHodina] = useState(0)
  const [minuta, setMinuta] = useState(0)
  const [sekunda, setSekunda] = useState(0)
  const [cas, setCas] = useState(new Date())


  function timeDifference(date1: any,date2: any) {
    var difference = date1.getTime() - date2.getTime();
  
    var daysDifference = Math.floor(difference/1000/60/60/24);
    difference -= daysDifference*1000*60*60*24
  
    var hoursDifference = Math.floor(difference/1000/60/60);
    difference -= hoursDifference*1000*60*60
  
    var minutesDifference = Math.floor(difference/1000/60);
    difference -= minutesDifference*1000*60
  
    var secondsDifference = Math.floor(difference/1000);
    
  
    if(date2.getDay() === 5){
      setDen(0);
    }
    else if(date2.getDay() === 6){
      setDen(1);
    }
    else{
      setDen(0);
      
    }
    setHodina(hoursDifference);
    setMinuta(minutesDifference);
    setSekunda(secondsDifference);

  }

  function timeDifferent(date1: any,date2: any) {
    var difference = date1.getTime() - date2.getTime();
  
    var daysDifference = Math.floor(difference/1000/60/60/24);
    difference -= daysDifference*1000*60*60*24
  
    var hoursDifference = Math.floor(difference/1000/60/60);
    difference -= hoursDifference*1000*60*60
  
    var minutesDifference = Math.floor(difference/1000/60);
    difference -= minutesDifference*1000*60
  
    var secondsDifference = Math.floor(difference/1000);
    
  
    if(date2.getDay() === 5){
      setDen(0);
    }
    else if(date2.getDay() === 6){
      setDen(1);
    }
    else{
      setDen(0);
      
    }
    setHodina(hoursDifference);
    setMinuta(minutesDifference);
    setSekunda(secondsDifference);

  }
  let aktualne = "fdsdf";
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


      setCas(new Date());
      let cass = new Date();
      let casOld= new Date();
      aktn=akt;
      for(let index in values){
        let valueS = values[index];
        let value1S = values[Number(index)+1];
        let value = new Date('2011-10-10T'+valueS);
        let value1 = new Date('2011-10-10T'+value1S);
        
        
        if(cass.toLocaleTimeString().length < 8){
          casOld = new Date('2011-10-10T0'+cass.toLocaleTimeString());
        }else{
          casOld = new Date('2011-10-10T'+cass.toLocaleTimeString());
        }

        
        

        if(value.getTime() < casOld.getTime() && value1.getTime() > casOld.getTime()){
          timeDifference(value1, cass)
          if(String(Number(index)/2).includes(".5")){
            setAktual("Prebieha " + String((Number(index)/2)+0.5) + " hodina" )
            if(akt !== Number(index)){
              akt = Number(index);
            }
          }else{ 
            setAktual("Prebieha prestávka pred " + String((Number(index)/2)+1) + " hodinou" )
            if(akt !== Number(index)){
              akt = Number(index);
            }
          }
        }
        
        if(casOld.getTime() < new Date('2011-10-10T'+values[1]).getTime()){
          timeDifference(new Date('2011-10-10T'+values[1]), casOld)
          setAktual("Do 1. hodiny zostáva" )
          if(akt !== Number(index)){
            akt = Number(index);
          }
        }
        if(casOld.getTime() > new Date('2011-10-10T'+values[16]).getTime()){
          timeDifference(new Date('2011-10-10T'+values[1]), casOld)
          setAktual("Ahoj vidíme sa zajtra")
          if(akt !== Number(index)){
            akt = Number(index);
          }
        }
        
      }
      if(akt !== aktn){
        if(start == 0){
          start = 1;
        }else{
          url = "https://rozhlas.webprofik.eu/hour/play/"+aktn;
          audio = new Audio(url);
          audio.play();
        }
        
      }
      
    }, 1000)
  }, []); 
 
  

  
  return (
    <>


    <div className="size1 overlay1">

		<div className="page flex-col-c-m p-t-80" >
			<div className="wrappic1 m-r-30 m-t-10 m-b-10 p-b-40 ">
				<a href="#"><img src="images/logo.png" alt="LOGO" /></a>
			</div>
			<h5 className="l1-txt1 txt-center p-b-40 ">{aktual}</h5>

			<div className="flex-w flex-c-m cd100">
        {den > 0 &&
		      <div className="flex-col-c wsize1 m-b-30">
            <span className="l1-txt2 p-b-9 days">{den}</span>
            <span className="s1-txt1 where1 p-l-35">Den</span>
          </div>
        }
        {hodina > 0 &&
		      <div className="flex-col-c wsize1 m-b-30">
					  <span className="l1-txt2 p-b-9 hours">{hodina}</span>
					  <span className="s1-txt1 where1 p-l-35">Hodin</span>
				  </div>
        }
        {minuta > 0 &&
		      <div className="flex-col-c wsize1 m-b-30">
					  <span className="l1-txt2 p-b-9 minutes">{minuta}</span>
					  <span className="s1-txt1 where1 p-l-35">Minut</span>
				  </div>
        }
		      <div className="flex-col-c wsize1 m-b-30">
					  <span className="l1-txt2 p-b-9 seconds">{sekunda}</span>
					  <span className="s1-txt1 where1 p-l-35">Sekund</span>
				  </div>
			</div>
		</div>
	</div>
    </>
  )
}

export default Home