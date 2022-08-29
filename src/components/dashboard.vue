<template>
 <div class="outerBox" >
    <div class="content">;
      <div class="TitleSearch">
      <div style="font-size: 35px; font-weight: bold; width:60%">Weather Forecast</div>

      <div class="input-icons" style="margin-top:10px;width:40%">
              
              
               <selectTwo @selected="selectedCity">
                <!-- <i class="fa-solid fa-magnifying-glass icon"></i> -->
               </selectTwo>
            </div>
            
      </div>
      <div style="display:flex;flex-direction:column; width:25%; margin-left:70px; text-align: justify; margin-top:1cm;">
              <p style="font-size:20px; font-weight:bold; font-family: Georgia;"> Week</p>
              <div style="font-family:Garamond; font-weight:bold; font-size:22px; ">
              
              
              <table style="table-bordered" v-if="weatherData.forecast">
            
                <tr style="height:65px;"  v-for="(days,i) in weatherData.forecast.forecastday" :key="i" >
                  
                  <td >
                    <div style="width:150px;">
                      {{getDaysName(days.date)}}
                    </div>
                    </td>
                 
                 
                  <td >
                    <div style="width:150px;">
                    <i class="fa-solid fa-droplet">     <span style="font-size:12px;">{{days.day.avghumidity}} %</span></i>
                  </div>
                  </td>
                  <td>
                  <div style="width:150px;">
                    <img  width="50" height="50" :src="days.day.condition.icon" :alt="days.day.condition.text" :title="days.day.condition.text" >
                  </div>
                  </td>
              
                </tr>  
              </table>             
              </div>
            </div>
    </div>
    <div class="side-content">
      <div class="cloud" style="float:right;">
                <i class="fa-solid fa-cloud fa-4x"></i>
          </div>
      <div class="sunToday">
            <div class="sun">
            <i class="fa-solid fa-sun-bright fa-xl"></i>
            </div>
           <div id="dateD">
                <div class="today">Today</div>
                <div style="font-size:12px;">{{date}}</div>
           </div>       
    </div>
          <div class="cloud" style="float:left;">
                <i class="fa-solid fa-cloud fa-5x"></i>
          </div>

     <div class="cloud" style="margin-top:5cm; float:right;">
                <i class="fa-solid fa-cloud fa-2x"></i>
     </div>
     <div style="display: flex;flex-direction: column;margin-top:60px; align-items: center;
    justify-content: center;">
          <div class="degreeNumber" style="display: flex;height: 100px; " >
            <div class="numb"  style="color:white;display:inline-block; font-size: 80px;" v-if="weatherData.current">
              {{weatherData.current.temp_c}}
              </div>
            <div style="color:white; font-size:25px;margin-top: 20px;" class="deg">°C</div>
          </div>
          <div style="display: flex;color:white" >
           <div style="display:inline-block;"><div v-if="weatherData.location">{{weatherData.location.name}},</div></div>
        <div style="display:inline-block;"><div v-if="weatherData.location">{{weatherData.location.country}}</div></div>
          </div>
     
 </div>
 <div style="display:flex;  margin-left:25%; margin-top:15px; font-size:13px; color:white;">
    Feels Like  &nbsp; <div v-if="weatherData.current">{{weatherData.current.feelslike_c}}°C, </div> &nbsp; Sunrise: &nbsp;<div v-if="weatherData.forecast">{{weatherData.forecast.forecastday[0].astro.sunrise}}</div>

 </div>
 <div style="display:flex;  justify-content: center; margin-top:80px; color:white;">
 <div style="width:33.3%; display:flex; flex-direction:column;">
      <i class="fa-solid fa-clouds fa-2x" ></i>
      <div v-if="weatherData.current">{{weatherData.current.wind_mph}} mp/h</div>
 </div>

  <div style="width:33.3%; display:flex; flex-direction:column;">
        <i class="fa-solid fa-droplet-degree fa-2x"></i>
       
         <div v-if="weatherData.current">{{weatherData.current. humidity}}%</div>
  </div>

  <div style="width:33.3%; display:flex; flex-direction:column;">
      <i class="fa-solid fa-heat fa-2x"></i>
         <div v-if="weatherData.current">{{weatherData.current.pressure_in}}pa</div>


  </div>

 </div>         
    </div>
 </div>
</template>

<script setup>
  
import selectTwo from "./selectTwo.vue";
import { computed, onMounted, reactive, watch } from '@vue/runtime-core';
import getWeatherDetail from '../composibleapi/getWeatherDetail.js';
      const form= reactive({
        placeName:"",
      }

      );
      var today = new Date();
      const {weatherDetail,weatherData}=getWeatherDetail();
      var date = getDayName(today.getDay())+','+today.getDate()+" " +getMonthName((today.getMonth()));

      function getDayName(index){
        const days=["Sun","Mon","Tue","Wed","Thur","Fri","Sat","Sun","Mon","Tue","Wed","Thur","Fri"];
        return days[index];
      }
      
      function getFullDayName(index){
        const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"];
      return days[index];
     }
      const daysNames=getSevenDay();
      function getSevenDay(){
        const days=[];
        for(let i=0;i<7;i++){ 
          days.push(getFullDayName(today.getDay()+i));
          // days.push(today.getDay()+i);

        }
        return days;
      
      }
      const getDaysName = ((todayDate)=>{
        let dates = new Date(todayDate)
        return getFullDayName(dates.getDay());
      })

      function getMonthName(index){
        const months=["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];  
        return months[index];
      }
    
    onMounted(()=>{
      weatherDetail("itahari");
    })
    function selectedCity(city){
      weatherDetail(city.name);
          
    }


</script>

<style>
 .input-icons i {
            position: absolute;
        }
          
        .input-icons {
            width: 100%;
            margin-bottom: 10px;
        }
          
        .icon {
            padding: 10px;
            min-width: 40px;
        }
          
        .input-field {
            box-shadow: 2px 5px #888888;
            padding: 10px;
            height:40px; border-radius: 10px;
            text-align: center;
        }
.TitleSearch{
   display:flex; 
    align-items: center;
    justify-content: center;
   text-align: center;
   flex: 1;
   width: 100%;
   margin-top:30px;
   
}
.allign{
    /* display:inline; */
    float:left;
    margin-left:50px;
}
.sunToday{
  margin-top:85px;
  display:flex;
  width:100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right:3cm;
}
#dateD{
 color:white;
 margin-top:0px;
}
.cloud{
  
  color:rgb(72, 50, 72);
}
.today{
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    margin-right:20px;
   
}
.sun{
  color:orange;
  margin-right:15px;

}

.pStyle{
   
   
    float:left;
    color:white;
}
.outerBox{
    margin: auto;
    width:28cm;
    height:110vh;
    border:2px solid black;
    margin-bottom: 25px;
    border-radius: 35px;
    display:flex;
    flex-direction: row;
}
.content{
  background-color: white; 
  height:100%; 
  width:65%;
   border-top-left-radius: 35px;
   border-bottom-left-radius: 35px;
}
.side-content{
    background-color:rgb(30,10,42);
    height:100%;
    width: 35%;
    border-top-right-radius: 35px;
   border-bottom-right-radius: 35px;
}

.temp{
      margin-right:25%;
   }

      

</style>