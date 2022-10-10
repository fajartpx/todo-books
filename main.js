
let todo = []

let judulx = document.getElementById('kumpulan-buku')
let aksi = document.getElementById('aksi')
const RENDER_EVENT = 'render-todo';

//generate ID
let generateID = ()=> {
    return Date.now();
}

//buat Objek data buku
let dataBuku = (judul,penulis,tahun, isComplete=false)=>{
    return {
        ID  : generateID(),
        judul,
        penulis,
        tahun,
        isComplete
    }

}

let makeTodo = ()=>{

    const judul  = document.getElementById('judul-buku').value;
    const penulis = document.getElementById('penulis').value;
    const tahun = document.getElementById('tahun').value;
    const ceklis = document.getElementById('jenis-bacaan').checked
    todo.push(dataBuku(judul,penulis,tahun,ceklis));
    
    document.dispatchEvent(new Event(RENDER_EVENT));
   
}



let makeList = (todoObject)=>{

    const dataJudul = document.createElement('h4')
    dataJudul.innerText = todoObject.judul;
    console.log(dataJudul)

    const dataPenulis = document.createElement('p')
    dataPenulis.innerText ='Penulis : '+todoObject.penulis;

    const dataTahun = document.createElement('p')
    dataTahun.innerText ='Tahun : '+todoObject.tahun;


    judulx.append(dataJudul,dataPenulis,dataTahun);
 
    const selesai = document.createElement('button')
    selesai.innerText='Selesai Baca'
    selesai.classList.add('selesai')
    
    const hapus = document.createElement('button')
    hapus.innerText='Hapus Buku'
    hapus.classList.add('hapus')
    aksi.append(selesai,hapus);

}





document.addEventListener(RENDER_EVENT, ()=>{
    judulx.innerHTML='';
    todo.forEach((e)=>{
    makeList(e)
    })
    // console.log(todo)
});




document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('masukkan-buku');
  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    makeTodo();
  });
});






// let nilai2 = dataBuku('aaaas','dbb','201w3');

// todo.push(nilai)
// todo.push(nilai2)

// console.log(todo)
// console.log(todo[1].judul)


// const formBuku = document.getElementById('masukkan-buku');

// formBuku.addEventListener('submit', makeTodo() );

// let makeTodo = ()=>{
//     const judul = document.getElementsByName('judul').value;
//     const penulis = document.getElementsByName('penulis').value;
//     const tahun = document.getElementsByName('tahun').value;



//     const item = document.getElementsByClassName('judul-buku')
//     item.cr
// }