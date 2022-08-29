import axios from "axios";
import { ref } from "vue"

const search = () => {
    const searchData = ref([]);
    const searchRequest = async (input) => {
        await axios.get('http://api.weatherapi.com/v1/search.json?key=e00e25e900a34ea2b8340423221808&q=' + input)
            .then((response) => {
                searchData.value = response.data;
            })
    }
    return { searchData, searchRequest }

}
export default search