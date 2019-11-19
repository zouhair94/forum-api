const saltRounds = 10;


const getBodyReq = (reqObj,arr) => {
    const jobArr = {};
    for(let item in reqObj){
        if(arr.includes(item)){
            jobArr[item] = reqObj[item];
        }
    }
    return jobArr;
}

module.exports = {
    saltRounds,
    getBodyReq
};
