const mongoose = require('mongoose');
 function  connectToMongoDb(conn){
    if(conn)
    {
         mongoose.connect(conn).then(()=>{console.log("connected to mongoose")}).catch((err)=>{console.log(err)})
        
    }
    else{
        console.log("please pass a connection string ");
    }

}

module.exports ={connectToMongoDb}
