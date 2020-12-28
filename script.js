////LIFFF/////
const defaultLiffId = "1655315854-XEoJBop8";
myLiffId = defaultLiffId;

function initializeLiff(myLiffId) {
    liff
        .init({
            liffId: myLiffId
        })
        .then(() => {
            // start to use LIFF's api
            initializeApp();
        })
        .catch((err) => {
            document.getElementById("liffAppContent").classList.add('hidden');
            document.getElementById("liffInitErrorMessage").classList.remove('hidden');
        });
}
/**
 * Initialize the app by calling functions handling individual app components
 */
function initializeApp() {
    if (liff.isLoggedIn()) {
        document.getElementById('notLogin').classList.toggle('hidden');
        const accessToken = liff.getAccessToken();
        if (accessToken) {
            fetch("https://api...", {
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
                }
                //...
            });
            var name = JSON.parse(liff.getProfile());
            document.getElementById('username').innerHTML = name.displayName;
        }
        
    } else {
        document.getElementById('liffAppContent').classList.toggle('hidden');
    }

    console.log(liff.getAccessToken());

    if(liff.isInClient()){
        document.getElementById('liffLogoutButton').classList.toggle('hidden');
    }else{
        document.getElementById('openWindowButton').classList.toggle('hidden');
        document.getElementById('closeWindowButton').classList.toggle('hidden');
    }
}

function getData(){
    document.getElementById('jumlah-krabby-patty').innerHTML = localStorage.getItem('krabbyPatty');
    document.getElementById('jumlah-fried-chicken').innerHTML = localStorage.getItem('friedChicken');
    document.getElementById('jumlah-milkshake').innerHTML = localStorage.getItem('milkshake');
    document.getElementById('jumlah-orange-juice').innerHTML = localStorage.getItem('orangeJuice');
    jumlahPesanan();
    harga();
    liff
        .init({
            liffId: myLiffId // Use own liffId
        })
        .then(() => {
            initializeApp();
        })
        .catch((err) => {
            // Error happens during initialization
            console.log("Error");
        });
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
        var menu = []
        menu[0] = document.getElementById('jumlah-krabby-patty').innerHTML+" Krabby Patty\n";
        menu[1] = document.getElementById('jumlah-fried-chicken').innerHTML+" Fried Chicken\n";
        menu[2] = document.getElementById('jumlah-milkshake').innerHTML+" Milkshake\n";
        menu[3] = document.getElementById('jumlah-orange-juice').innerHTML+" Orang Juice\n";
        var pesan = []
        for(var i = 0; i < 4; i++){
            if(menu[i][0] > 0){
                pesan.push(menu[i]);
            }
        }
        var message = "Hai Customer,\n\nTerima kasih telah memesan makanan, berikut adalah review pesanannya:\n\n";
        for(var i = 0; i < pesan.length; i++){
            message += pesan[i];
        }
        message += "\nPesanan Anda akan segera diproses dan akan diberitahu jika sudah bisa diambil.\n\nMohon ditunggu ya!"
        if (!liff.isInClient()) {
            sendAlertIfNotInClient();
        } else {
            liff.sendMessages([{
                'type': 'text',
                'text': message
            }]).then(function() {
                window.alert('Ini adalah pesan dari fitur Send Message');
            }).catch(function(error) {
                window.alert('Error sending message: ' + error);
            });
        }
});

function sendAlertIfNotInClient(){
    console.log("Kamu harus buka lewat aplikasi line untuk memesan.");
}