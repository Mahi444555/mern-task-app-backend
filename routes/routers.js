const express = require("express");
const router = express.Router();
const Users  = require("../models/userSchema");
const users1 = require("../models/userSchema");

// router.get("/",(req,res)=>{
//     console.log("connect")
// });

//register user

router.post ("/register", async(req, res) => {
   // console.log(req.body);
   const {name,email,phone} = req.body;
   
   if(!name || !email || !phone){
        res.status(422).send("plz fill the data");
   }
   try {

    const preuser = await users1.findOne({email:email})
    console.log(preuser);

    if(preuser){
        res.status(422).send("this user is already present");
    }
    else{
        const adduser = new users1({
            name,email,phone
        });

        await adduser.save();
        res.status(201).json(adduser);
        console.log(adduser);
    }

   } catch (error) {
        res.status(422).send(error)
   }
});


//get userdata

router.get("/getdata", async(req,res)=>{
    try {
        const userdata = await users1.find();
        res.status(201).send(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(422).send(error);
    }
})


// Route to delete a user by ID
router.delete('/delete/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
      const deletedUser = await users1.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(422).send({ message: 'User not found' });
      }
  
      res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });



  //get individual user
  router.get("/getuser/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await users1.findById({_id:id});
        console.log(userindividual);
        res.status(201).send({userindividual})
    } catch (error) {
        res.status(422).send({error})

    }
  })

//update user data

router.patch("/updateuser/:id",async(req,res)=>{
  try {
    const {id} = req.params;
  
    const updateduser = await users1.findByIdAndUpdate(id,req.body,{
      new:true
    });
    console.log(updateduser);
    res.status(201).send(updateduser)
  } catch (error) {
      res.status(422).json(error);
  }
})

module.exports = router;













/////////////////////////////////////////////////////////////////////////

// const express = require("express");
// const router = express.Router();
// const Users = require("../models/userSchema");

// router.post("/register", async (req, res) => {
//     try {
//         const { firstName, email, phone } = req.body;
//         const user = new Users({ firstName, email, phone });
//         const savedUser = await user.save();
//         res.json(savedUser);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// module.exports = router;

