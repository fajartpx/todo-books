
let todo = []
const RENDER_EVENT = 'render-todo';

//generate ID
let generateID = ()=> {
    return Date.now();
}

//buat Objek data buku
let dataBuku = (judul,penulis,tahun)=>{
    return {
        ID  : generateID(),
        judul,
        penulis,
        tahun
    }

}

let makeTodo = ()=>{

    const judul  = document.getElementById('judul-buku').value;
    const penulis = document.getElementById('penulis').value;
    const tahun = document.getElementById('tahun').value;

    todo.push(dataBuku(judul,penulis,tahun));
    
    document.dispatchEvent(new Event(RENDER_EVENT));
  

    
   
}



document.addEventListener(RENDER_EVENT, function () {
  console.log(todo);
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