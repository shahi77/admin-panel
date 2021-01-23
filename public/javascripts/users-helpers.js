var db=require('../javascripts/mongo')
var collection=require('../javascripts/collection')
const bcrypt=require('bcrypt')
const objectdId=require('mongodb').ObjectID
const { ObjectID, ObjectId } = require('mongodb')
const { userCollection } = require('../javascripts/collection')
module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.password=await bcrypt.hash(userData.password,10)
            await db.get().collection(collection.userCollection).insertOne(userData).then((data)=>{
                resolve(data.ops[0])
             })
            
           
        })
       
    },
    getAllUserDetails:()=>{
return new Promise ((resolve,reject)=>{
    let details=db.get().collection(collection.userCollection).find().toArray()
    resolve(details)
})
    },

    deletedetails:((prodid)=>{
return new Promise((resolve,reject)=>{
    db.get().collection(collection.userCollection).removeOne({_id:objectdId(prodid)}).then((response)=>{
        console.log(response);
 resolve(response)
    })
})
    }),
    getUserDetails:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.userCollection).findOne({_id:ObjectId(proId)}).then((users)=>{
                 resolve(users)
            })
        })
    },

    updateDetails:(proId,proDetails)=>{
return new Promise((resolve,reject)=>{
db.get().collection(collection.userCollection).updateOne({_id:ObjectId(proId)},{
    $set:{
        name:proDetails.name,
        email:proDetails.email
    }
}).then((response)=>{
    resolve()
})
})
    },

    doLogin:(userData)=>{
        
        return new Promise (async(resolve,reject)=>{
            let loginStatus= false
            let response={}
       let user=await db.get().collection(collection.userCollection).findOne({email:userData.email})


if(user){
    bcrypt.compare(userData.password,user.password).then((status)=>{
        if(status){
            console.log('login success');
            response.user=user
            response.status=true
            resolve(response)
        }else{
            console.log('login failed');
            resolve({status:false})
        }
    })
}else{
    console.log('login failed');
    resolve({status:false})
}

        })
    }
}

