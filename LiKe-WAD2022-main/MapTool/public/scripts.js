//const { application } = require("express");


let loginbtn = document.getElementById('submitButton');
let logoutbtn = document.getElementById('LogoutButton');
let showAllbtn = document.getElementById('ShowAllButton');
let showMybtn = document.getElementById('ShowMyButton');
let addbtn = document.getElementById('AddButton');
let logindiv = document.getElementById('login');
let maindiv = document.getElementById('main');
let updatediv = document.getElementById('updatecontact');
let adddiv = document.getElementById('addcontact');
let loginname = document.getElementById('loginname');
let loginpw = document.getElementById('loginpw');
let greeting = document.getElementById('greeting');
let contacts = document.getElementById('contacts');
let addbtn2 = document.getElementById('addbtn2');
let updatebtn = document.getElementById('update');
let deletebtn = document.getElementById('delete');

let addfn = document.getElementById('addfn');
let addln = document.getElementById('addln');
let addstreet = document.getElementById('addstreet');
let addzip = document.getElementById('addzip');
let addcity = document.getElementById('addcity');
let addcountry = document.getElementById('addcountry');
let addphone = document.getElementById('addphone');
let addbirth = document.getElementById('addbirth');
let cb = document.getElementById('addvis');

let firstname= document.getElementById('firstname');
let lastname= document.getElementById('lastname');
let StreetAndNumber= document.getElementById('StreetAndNumber');
let zip= document.getElementById('zip');
let city= document.getElementById('city');
let country= document.getElementById('country');
let phone= document.getElementById('phone');
let dateOfBirth= document.getElementById('dateOfBirth');
let publicOrPrivate = document.getElementById('publicOrPrivate');


let url = 'https://nominatim.openstreetmap.org/search?';

let firstnametext = document.getElementById('firstnametext');
let option = document.getElementById('option');
let contactbutton= document.getElementById('contactbutton');

let accu  = {username: "", password: "", role:""};
let anzeige ="";
let contactname="";
let visset= false;
let nameMarkerMap = new Map();
let markers;





//let kontakt = {1:{name: "Karsten", koord: "52.5188, 13.3899", owner: "admina", vis: "0"},2:{name: "Tobias", koord: "52.5168, 13.3879", owner: "admina", vis: "1"}, 3:{name: "Marie", koord: "52.5168, 13.3869", owner: "normalo", vis: "0"}, 4:{name: "Miriam", koord: "52.5158, 13.3409", owner: "normalo", vis: "1"}};

let users=[];
let usernames=[];
let kontaktarr=[];
let optionvalue;


/*
let name;
let nachname;
let straßeUndNummer;
let zip;
let stadt;
let land;
let telefonnummer;
let gebutsdatum;
let visability;
let owner;
let koordinates;
*/
/*
const mongourl = 'mongodb://localhost:27017'
let MongoClient = require('mongodb').MongoClient;
MongoClient.connect (mongourl, function (err, client) {
    if(err) throw err;
    let db = client.db("advizDB");
    db.createCollection('users');
    db.users.insertMany(
        {username: "admina", password: "password", role:"admin"},
        {username: "normalo", password: "password", role:"normal"}
    );
    db.createCollection('contacts');
    db.contacts.insertMany(
        [ 
            {firstname: "Karsten",lastname:"Müller", StreetAndNumber: "Prenzlauer Allee 196", zip:"10405", city:"Berlin", owner: "admina", vis: "0"},
            {firstname: "Tobias",lastname:"Meier", StreetAndNumber:"Schönhauser Allee 142", zip: "10437", city:"Berlin", owner: "admina", vis: "1"}, 
            {firstname: "Marie", lastname:"Schneider", StreetAndNumber:"Landsberger Allee 153" , zip: "10369", city:"Berlin", owner: "normalo", vis: "0"}, 
            {firstname: "Miriam", lastname:"Schuster", StreetAndNumber:"Berliner Allee 225", zip: "13088", city:"Berlin", owner: "normalo", vis: "1"}
        ]
    );
    //Write code to insert, update, delete documents
    client.close();
    });
    */
//var contacts2 =Array();

/*function saveMarker(marker, username){
    

    return marker;
}
*/

