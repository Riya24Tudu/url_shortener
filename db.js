const express=require('express');
const app=express();
app.use(express.json());
var mysql=require ('mysql');
var con=mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"1029384756",
    database: "url"
});

var mysql=require ('mysql');
var md5=require('md5');
module.exports=app=>{
    app.post('/urlShortner',(req,res)=>{
        const{shortBaseUrl,originalUrl}=req.body;
        if(validUrl.isUri(shortBaseUrl)){}
        else{
            return res.status(404).json('Invalid Base Url');
        }
        if(validUrl.isUri(originalUrl)){}
        else{
            return res.status(404).json('Invalid Original Url');
        }
        const urlCode = md5(originalUrl);
        const updatedAt = new Date();
        shortUrl=shortBaseUrl+"/"+urlCode;
        date=Date.getTime();
        var record=[originalUrl, shortUrl, date];
        con.connect(function(err){
            if(err) throw err;
            var sql="INSERT INTO url_table (actual_url, short_url, createdAt) VALUES ?";
            con.query(sql,[record], function (err, result, fields) {
                if (err) throw err;
           console.log(result); 
            });
        });
        
       
    });

    app.get("/urlRedirect/:shortUrl", (req,res)=>{
        const urlCode=req.params.shortUrl;
        con.connect(function(err){
            if(err) throw err;
            var sql="SELECT actual_url FROM url_table WHERE short_url=?";
            con.query(sql,urlCode, function (err, result, fields) {
                if (err) throw err;
                else
                return res.redirect(result);
            });
        });


    });
};
        


con.connect(function(err){
    if(err) throw err;
    con.query("SELECT * FROM url_table", function (err, result, fields) {
        if (err) throw err;
   console.log(result); 
    });
});
const PORT=8080;
app.listen(PORT,()=>{
    console.log("server stared on port:"+PORT);
});

