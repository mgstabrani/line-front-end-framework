function getData(){
    document.getElementById('jumlah-krabby-patty').innerHTML = localStorage.getItem('krabbyPatty');
    document.getElementById('jumlah-fried-chicken').innerHTML = localStorage.getItem('friedChicken');
    document.getElementById('jumlah-milkshake').innerHTML = localStorage.getItem('milkshake');
    document.getElementById('jumlah-orange-juice').innerHTML = localStorage.getItem('orangeJuice');
    jumlahPesanan();
    harga();
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