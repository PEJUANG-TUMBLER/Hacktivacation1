let id = 0;

// console.log(data)

let move = (pilihan) => {
    swal(`pesan untuk ? `, {
buttons: {
cancel: "BACK",
person: {
 text: "1 orang",
 value: "person",
},
 multiPersons: {
     text : "Rame - rame",
     value: 'multiPersons'
 }
},
})
.then((value) => {
switch (value) {

case "multiPersons":
let getData = prompt('berapa jumlah yang anda inginkan')
localStorage.setItem('key' , getData);
localStorage.setItem('place' , pilihan);
swal(`anda memesan untuk rombongan", "success `);
window.location.href = "form.html"
break;

case "person":
localStorage.setItem('key' , 1);
localStorage.setItem('place' , pilihan);
swal(`anda memesan untuk 1 orang", "success `);
window.location.href = "form.html"

break;

default:
swal("Pesanan dibatalkan");
}
});
}


function discount(){
    
}

// const data = {
//     custName: 'Imam Muttaqin', //customer name
//     region: 'Bandung',
//     choice: 'Mentawai Tribe',
//     numberOfGroupMember: 5,
//     groupList: ['adam', 'jordan', 'jalu', 'hana', 'oki', 'lela', 'poni', 'kastaji', 'bokim', 'cinda'],
//     dateOfDeparture: '21-Jun-2021',
// }

function customerData(){
    let output = {};
    switch(id){
        case '1':
            output.choice = 'Mentawai';
            break;
        case '2':
            output.choice = 'Raja Ampat';
            break;
    }   
    return output
}

function flightNumber(jenisPenerbangan) {

    let result = ' ';
    let airEropa = 'AE'
    let adamAir = 'AA'
    let sukoiAir = 'SA'
    
    for (let i = 0; i < 4; i++) {
        let angkaRandom = Math.floor(Math.random()*9)
        result += angkaRandom
    }
    if (jenisPenerbangan === 'Air Eropa') {
        result = airEropa + result
    } else if (jenisPenerbangan === 'Adam Air') {
        result = adamAir + result
    } else if (jenisPenerbangan === 'Sukoi Air') {
        result = sukoiAir + result
    }
    return result;
}

function planeTicket(departure, arrivals){
    const cities = ['Medan', 'Padang', 'Sumatera Barat',
                'Lampung','Pontianak', 'Jakarta',
                'Bandung', 'Semarang', 'Yogyakarta',
                'Surabaya', 'Manado', 'Makassar',
                'Nusa Tenggara Timur', 'Maluku', 'Papua Barat'];
    const airlines = ['Air Eropa', 'Adam Air', 'Sukoi Air'];
    const random = airlines[Math.floor(Math.random() * airlines.length)];
    let price = 0;
    let indexDeparture = 0;
    let indexArrival = 0;
    for(let i = 0; i < cities.length; i++){
        if(departure === cities[i]){
            indexDeparture = i;
        } else if(arrivals === cities[i]){
            indexArrival = i;
        }
    }
    switch(random){
        case 'Air Eropa':
            price = (Math.abs(indexArrival - indexDeparture)) * 500000;
            break;
        case 'Adam Air':
            price = (Math.abs(indexArrival - indexDeparture)) * 200000;
            break;
        case 'Sukoi Air':
            price = (Math.abs(indexArrival - indexDeparture)) * 300000;
    }
    return {
            Departure: departure,
            Arrival: arrivals,
            Airline: random,
            'Price per Person': price,
            'Flight Number': flightNumber(random)
        }
}
//-----------------------------------------------------------
function opsiTrip(opsi, jumlahOrang, tempat, namaTempat) {
    
    let harga = 0

    for (let i = 0; i < tempat.length; i++) {
        for (let j = 0; j < tempat[i].length; j++) {
            if (opsi === 'Solo Trip') {
                if (tempat[i][j] === namaTempat) {
                    harga = jumlahOrang * tempat[i][1]
                }
            } else if (opsi === 'Rombongan') {
                if (tempat[i][j] === namaTempat) {
                    harga = jumlahOrang * tempat[i][2]
                }
            }
        }
    }
    return harga
}

let tempatWisata = [
    ['Nama Tempat', 'Harga Solo Trip', 'Harga Rombongan'],
    ['Mentawai Tribe', 5650000, 22600000],
    ['Raja Ampat', 5950000, 2380000],
    ['Sumba Timur', 3290000, 13160000],
    ['Overland Pulau Flores', 3990000, 15960000],
    ['Kaimana', 6590000, 26360000]
]

// console.log(opsiTrip('Rombongan', 3, tempatWisata, 'Kaimana'));

function hargaFlight(namaMaskapai, arrMaskapai, jumlahOrang) {

    let harga = 0

    for (let i = 0; i < arrMaskapai.length; i++) {
        for (let j = 0; j < arrMaskapai[i].length; j++) {
            if (arrMaskapai[i][j] === namaMaskapai) {
                harga = jumlahOrang * arrMaskapai[i][1]
            }
        }
    }
    return harga
}

let maskapai = [
    ['Air Eropa', 500000],
    ['Adam Air', 200000],
    ['Sukoi Air', 300000]
]

// console.log(hargaFlight('Air Eropa', maskapai, 4));


function totalHarga(namaMaskapai, arrMaskapai, jumlahOrang, opsi, tempat, namaTempat) { 

    let total = 0 
    let hargaTrip = opsiTrip(opsi, jumlahOrang, tempat, namaTempat)
    let hargaPesawat = hargaFlight(namaMaskapai, arrMaskapai, jumlahOrang)

    total = hargaTrip + hargaPesawat

    return `Rp ${total = total.toLocaleString('id-ID')}`
}