async function funcupdate(){
    console.log(contactname);
    
    const contactjson = JSON.stringify({
        firstname: document.getElementById("firstname").value,
        lastname:document.getElementById("lastname").value,
        StreetAndNumber:document.getElementById("StreetAndNumber").value,
        zip:document.getElementById("zip").value,
        city:document.getElementById("city").value,
        country:document.getElementById("country").value,
        phone:document.getElementById("phone").value,
        dateOfBirth:document.getElementById("dateOfBirth").value,
        owner: accu,
    });
    console.log(contactjson);
    updatediv.style.display ='none';
    fetch("http://localhost:3000/contacts/"+ contactname , {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body:contactjson
    }).then((res) => {
        if(res.ok) {
            console.log("Success");
        }else{
            console.log("Not Successful");
        }
        return res;
    }).then((res)=> res.json())
    .then((data)=> console.log(data))
    .catch((error)=> console.log(error));
    await map.removeLayer(nameMarkerMap.get(contactname));
    //map.removeLayer(nameMarkerMap.get(contactname));
    
    
    putContactsArray();
    showcontacts(accu, visset);
    
    
    maindiv.style.display = 'block'
    
}


async function funcdelete(){
    console.log(contactname);
    updatediv.style.display ='none';
    fetch("http://localhost:3000/contacts/"+ contactname , {
        method: 'Delete',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((res) => {
        if(res.ok) {
            console.log("Success");
        }else{
            console.log("Not Successful");
        }
        
    })
    .catch((error)=> console.log(error));
    await map.removeLayer(nameMarkerMap.get(contactname));
    //map.removeLayer(nameMarkerMap.get(contactname));
    putContactsArray();
    showcontacts(accu, visset);
    maindiv.style.display = 'block'
    
    
}


async function loadUsersArray(){
    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();
    return users;
    
}

document.addEventListener("DOMContentLoaded", async()=>{

    try{
        users= await loadUsersArray();
        /*for(i=0; i; users.length; i++){
            usernames = await users[i].username;
        }*/
        usernames= await users.map(users => users.username)
    }catch(e){
        console.log("Error");
        console.log(e);
    }
    console.log(users)
    console.log(usernames)
});

async function loadContactsArray(){
    const response = await fetch("http://localhost:3000/contacts");
    const contacts = await response.json();
    console.log(contacts);
    return contacts;
    
}

document.addEventListener("DOMContentLoaded",  putContactsArray());

async function putContactsArray(){


    try{
        const contacts = await loadContactsArray();
        console.log(contacts);
        /*for(i=0; i; users.length; i++){
            usernames = await users[i].username;
        }*/
        
        kontaktarr[0] = await contacts.map(contacts => contacts.firstname) //Name
        kontaktarr[1] = await contacts.map(contacts => contacts.lastname) //Nachname
        kontaktarr[2] = await contacts.map(contacts => contacts.StreetAndNumber) //Straße und Nummer
        kontaktarr[3] = await contacts.map(contacts => contacts.zip) //zip
        kontaktarr[4] = await contacts.map(contacts => contacts.city) //Stadt
        kontaktarr[5] = await contacts.map(contacts => contacts.country) //Land
        kontaktarr[6] = await contacts.map(contacts => contacts.phone) //Telefonnummer
        kontaktarr[7] = await contacts.map(contacts => contacts.dateOfBirth) //Geburtsdatum
        kontaktarr[8] = await contacts.map(contacts => contacts.vis) //Visibility 0 = private 1 = public
        kontaktarr[9] = await contacts.map(contacts => contacts.owner) // owner 
        
        console.log(kontaktarr);   
        return kontaktarr;
    }catch(e){
        console.log("Error");
        console.log(e);
    }
    
   
};


function login(loginuser){
    logindiv.style.display = 'none';
    maindiv.style.display = 'block';
    greeting.innerHTML = "Hallo "+loginuser["username"];
    greeting.style.display ="block";
    showcontacts(loginuser, false);
}

const url2 = "https://nominatim.openstreetmap.org/search?";
/*
const params = {
    q: '',
    format:'json',
    addressdetails:'addressdetails'
    };
    */

async function showcontacts(owner, vis){
    anzeige="";
    
    const kontaktarr2 = await putContactsArray();
    
    
    //let url = 'https://nominatim.openstreetmap.org/search?'; //street=Prenzlauer%20Allee%20196&city=Berlin&postalcode=10405&format=json
   
        for(let i = 0; i<kontaktarr2[0].length; i++){
            console.log(kontaktarr2[0][i]);
            //console.log(kontaktarr);
            //console.log(kontaktarr[9][i].username);
            //console.log(kontaktarr[8][i]);
            if(owner["username"] === kontaktarr2[9][i].username){
                console.log(kontaktarr2[0][i]);
                //console.log("zeige meine Kontakte")
                //console.log(owner["username"])
                //anzeige = anzeige +"<option id='option'"+i+" onclick='funccon("+ kontaktarr[0][i] +")' value='"+kontaktarr[0][i]+"'>"+ kontaktarr[0][i]+"</option>";
                anzeige = anzeige +"<option id='option'"+i+" onclick='funccon()' value='"+kontaktarr2[0][i]+"'>"+ kontaktarr2[0][i]+"</option>";
                //optionvalue + 1;
                /*let httpRequest = new XMLHttpRequest();
                httpRequest.open("GET", url + 'street='+ kontaktarr[2][i] + 'postalcode='+ kontaktarr[3][i] + 'city='+ kontaktarr[4][i] + 'state='+kontaktarr[5][i] , true);
                httpRequest.onload= function(){
                    let data = this.response;
                    var ob= JSON.parse(data);
                    console.log(ob);
                    let lng = ob.get(longitude);
                    let lat = ob.get(latitude);
                    console.log(lng);
                    console.log(lat);
                    let marker = L.marker([lat,lng]);
                    marker.addto(map);*/
/*
                    const params = {
                        q: 'street='+ kontaktarr[2][i] + '&city='+ kontaktarr[4][i]+ '&postalcode='+ kontaktarr[3][i]+ '&json',
                        format:'&json',
                        addressdetails:1,
                        polygon_geojson:0
                    };
                    const queryString= new URLSearchParams(params).toString();
                    */
                    const queryString= 'street='+ kontaktarr2[2][i] + '&city='+ kontaktarr2[4][i]+ '&postalcode='+ kontaktarr2[3][i]+ '&format=json'
                    const requestOptions = {
                        method:"GET",
                        redirect:"follow"
                    };
                    /*
                    !async function (queryString, url2, requestOptions){
                        let object = await fetch(`${url2}${queryString}`,requestOptions).then((response)=> response.text()).then((result)=> {
                            console.log(JSON.parse(result));
                         }).then(object =>{ return object})
                         .catch((err)=>console.log("err:" + err));
                         console.log(object);
                         let lon = object.lon;
                         let lat = object.lat;
                         console.log("lon:"+ lon + " lat:" + lat);
                         
                    }();   
                    */
                    
                    !async function (){
                            
                        let data = await fetch(`${url2}${queryString}`,requestOptions)
                        .then((response)=>{
                            //alert('response-status:' + response.status);
                            return response.text();
                        })
                        .then((result)=> {
                            /*if(result){
                                alert("invalid adress");
                            }*/
                            console.log(result);
                            return JSON.parse(result)
                        }).then((json) => {
                                if(json.length=== 0){
                                    alert("invalid adress");
                                }
                                return json;

                        })//.then(object =>{ return object})
                        .catch((err)=>console.log("err:" + err));
                        console.log(data);
                        for(i= 0; i<data.length; i++){
                            //console.log("lat: " + data[i].lat +" lon: " + data[i].lon);
                            nameMarkerMap.set(kontaktarr2[0][i], L.marker([data[i].lat,data[i].lon]).addTo(map));
                            /*console.log(nameMarkerMap.has(kontaktarr2[0][i])===false)
                            if(nameMarkerMap.has(kontaktarr2[0][i])===false){
                                nameMarkerMap.get(kontaktarr2[0][i]).addTo(map);
                                console.log("marker gesetzt");
                            }*/
                        }
                    }();
                    
                        
                    
                    /*
                    let lon = object.get(lon);
                    let lat = object.get(lat);
                    console.log("lon:"+ lon + " lat:" + lat);
                    */
                //httpRequest.send();
            }else if(kontaktarr2[8][i] === true && vis === true ){ //publice contacts anzeigen
                //console.log("zeige öffentliche Kontakte")
                //console.log(kontaktarr[8][i]);
                //console.log(vis);
                //anzeige = anzeige +"<option id='option'"+i+" onclick='funccon("+ kontaktarr[0][i] +")' value='"+kontaktarr[0][i]+"'>"+ kontaktarr[0][i]+"</option>";
                anzeige = anzeige +"<option id='option'"+i+" onclick='funccon()' value='"+kontaktarr2[0][i]+"'>"+ kontaktarr2[0][i]+"</option>";
                //optionvalue +1
                /*let httpRequest = new XMLHttpRequest();
                httpRequest.open("GET", url + 'street='+ kontaktarr[2][i] + 'postalcode='+ kontaktarr[3][i] + 'city='+ kontaktarr[4][i] + 'state='+kontaktarr[5][i] , true);
                httpRequest.onload= function(){
                    let data = this.response;
                    var ob= JSON.parse(data);
                    console.log(ob);
                    let lng = ob.get(longitude);
                    let lat = ob.get(latitude);
                    console.log(lng);
                    console.log(lat);
                    let marker = L.marker([lat,lng]);
                    marker.addto(map);*/
                    /*
                    const params = {
                        q: 'street='+ kontaktarr[2][i] + '&city='+ kontaktarr[4][i]+ '&postalcode='+ kontaktarr[3][i],
                        format:'json',
                        addressdetails:1,
                        polygon_geojson:0
                    };
                    const queryString= new URLSearchParams(params).toString();
                    */
                    const queryString= 'street='+ kontaktarr2[2][i] + '&city='+ kontaktarr2[4][i]+ '&postalcode='+ kontaktarr2[3][i]+ '&format=json'
                    const requestOptions = {
                        method:"GET",
                        redirect:"follow"
                    };
                    
                    !async function (){
                        
                        let data = await fetch(`${url2}${queryString}`,requestOptions).then((response)=>{
                            //alert('response-status:' + response.status);
                            return response.text();
                        }).then((result)=> {
                            /*if(result.length === 0){
                                alert("invalid adress");
                            }*/
                            console.log(result);
                            return JSON.parse(result);
                        }).then((json) => {
                            if(json.length=== 0){
                                alert("invalid adress");
                            }
                            return json;
                        })//.then(object =>{ return object})
                        .catch((err)=>console.log("err:" + err));
                        console.log(data);
                        for(i= 0; i<data.length; i++){
                            //console.log("lat: " + data[i].lat +" lon: " + data[i].lon);
                            nameMarkerMap.set(kontaktarr2[0][i], L.marker([data[i].lat,data[i].lon]).addTo(map));
                            /*console.log(nameMarkerMap.has(kontaktarr2[0][i])===false);
                            if(nameMarkerMap.has(kontaktarr2[0][i])===false){
                                nameMarkerMap.get(kontaktarr2[0][i]).addTo(map);
                                console.log("marker gesetzt");
                            }*/
                        }
                    }();
                    
                    /*
                    !async function (queryString, url2, requestOptions){
                        let object = await fetch(`${url2}${queryString}`,requestOptions).then((response)=> response.text()).then((result)=> {
                            console.log(JSON.parse(result));
                         }).then(object =>{ return object})
                         .catch((err)=>console.log("err:" + err));
                         console.log(object);
                         let lon = object.lon;
                         let lat = object.lat;
                         console.log("lon:"+ lon + " lat:" + lat);
                         
                    }();   
                    */
                    /*
                    fetch(`${url2}${queryString}`,requestOptions).then((response)=> response.text()).then((result)=> {
                        console.log(JSON.parse(result));
                    })
                    .catch((err)=>console.log("err:" + err));
                    */
                    
                    /*
                    let lon = object.get(lon);
                    let lat = object.get(lat);
                    console.log("lon:"+ lon + " lat:" + lat);
                    */
                //httpRequest.send();
            }else if(owner["role"] === "admin" && vis === false){ //alles für admin sichtbar machen
                //console.log(owner["role"]);
                //console.log(vis);
                //anzeige = anzeige +"<option id='option'"+i+" onclick='funccon("+ kontaktarr[0][i] +")' value='"+kontaktarr[0][i]+"'>"+ kontaktarr[0][i]+"</option>";
                anzeige = anzeige +"<option id='option'"+i+" onclick='funccon()' value='"+ kontaktarr2[0][i]+"' >"+ kontaktarr2[0][i]+"</option>";
                //optionvalue +1;
                /*let httpRequest = new XMLHttpRequest();
                httpRequest.open("GET", url + 'street='+ kontaktarr[2][i] + 'postalcode='+ kontaktarr[3][i] + 'city='+ kontaktarr[4][i] + 'state='+kontaktarr[5][i] , true);
                httpRequest.onload= function(){
                    let data = this.response;
                    var ob= JSON.parse(data);
                    console.log(ob);
                    let lng = ob.get(longitude);
                    let lat = ob.get(latitude);
                    console.log(lng);
                    console.log(lat);
                    let marker = L.marker([lat,lng]);
                    marker.addto(map);*/
/*
                    const params = {
                        q: 'street='+ kontaktarr[2][i] + '&city='+ kontaktarr[4][i]+ '&postalcode='+ kontaktarr[3][i],
                        format:'json',
                        addressdetails:1,
                        polygon_geojson:0
                    };
                    const queryString= new URLSearchParams(params).toString();
                    */
                    const queryString= 'street='+ kontaktarr2[2][i] + '&city='+ kontaktarr2[4][i]+ '&postalcode='+ kontaktarr2[3][i]+ '&format=json'
                    const requestOptions = {
                        method:"GET",
                        redirect:"follow"
                    };
                    /*
                    !async function (queryString, url2, requestOptions){
                        let object = await fetch(`${url2}${queryString}`,requestOptions).then((response)=> response.text()).then((result)=> {
                            console.log(JSON.parse(result));
                         }).then(object =>{ return object})
                         .catch((err)=>console.log("err:" + err));
                         console.log(object);
                         let lon = object.lon;
                         let lat = object.lat;
                         console.log("lon:"+ lon + " lat:" + lat);
                         
                    }(); 
                    */  
                   /*
                    fetch(`${url2}${queryString}`,requestOptions).then((response)=> response.text()).then((result)=> {
                        console.log(JSON.parse(result));
                    })
                    .catch((err)=>console.log("err:" + err));
                    */
                    
                    !async function (){
                        
                        let data = await fetch(`${url2}${queryString}`,requestOptions).then((response)=>{
                            //alert('response-status:' + response.status);
                            return response.text();
                        }).then((result)=> {
                            /*if(result.length === 0){
                                alert("invalid adress");
                            }*/
                            console.log(result);
                            return JSON.parse(result);
                        }).then((json) => {
                            if(json.length=== 0){
                                alert("invalid adress");
                            }
                            return json;
                        })
                        //.then(object =>{ return object})
                        .catch((err)=>console.log("err:" + err));
                        console.log(data);
                        for(i= 0; i<data.length; i++){
                            //console.log("lat: " + data[i].lat +" lon: " + data[i].lon);
                            nameMarkerMap.set(kontaktarr2[0][i], L.marker([data[i].lat,data[i].lon]).addTo(map));
                            /*console.log(nameMarkerMap.has(kontaktarr2[0][i])===false);
                            if(nameMarkerMap.has(kontaktarr2[0][i]=== false)){
                                nameMarkerMap.get(kontaktarr2[0][i]).addTo(map);
                                console.log("marker gesetzt");
                            }*/
                        }
                            
                    }();
                    
                       
                    /*
                    let lon = object.get(lon);
                    let lat = object.get(lat);
                    console.log("lon:"+ lon + " lat:" + lat);
                    */
                }
                //httpRequest.send();
            }
            
            contacts.innerHTML = anzeige;
            console.log(anzeige)
        
        }
        
       







function updatecontactbutton(){
    contactname = document.getElementById('contacts').value;
    console.log(contactname);
    var value = document.getElementById('contacts').value;
    console.log(value);
    for(let i = 0; i<kontaktarr[0].length; i++){
        if(value === kontaktarr[0][i]){
            /*
            let name =  kontaktarr[1][i];
            let nachname = kontaktarr[2][i];
            let straßeUndNummer = kontaktarr[3][i];
            let zip = kontaktarr[4][i];
            let stadt = kontaktarr[5][i];
            let land = kontaktarr[6][i];
            let telefonnummer =  kontaktarr[7][i];
            let gebutsdatum =  kontaktarr[8][i];
            let visability =  kontaktarr[9][i];
            let owner =  kontaktarr[10][i];
            let koordinates =  kontaktarr[11][i];
            */
           /*
            firstname.innerHTML =  "<input type='text' id='addln' name='last name' placeholder='"+ kontaktarr[0][i] +"' required></input>" ;
            lastname.innerHTML = "<input type='text' id='addstree' name='street & number' placeholder='"+kontaktarr[1][i]+"' required></input>"; 
            streetAndNumber.innerHTML = "<input type='text' id='addzip' name='zip' placeholder='"+kontaktarr[2][i]+"' required></input>"; 
            zip.innerHTML =  "<input type='text' id='addcity' name='city' placeholder='"+ kontaktarr[3][i] +"' required></input>"; 
            city.innerHTML  = "<input type='text' id='addcountry' name='country' placeholder='"+ kontaktarr[4][i]+"'></input>";
            country.innerHTML = " <input type='text' id='addphone' name='phone' placeholder='"+kontaktarr[5][i]+"'></input>"; 
            phone.innerHTML =  "<input type='date' id='addbirth' name='date of birth' placeholder='"+kontaktarr[6][i]+"'></input>"; 
            dateOfBirth.innerHTML =  "<input type='date' name='date of birth' placeholder='"+kontaktarr[7][i]+"'></input>"; 
            publicOrPrivate.innerHTML =  "<input type='checkbox' name='public' value='"+ kontaktarr[8][i] +"'></input>"; 
            */
            /*
            addfn.innerHTML =  "<input type='text' id='addln' name='last name' required>"+ kontaktarr[0][i] +"</input>" ;
            addln.innerHTML = "<input type='text' id='addstree' name='street & number' required>"+kontaktarr[1][i]+"</input>"; 
            addstreet.innerHTML = "<input type='text' id='addzip' name='zip'  required>"+kontaktarr[2][i]+"</input>"; 
            addzip.innerHTML =  "<input type='text' id='addcity' name='city'  required>"+ kontaktarr[3][i] +"</input>"; 
            addcity.innerHTML = "<input type='text' id='addcountry' name='country' >"+ kontaktarr[4][i]+"</input>";
            addcountry.innerHTML = " <input type='text' id='addphone' name='phone' >"+kontaktarr[5][i]+"</input>"; 
            addphone.innerHTML =  "<input type='date' id='addbirth' name='date of birth' >"+kontaktarr[6][i]+"</input>"; 
            adddate.innerHTML =  "<input type='date' name='date of birth' >"+kontaktarr[7][i]+"</input>"; 
            addvis.innerHTML =  "<input type='checkbox' name='public' >"+ kontaktarr[8][i] +"</input>"; 
            */
           /*
            firstname.innerHTML =  "<input type='text' id='addln' name='last name' required>"+ kontaktarr[0][i] +"</input>" ;
            lastname.innerHTML = "<input type='text' id='addstree' name='street & number' required>"+kontaktarr[1][i]+"</input>"; 
            streetAndNumber.innerHTML = "<input type='text' id='addzip' name='zip'  required>"+kontaktarr[2][i]+"</input>"; 
            zip.innerHTML =  "<input type='text' id='addcity' name='city'  required>"+ kontaktarr[3][i] +"</input>"; 
            city.innerHTML = "<input type='text' id='addcountry' name='country' >"+ kontaktarr[4][i]+"</input>";
            country.innerHTML = " <input type='text' id='addphone' name='phone' >"+kontaktarr[5][i]+"</input>"; 
            phone.innerHTML =  "<input type='date' id='addbirth' name='date of birth' >"+kontaktarr[6][i]+"</input>"; 
            dateOfBirth.innerHTML =  "<input type='date' name='date of birth' >"+kontaktarr[7][i]+"</input>"; 
            publicOrPrivate.innerHTML =  "<input type='checkbox' name='public' value="+ kontaktarr[8][i] +" ></input>"; 
            */
           /*
            firstname.innerHTML =   kontaktarr[0][i];
            lastname.innerHTML = kontaktarr[1][i]; 
            streetAndNumber.innerHTML = kontaktarr[2][i]; 
            zip.innerHTML =  kontaktarr[3][i] ; 
            city.innerHTML =  kontaktarr[4][i];
            country.innerHTML = kontaktarr[5][i]; 
            phone.innerHTML =  kontaktarr[6][i]; 
            dateOfBirth.innerHTML =  kontaktarr[7][i]; 
            publicOrPrivate.innerHTML =  kontaktarr[8][i]; 
            */
            /*
            firstname.innerHTML =  "<input type='text' id='addln' name='last name' placeholder='"+ kontaktarr[0][i] +"' required></input>" ;
            lastname.innerHTML = "<input type='text' id='addstree' name='street & number' placeholder='"+kontaktarr[1][i]+"' required></input>"; 
            streetAndNumber.innerHTML = "<input type='text' id='addzip' name='zip' placeholder='"+kontaktarr[2][i]+"' required></input>"; 
            zip.innerHTML =  "<input type='text' id='addcity' name='city' placeholder='"+ kontaktarr[3][i] +"' required></input>"; 
            city.innerHTML  = "<input type='text' id='addcountry' name='country' placeholder='"+ kontaktarr[4][i]+"'></input>";
            country.innerHTML = " <input type='text' id='addphone' name='phone' placeholder='"+kontaktarr[5][i]+"'></input>"; 
            phone.innerHTML =  "<input type='date' id='addbirth' name='date of birth' placeholder='"+kontaktarr[6][i]+"'></input>"; 
            dateOfBirth.innerHTML =  "<input type='date' name='date of birth' placeholder='"+kontaktarr[7][i]+"'></input>"; 
            publicOrPrivate.innerHTML =  "<input type='checkbox' name='public' value='"+ kontaktarr[8][i] +"'></input>"; 
            
            firstname.style.display= "block";
            lastname.style.display= "block";
            streetAndNumber.style.display= "block";
            zip.style.display= "block";
            city.style.display= "block";
            country.style.display= "block";
            phone.style.display= "block";
            dateOfBirth.style.display= "block";
            publicOrPrivate.style.display= "block";
            */
           /*
           document.getElementById('fistname').value = kontaktarr[0][i];
           document.getElementById('lastname').value = kontaktarr[1][i];
           document.getElementById('streetAndNumber').value = kontaktarr[2][i];
           document.getElementById('zip').value = kontaktarr[3][i];
           document.getElementById('city').value = kontaktarr[4][i];
           document.getElementById('country').value = kontaktarr[5][i];
           document.getElementById('phone').value = kontaktarr[6][i];
           document.getElementById('dateOfBirth').value = kontaktarr[7][i];
           document.getElementById(' publicOrPrivate').value = kontaktarr[8][i];

           */

           document.getElementById('firstname').value = kontaktarr[0][i];
           document.getElementById('lastname').value = kontaktarr[1][i];
           document.getElementById('StreetAndNumber').value = kontaktarr[2][i];
           document.getElementById('zip').value = kontaktarr[3][i];
           document.getElementById('city').value = kontaktarr[4][i];
           document.getElementById('country').value = kontaktarr[5][i];
           document.getElementById('phone').value = kontaktarr[6][i];
           document.getElementById('dateOfBirth').value = kontaktarr[7][i];
           document.getElementById('publicOrPrivate').value = kontaktarr[8][i];
           firstname.style.display= "block";
           lastname.style.display= "block";
           StreetAndNumber.style.display= "block";
           zip.style.display= "block";
           city.style.display= "block";
           country.style.display= "block";
           phone.style.display= "block";
           dateOfBirth.style.display= "block";
           publicOrPrivate.style.display= "block";
        }
    }    
    /*
    document.getElementById('firstname').value = kontaktarr[0][1];
    document.getElementById('lastname').value = kontaktarr[1][1];
    document.getElementById('streetAndNumber').value = kontaktarr[2][1];
    document.getElementById('zip').value = kontaktarr[3][1];
    document.getElementById('city').value = kontaktarr[4][1];
    document.getElementById('country').value = kontaktarr[5][1];
    document.getElementById('phone').value = kontaktarr[6][1];
    document.getElementById('dateOfBirth').value = kontaktarr[7][1];
    document.getElementById(' publicOrPrivate').value = kontaktarr[8][1];
    firstname.style.display= "block";
    lastname.style.display= "block";
    streetAndNumber.style.display= "block";
    zip.style.display= "block";
    city.style.display= "block";
    country.style.display= "block";
    phone.style.display= "block";
    dateOfBirth.style.display= "block";
    publicOrPrivate.style.display= "block";
    */
    funccon();


}
/*
function showcontact(owner, vis = "0"){
    anzeige="";
 
        for(let i = 0; i<kontaktarr[0].length; i++){
            if(owner["username"] === kontaktarr[9][i]){
                anzeige = anzeige +"<option id='option'"+i+" onclick='funccon("+ kontaktarr[0][i] +")'>"+ kontaktarr[0][i]+"</option>";
                contacts2.push(kontaktarr[0][i]);
            }else if(kontaktarr[8][i] === "1" && vis != "0" ){
                anzeige = anzeige +"<option id='option'"+i+" onclick='funccon("+ kontaktarr[0][i] +")'>"+ kontaktarr[0][i]+"</option>";
                contacts2.push(kontaktarr[8][i]);
            }else if(owner["role"] === "admin" && vis != "0"){
                anzeige = anzeige +"<option id='option'"+i+" onclick='funccon("+ kontaktarr[0][i] +")'>"+ kontaktarr[0][i]+"</option>";
                contacts2.push(kontaktarr[0][i]);
            }
         

        }
        contacts.innerHTML = anzeige;
        return contacts2;
}
*/


function funcadd(){
    
    const variable = JSON.stringify({
        firstname: document.getElementById("addfn").value,
        lastname:document.getElementById("addln").value,
        StreetAndNumber:document.getElementById("addstreet").value,
        zip:document.getElementById("addzip").value,
        city:document.getElementById("addcity").value,
        country:document.getElementById("addcountry").value,
        phone:document.getElementById("addphone").value,
        dateOfBirth:document.getElementById("addbirth").value,
        vis: document.getElementById("addvis").checked,
        owner: accu

    });
        
        console.log(variable);
    /*adddiv.style.display ='none';
    kontaktarr[0].push(addfn.value);
    kontaktarr[1].push(addln.value);
    kontaktarr[2].push(addstreet.value);
    kontaktarr[3].push(addzip.value);
    kontaktarr[4].push(addcity.value);
    kontaktarr[5].push(addcountry.value);
    kontaktarr[6].push(addphone.value);
    kontaktarr[7].push(addbirth.value);
    if(addvis.checked === true){
        kontaktarr[8].push("1");
    }else{
        kontaktarr[8].push("0");
    }
    if(accu["username"] === "admina"){
        kontaktarr[9].push("admina");
    }else if(accu["username"] === "normalo"){
        kontaktarr[9].push("normalo");
    }
    maindiv.style.display='block';*/
    console.log(contactname);
    adddiv.style.display ='none';
    fetch("http://localhost:3000/contacts" , {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            /*'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods':'POST',
            'Access-Control-Allow-Headers':'Content-Type'*/
        },
        body:variable,
    }).then((res) => {
        if(res.ok) {
            console.log("Success");
        }else{
            console.log("Not Successful");
        }
        return res;
    }).then((res)=> res.json())
    .then((data)=> console.log(data))
    .catch((error)=> console.log(error));
    putContactsArray();
    showcontacts(accu, visset);



    maindiv.style.display = 'block'
    
}

function getID(stat){
    for(i = 0; i < kontaktarr[0]; i++){
        var id = stat.getAttributeNode(test+i);
        alert(id);
    }
}

function funccon(){
    
    maindiv.style.display='none';
    updatediv.style.display='block';
    //showData(loginuser, namevalue);
   
}
/*
function showData(owner, namevalue){
    contacts2 = showcontacts(owner,"0");
    for(let i = 0; i<contacts2[0].length; i++){
        if(namevalue === contacts[1][i]){
            firstnametext.innerHTML = contacts2[1][i];
            firstnametext.style.display = "block";
        }

    }


}
*/

loginbtn.addEventListener('click', () =>{
    /*if(loginname.value === admina["username"] && loginpw.value === admina["password"]){ 
        accu = admina;
        login(accu);
    }else if(loginname.value === normalo["username"] && loginpw.value === normalo["password"]){
        accu = normalo;
        login(accu);
    }else{
        alert("Falsches Passwort");
    }
    map.invalidateSize();*/
    
    for(i=0; i<users.length; i++){
        if(loginname.value === users[i].username && loginpw.value === users[i].password){
            accu= users[i];
            login(accu);
        } 
    }
    if(accu === {username: "", password: "", role:""} ){
        alert("Falsches Passwort");
    }
     map.invalidateSize();

})

logoutbtn.addEventListener('click', () =>{     
        logindiv.style.display ='block';
        maindiv.style.display = 'none';
})

showAllbtn.addEventListener('click', async () =>{
    /*console.log(nameMarkerMap.values.toGeoJSON())
    markers = L.layerGroup(await nameMarkerMap.values);
    markers.clearLayers(); 
    await markers.addTo(map); */
    map.eachLayer(function (layer){
        if(layer instanceof L.Marker){
            map.removeLayer(layer);
        }
    });
    putContactsArray();
    console.log(kontaktarr);
    showcontacts(accu, true);
    visset= true;
})
showMybtn.addEventListener('click', async () =>{
    /*console.log(nameMarkerMap.values.toGeoJSON()) 
    markers = L.layerGroup(await nameMarkerMap.values);
    markers.clearLayers();
    await markers.addTo(map); */
    map.eachLayer(function (layer){
        if(layer instanceof L.Marker){
            map.removeLayer(layer);
        }
    });
    putContactsArray();
    showcontacts(accu, false);
    visset= false;
})

addbtn.addEventListener('click', () =>{
        maindiv.style.display ='none';
        addcontact.style.display ='block';
})
// Creating map options
var mapOptions = {
    center: [52.5168, 13.3889],
    zoom: 15
}
                 
// Creating a map object
let map = new L.map('map', mapOptions);
                 
// Creating a Layer object
let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
                 
// Adding layer to the map
map.addLayer(layer);




/*
var marker = new L.Marker([52.5168, 13.3889]);
marker.addTo(map);
*/