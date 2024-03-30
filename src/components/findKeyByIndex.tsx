import axios from "axios";

const URL = 'https://viso-task-70f56-default-rtdb.europe-west1.firebasedatabase.app/marks.json';

const findKeyByIndex = async (index: number): Promise<string | null> => {
    const response = await axios.get(URL);
    const data = response.data;
    const keys = Object.keys(data);
    const keyAtIndex = keys[index] || null; 
    return keyAtIndex;
};

export default findKeyByIndex;