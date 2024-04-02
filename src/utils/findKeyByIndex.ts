import axios from "axios";

const URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : '';

const findKeyByIndex = async (index: number): Promise<string | null> => {
    const response = await axios.get(URL+'/marks.json');
    const data = response.data;
    const keys = Object.keys(data);
    const keyAtIndex = keys[index] || null; 
    return keyAtIndex;
};

export default findKeyByIndex;