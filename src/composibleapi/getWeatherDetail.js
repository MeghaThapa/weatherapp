import axios from 'axios';
import { ref } from 'vue';
const getWeatherDetail = () => {
    const weatherData = ref({});
    const weatherDetail = async (input) => {

        axios.get('http://api.weatherapi.com/v1/forecast.json?key=e00e25e900a34ea2b8340423221808&q=' + input + '&aqi=no&days=7')
            .then((response) => {

                weatherData.value = response.data;
                // console.log(weatherData.value);
            })

    }
    return { weatherDetail, weatherData };
}
export default getWeatherDetail;