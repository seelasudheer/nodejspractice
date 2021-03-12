const nodeMailer=require('nodemailer')
const fs=require('fs')
const inviteSchema=require('../Models/InviteList')
const User=require('../Models/User')
const data=["Afghanistan", "Albania", "Algeria", "American Samoa", "Angola", "Anguilla", "Antartica", "Antigua and Barbuda", "Argentina",
 "Armenia", "Aruba", "Ashmore and Cartier Island", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", 
 "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil",
  "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burma", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", 
  "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Clipperton Island", "Cocos (Keeling) Islands",
   "Colombia", "Comoros", "Congo, Democratic Republic", "Congo, Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czeck Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Europa Island", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "Antarctic Lands", "Gabon", "Gambia, The", "Gaza Strip", "Georgia", "Germany", "Ghana", "Gibraltar", "Glorioso Islands", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island", "Holy See (Vatican City)", "Honduras", "Hong Kong", "Howland Island", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Ireland, Northern", "Israel", "Italy", "Jamaica", "Jan Mayen", "Japan", "Jarvis Island", "Jersey", "Johnston Atoll", "Jordan", "Juan de Nova Island", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Man, Isle of", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia", "Midway Islands", "Moldova", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcaim Islands", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romainia", "Russia", "Rwanda", "Saint Helena", "Saint Kitts and Nevis", "Saint Lucia", "Saint Pierre and Miquelon", "Saint Vincent", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Scotland", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia", "Spain", "Spratly Islands", "Sri Lanka", "Sudan", "Suriname", "Svalbard", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Tobago", "Toga", "Tokelau", "Tonga", "Trinidad", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "USA", "Uzbekistan", "Vanuatu", "Venezuela",
 "Vietnam", "Virgin Islands", "Wales", "Wallis and Futuna", "West Bank", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"]

 const cities=(req,res,next)=>{
  // const data1=  fs.readFileSync('Images/hero.txt','utf-8')
   // console.log(data1,"readed file");
    // fs.open('coold.js','w',(err,data)=>{
    //     if(err){
    //         console.log(err);
    //         return;
    //     }
    // })
     //fs.writeFileSync('Images/hero.txt','sdfffffff')
    // fs.appendFileSync('Images/hero.txt','sdfffffff')
   //  fs.renameSync('Images/cool.txt','Images/www.txt')
        res.send(data)
}

const sendMail=async(req,res,next)=>{
    console.log(req.body);
    let parentId=req.body.parentId
 
    let randomId;
    let status;

    try{
        let data=await inviteSchema.find({'email':req.body.email})
 if(data){
     console.log(data,"duplicate");
    //  res.send({})
    return res.send({status:data[0].status})
 }

    }catch(err){

    }

    try{
        console.log(parentId);
        let getData=await User.findById(parentId)
         console.log("#################",getData);
        // res.send({data:getData.schema.tree})
        if(getData && getData.inviteCode){
            randomId=getData.inviteCode
            if(getData && getData.status)
            status=getData.status
            
        }else{
         randomId=makeid(6);
        let updateUser=await User.findOneAndUpdate({_id:parentId},{$set:{inviteCode:randomId}},{new:true})
        console.log(updateUser,"@@@@@@@@@@@@@@@@@@@@");
        }
        
    }catch(err){
        console.log(err,"i came fitty");
    }
    console.log(status,"status");
    if(!status){
    try{
        console.log(randomId);
        let inviList=new inviteSchema({
            sourceId:parentId,
            email:req.body.email,
            referalCode:randomId,
            status:'Applied'
        })
    
   let data=await inviList.save()
   if(data){
      
    console.log(data);

   }

    }
    catch(err){
        console.log(err);
    }
    const transporter=nodeMailer.createTransport({
        service:'hotmail',
        auth:{
            user:"seelasudheer4@gmail.com",
            pass:"Moor$000"
        }
    })
    const options={
        from:"seelasudheer4@gmail.com",
        to:req.body.email,
        subject:"Sending mail with node js",
        text:"Hi Dinesh whats up man",
        html: '<p>Click <a href="http://localhost:3000/signup/' + randomId +'/'+ '">here</a> to reset your password</p>'
    }


     transporter.sendMail(options,(err,result)=>{
           if(err){
               console.log(err,"mailError");
               return;
           }
           console.log(result);
           if(result){
           res.send({result,messgae:"Sent Successfully"})
           }          
    })
}else{
    console.log("Already &&&&&&&&");
    res.send({status:status})
}
}

const getFile=(req,res,next)=>{
           let file=req.body.file
           console.log(req.body);
           if(file){
              console.log(file);
           }
           res.send(file)
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      let v=Math.floor(Math.random() * charactersLength);
      console.log(v)
       result += characters.charAt(v);
    }
    return result;
 }

 const getInviteList=async(req,res,next)=>{
     console.log(req.params,"foooooooolio");
    let id=req.params.id
    try{
   let list=await inviteSchema.find({'sourceId':id})
   console.log(list);
   res.send(list)
    }catch(err){
        console.log(err);
    }
}

module.exports={
    cities,
    sendMail,
    getFile,
    getInviteList
}