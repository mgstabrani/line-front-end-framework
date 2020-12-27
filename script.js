////LIFFF/////
const defaultLiffId = "1655315854-XEoJBop8";
myLiffId = defaultLiffId;

function getData(){
    document.getElementById('jumlah-krabby-patty').innerHTML = localStorage.getItem('krabbyPatty');
    document.getElementById('jumlah-fried-chicken').innerHTML = localStorage.getItem('friedChicken');
    document.getElementById('jumlah-milkshake').innerHTML = localStorage.getItem('milkshake');
    document.getElementById('jumlah-orange-juice').innerHTML = localStorage.getItem('orangeJuice');
    jumlahPesanan();
    harga();
    initializeLiffOrDie(myLiffId);
}

function postData(){
    var krabbyPatty = document.getElementById('jumlah-krabby-patty').innerHTML;
    var friedChicken = document.getElementById('jumlah-fried-chicken').innerHTML;
    var milkshake = document.getElementById('jumlah-milkshake').innerHTML;
    var orangeJuice = document.getElementById('jumlah-orange-juice').innerHTML;
    localStorage.setItem('krabbyPatty',krabbyPatty);
    localStorage.setItem('friedChicken',friedChicken);
    localStorage.setItem('milkshake',milkshake);
    localStorage.setItem('orangeJuice',orangeJuice);
}

function jumlahPesanan(){
    var krabbyPatty = document.getElementById('jumlah-krabby-patty').innerHTML;
    var friedChicken = document.getElementById('jumlah-fried-chicken').innerHTML;
    var milkshake = document.getElementById('jumlah-milkshake').innerHTML;
    var orangeJuice = document.getElementById('jumlah-orange-juice').innerHTML;
    var tampil = [];
    if(krabbyPatty > 0){
        tampil.push(krabbyPatty+" Krabby Patty");
    }
    if(friedChicken > 0){
        tampil.push(" "+friedChicken+" Fried Chicken");
    }
    if(milkshake > 0){
        tampil.push(" "+milkshake+" Milkshake");
    }
    if(orangeJuice > 0){
        tampil.push(" "+orangeJuice+" Orange Juice");
    }
    document.getElementById('total').innerHTML = tampil;
}

function harga(){
    var krabbyPatty = document.getElementById('jumlah-krabby-patty').innerHTML;
    var friedChicken = document.getElementById('jumlah-fried-chicken').innerHTML;
    var milkshake = document.getElementById('jumlah-milkshake').innerHTML;
    var orangeJuice = document.getElementById('jumlah-orange-juice').innerHTML;
    document.getElementById('harga').innerHTML = "Rp"+(krabbyPatty*50000 + friedChicken*40000 + milkshake*20000 + orangeJuice*10000);
}

function add(data){
    document.getElementById(data).innerHTML++;
    jumlahPesanan();
    harga();
    postData();
}

function kurang(data){
    if(document.getElementById(data).innerHTML > 0){
        document.getElementById(data).innerHTML--;
    }
    jumlahPesanan();
    harga();
    postData();
}

function initializeLiffOrDie(myLiffId) {
    if (!myLiffId) {
        document.getElementById("liffAppContent").classList.add('hidden');
        document.getElementById("liffIdErrorMessage").classList.remove('hidden');
    } else {
        initializeApp();
    }
}

/**
 * Initialize the app by calling functions handling individual app components
 */
function initializeApp() {
    if (liff.isLoggedIn()) {
        document.getElementById('notLogin').classList.toggle('hidden');
    } else {
        document.getElementById('liffAppContent').classList.toggle('hidden');
    }
}
 
document.getElementById('openWindowButton').addEventListener('click', function() {
    liff.openWindow({
        url: 'https://krusty-crab.herokuapp.com/',
        external: true
    });
});

document.getElementById('closeWindowButton').addEventListener('click', function() {
    if (!liff.isInClient()) {
        sendAlertIfNotInClient();
    } else {
        liff.closeWindow();
    }
});

document.getElementById('liffLoginButton').addEventListener('click', function() {
    if (!liff.isLoggedIn()) {
        liff.login();
    }
});

document.getElementById('liffLogoutButton').addEventListener('click', function() {
    if (liff.isLoggedIn()) {
        liff.logout();
        window.location.reload();
    }
});

document.getElementById('sendMessageButton').addEventListener('click', function() {
    if (!liff.isInClient()) {
        sendAlertIfNotInClient();
    } else {
        liff.sendMessages([{
            'type': 'text',
            'text': "Anda telah menggunakan fitur Send Message!"
        }]).then(function() {
            window.alert('Ini adalah pesan dari fitur Send Message');
        }).catch(function(error) {
            window.alert('Error sending message: ' + error);
        });
    }
});