// console.log(totalHarga('Air Eropa', maskapai, 4, 'Solo Trip', tempatWisata, 'Kaimana'));
//-----------------------------------------------------------------------------------------
function booking(destinationList, data, language){
    let departure = data.region;
    let arrival = '';
    let bandara = '';

    for(let i = 0; i < destinationList.length; i++){
        if(data.choice === destinationList[i].place){
            arrival = destinationList[i].region;
            bandara = destinationList[i].airport;
        }
    }

    let ticketForPlane = planeTicket(departure, arrival);
    let hasil = '';
    if(language === 'english'){
        hasil =`___________________________________________________________________________________\nBOOKING DETAILS\n\nCustomer Name\t:\t${data.custName}\nNumber of Party\t:\t${data.numberOfGroupMember}\nList of Party\t:\t`;
        for(let i = 0; i < data.numberOfGroupMember; i++){
            if(i === 0){
                hasil += `${i+1}. ${data.groupList[i]}\n`;
                continue;
            }
            hasil += `\t\t\t${i+1}. ${data.groupList[i]}\n`
        }
        hasil += `Destination\t:\t${data.choice}\nDeparture Date\t:\t\nPackage Price\t:\n\tRp 0\n\n${'Flight Recommendation'.bold()}\nDeparture\t:\t${departure}\nArrival\t\t:\t${arrival}\nAirport\t\t:\t${bandara}\nAirline\t:\t${ticketForPlane.Airline}\nFlight Number\t:\t${ticketForPlane['Flight Number']}\nPrice per Person\t:\tRP ${ticketForPlane['Price per Person'].toLocaleString('id-ID')}\n\nTotal Amount\nTour Package + Plane Ticket\t:\tRP\n\nIf you have any further question, please do not hesitate to contact us\n+62 83 555 222 (Hokage)\n+62 843 3332 5679 (Yonko)\n\n\nPT Hactivacation Untuk Tumbler\n\n(ttd)\n\nLevy\nBooking&Finance Manager\n`
        hasil += `___________________________________________________________________________________`
    }else if(language === 'bahasa indonesia'){
        hasil =`___________________________________________________________________________________\nDETAIL PESANAN\n\nNama Pemesan\t\t:\t${data.custName}\nJumlah Rombongan\t:\t${data.numberOfGroupMember}\nDaftar Nama Rombongan\t:\t`;
        for(let i = 0; i < data.numberOfGroupMember; i++){
            if(i === 0){
                hasil += `${i+1}. ${data.groupList[i]}\n`;
                continue;
            }
            hasil += `\t\t\t\t${i+1}. ${data.groupList[i]}\n`
        }
        hasil += `Tujuan Wisata\t\t:\t${data.choice}\nTanggal Berangkat\t:\t\nHarga Paket Wisata\t:\n\t\t\t\tRp 0\n\n${'Rekomendasi Maskapai'.bold()}\nDaerah Asal\t:\t${departure}\nTujuan\t\t:\t${arrival}\nBandara\t\t:\t${bandara}\nMaskapai\t:\t${ticketForPlane.Airline}\nNo. Penerbangan\t:\t${ticketForPlane['Flight Number']}\nHarga per Orang\t:\tRP ${ticketForPlane['Price per Person'].toLocaleString('id-ID')}\n\nTotal Harga\nPaket Wisata + Tiket Pesawat\t:\tRP\n\nJika ada pertanyaan terkait rencana perjalanan silahkan hubungi kami di\n+62 83 555 222 (Hokage)\n+62 843 3332 5679 (Yonko)\n\n\nPT Hactivacation Untuk Tumbler\n\n(ttd)\n\nLevy\nManajer Booking&Finance\n`
        hasil += `___________________________________________________________________________________`
    }
    return hasil
}

const destinationList= [
    {place:'Mentawai', region: 'Sumatera Barat', airport: 'Minangkabau International Airport'},
    {place:'Raja Ampat', region: 'Papua Barat', airport: 'Marinda Airport'},
    {place:'Sumba Timur', region: 'Nusa Tenggara Timur', airport: 'Tambolaka Airport'},
    {place:'Overland Pulau Flores', region: 'Nusa Tenggara Timur', airport: 'H. Hasan Aroeboesman Airport'},
    {place:'Kaimana', region: 'Papua Barat', airport: 'Utarom Airport'},
]

// console.log(booking(destinationList, data, 'english'));
// console.log(booking(destinationList, data, 'bahasa indonesia'))


/**
 * Algoritma :
 * card destinasi:
 *      foto
 *      nama tempat
 *      harga paket solo
 *      (jumlah hari)
 *      list fasilitas
 *      button(booking)
 *      watermark kota, provinsi
 * 
 * form di awal atau di akhir?
 * opsi solo trip atau rombongan
 * maks rombongan 10
 * opsi: isi form setelah klik button di card.
 *      - nama pembooking :
 *      - jumlah rombongan : (jika pilih opsi rombongan)
 *          daftar rombongan : ...
 *      - tanggal berangkat : (minimal 2 hari setelah hari booking)
 * 
 * submit ke wishlist:
 * di wishlist : yakin ==> product, minta bukti transfer;
 *               batal ==> homepage, wishlist 0;
 *               ubah ==> ke menu form;
 *      
 * [jakarta, bandung, semarang, yogja, surabaya, papua]
 * flight tiket : airEropa = 500000
 *                adamAir = 200000
 *                sukoiAir = 300000
 * 
 * bundling package di grup WA
 * bundling package : 1. paket tergantung destinasi
 * 
 * 
 * product :
 * "pemesanan atas nama : ....
 *  total biaya : RP5.000.000
 *  maskapai : ...
 *  daftar rombongan: ..."(tampil + tombol download)
 *
 *  
 */