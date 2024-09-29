// Function to return current Time 
const getTime = ()=>{
    const date = new Date();
    let min = String(date.getMinutes());
    if(min.length==1){
        min = `0${min}`;
    }
    return ` ${date.getHours()} : ${min}`;
}
export {getTime}