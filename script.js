function jumlahPesanan(){
    var krabbyPatty = document.getElementById('jumlah-krabby-patty').textContent;
    var friedChicken = document.getElementById('jumlah-fried-chicken').textContent;
    var milkshake = document.getElementById('jumlah-milkshake').textContent;
    var orangeJuice = document.getElementById('jumlah-orange-juice').textContent;
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
    document.getElementById('total').textContent = tampil;
}

function harga(){
    var krabbyPatty = document.getElementById('jumlah-krabby-patty').textContent;
    var friedChicken = document.getElementById('jumlah-fried-chicken').textContent;
    var milkshake = document.getElementById('jumlah-milkshake').textContent;
    var orangeJuice = document.getElementById('jumlah-orange-juice').textContent;
    document.getElementById('harga').textContent = "Rp"+(krabbyPatty*50000 + friedChicken*40000 + milkshake*20000 + orangeJuice*10000);
}

function add(data){
    document.getElementById(data).textContent++;
    jumlahPesanan();
    harga();
}

function kurang(data){
    if(document.getElementById(data).textContent > 0){
        document.getElementById(data).textContent--;
    }
    jumlahPesanan();
    harga();
}
