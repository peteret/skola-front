import React, { useEffect, useState } from 'react'
import { DateTime } from 'luxon';


type Props = {}


function timeDifference(date1: any,date2: any) :string {
  var difference = date1.getTime() - date2.getTime();

  var daysDifference = Math.floor(difference/1000/60/60/24);
  difference -= daysDifference*1000*60*60*24

  var hoursDifference = Math.floor(difference/1000/60/60);
  difference -= hoursDifference*1000*60*60

  var minutesDifference = Math.floor(difference/1000/60);
  difference -= minutesDifference*1000*60

  var secondsDifference = Math.floor(difference/1000);

  if(hoursDifference == 0){
    return minutesDifference + ':' + secondsDifference;
  }
  if(minutesDifference == 0){
    return secondsDifference + ''
  }
  else{
    return hoursDifference + ':' + minutesDifference + ':' + secondsDifference;
  }
}

const Home = (props: Props) => {
  let cass = new Date();
  
  const [aktual, setAktual] = useState("Načitavam")
  const [hodina, setHodina] = useState("Načitavam")
  const [cas, setCas] = useState(cass.toLocaleTimeString())


  useEffect(()=>{
    setInterval(()=>{
      cass = new Date();
      let values: (string)[] = ['','07:30:00', '08:15:00', '08:20:00', '09:05:00', '09:15:00', '10:00:00', '10:20:00', '11:05:00', '11:10:00', '11:55:00', '12:25:00', '13:10:00', '13:15:00', '14:00:00', '14:05:00', '14:50:00']; 

      for(let index in values){
        if(values[index] < cass.toLocaleTimeString() && values[Number(index)+1] > cass.toLocaleTimeString()){
          setAktual(index)
          setHodina(timeDifference(new Date('2011-10-10T'+values[Number(index)+1]), cass))
          console.log(timeDifference(new Date('2011-10-10T'+values[Number(index)+1]), cass))
        }
      }

      setCas(cass.toLocaleTimeString());
    }, 1000)
  }, []); 
 
  

  
  return (
    <>
    <h1>{cas}</h1>
    <h2>{aktual}</h2>
    <h3>{hodina}</h3>
    </>
  )
}

export default Home