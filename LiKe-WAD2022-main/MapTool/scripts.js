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

let accu  = {username: "", password: "", role:""};
let anzeige = "";

let admina = {username: "admina", password: "password", role:"admin"};
let normalo = {username: "normalo", password: "password", role:"normal"};

//let kontakt = {1:{name: "Karsten", koord: "52.5188, 13.3899", owner: "admina", vis: "0"},2:{name: "Tobias", koord: "52.5168, 13.3879", owner: "admina", vis: "1"}, 3:{name: "Marie", koord: "52.5168, 13.3869", owner: "normalo", vis: "0"}, 4:{name: "Miriam", koord: "52.5158, 13.3409", owner: "normalo", vis: "1"}};

var kontaktarr = Array();
kontaktarr[0] = Array ("Karsten", "Tobias", "Miriam", "Marie"); //Name
kontaktarr[1] = Array (""); //Nachname
kontaktarr[2] = Array (""); //Straße und Nummer
kontaktarr[3] = Array (""); //zip
kontaktarr[4] = Array (""); //Stadt
kontaktarr[5] = Array (""); //Land
kontaktarr[6] = Array (""); //Telefonnummer
kontaktarr[7] = Array (""); //Geburtsdatum
kontaktarr[8] = Array ("0", "1", "0", "1"); //Visibility 0 = private 1 = public
kontaktarr[9] = Array ("admina", "admina", "normalo", "normalo"); // owner
kontaktarr[10] = Array ("52.5188, 13.3899","52.5168, 13.3879","52.5168, 13.3869","52.5158, 13.3409")


function login(loginuser){
    logindiv.style.display = 'none';
    maindiv.style.display = 'block';
    greeting.innerHTML = "Hallo "+loginuser["username"];
    greeting.style.display ="block";
    showcontacts(loginuser, "0");
}

function showcontacts(owner, vis = "0"){
    anzeige = "";
        for(let i = 0; i<kontaktarr[0].length; i++){
            if(owner["username"] === kontaktarr[9][i]){
                anzeige = anzeige +"<div id='contact'"+i+" onclick='funccon()'>"+ kontaktarr[0][i]+"</div>";
            }else if(kontaktarr[8][i] === "1" && vis != "0" ){
                anzeige = anzeige +"<div id='contact'"+i+" onclick='funccon()'>"+ kontaktarr[0][i]+"</div>";
            }else if(owner["role"] === "admin" && vis != "0"){
                anzeige = anzeige +"<div id='contact'"+i+" onclick='funccon()'>"+ kontaktarr[0][i]+"</div>";
            }
        }
        contacts.innerHTML = anzeige;
}

function funcupdate(){
    updatediv.style.display ='none';
    maindiv.style.display = 'block';
}

function funcadd(){
    adddiv.style.display ='none';
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
    maindiv.style.display='block';
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
}

loginbtn.addEventListener('click', () =>{
    if(loginname.value === admina["username"] && loginpw.value === admina["password"]){ 
        accu = admina;
        login(accu);
    }else if(loginname.value === normalo["username"] && loginpw.value === normalo["password"]){
        accu = normalo;
        login(accu);
    }else{
        alert("Falsches Passwort");
    }
    map.invalidateSize();
})

logoutbtn.addEventListener('click', () =>{     
        logindiv.style.display ='block';
        maindiv.style.display = 'none';
})

showAllbtn.addEventListener('click', () =>{  
    showcontacts(accu, "1");
})

showMybtn.addEventListener('click', () =>{  
    showcontacts(accu, "0");
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
var map = new L.map('map', mapOptions);
                 
// Creating a Layer object
var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
                 
// Adding layer to the map
map.addLayer(layer);

var marker = new L.Marker([52.5168, 13.3889]);
marker.addTo(map);