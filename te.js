//inisialisasi variable yang dibutuhkan
let todo = []
let rr = "key"
let arr = []

//ambil komponen berdasarkan ID
const getItem = document.getElementById('item')
const getItem2 = document.getElementById('item-kedua')
const getItemPencarian = document.getElementById('hasil-pencarian')

//buat variable untuk custom event
const RENDER_EVENT = 'render-todo';
const RENDER_PENCARIAN = 'render-PENCARIAN';

//generate ID
let generateID = ()=> {
     return Date.now();
}

//buat Objek data buku
let dataBuku = (judul,penulis,tahun, isComplete=false)=>{
    return {
        id: generateID(),
        judul,
        penulis,
        tahun,
        isComplete
    }

}

// Fungsi Buat Todo
let makeTodo = ()=>{

    const judul  = document.getElementById('judul-buku').value;
    const penulis = document.getElementById('penulis').value;
    const tahun = document.getElementById('tahun').value;
    const ceklis = document.getElementById('jenis-bacaan').checked

    todo.unshift(dataBuku(judul,penulis,tahun,ceklis));

    //simpan data todo dalam local storage
    localStorage.setItem('rr', JSON.stringify(todo));
    document.dispatchEvent(new Event(RENDER_EVENT));
   
}


//temukan index
let findTodoIndex = (todoId)=>{
    return todo.findIndex((e)=>{
        return e.id===todoId
    })
    
}

// pencarian 
let pencarianBuku = ()=> {
    const judulnya  = document.getElementById('cari-buku').value;
    //temukan nilai inputan dengan data dari objek dalam local storagfe
    return todo.find((e)=> {
      return e.judul === judulnya
      
    })

}

let getPencarian = (todoObject) => {
    
    const yy = document.getElementById('btn-cari')
    return yy.addEventListener('click', ()=>{
    getItemPencarian.innerHTML=" ";
    const mj = pencarianBuku()
    const {id, judul, penulis, tahun, isComplete} = mj;
    const containerItem = document.createElement('div')
    containerItem.classList.add('container-item')

    const makeKumpulanBuku = document.createElement('div')
    makeKumpulanBuku.classList.add('judul-buku')

    const dataJudul = document.createElement('h4')
    dataJudul.innerText = judul;
    const dataPenulis = document.createElement('p')
    dataPenulis.innerText ='Penulis : '+penulis;
    const dataTahun = document.createElement('p')
    dataTahun.innerText ='Tahun : '+tahun;

    makeKumpulanBuku.append(dataJudul,dataPenulis,dataTahun);


    const selesai = document.createElement('button')
    isComplete===true?selesai.innerText='Belum Selesai Baca':selesai.innerText='Selesai Baca'
    selesai.classList.add('selesai')
    
    const hapus = document.createElement('button')
    hapus.innerText='Hapus Buku'
    hapus.classList.add('hapus')

    const makeAksi = document.createElement('div')
    makeAksi.classList.add('aksi')
    makeAksi.append(selesai,hapus)

    containerItem.append(makeKumpulanBuku,makeAksi)
    getItemPencarian.append(containerItem);
  hapus.addEventListener('click', function () {
  let aaa = JSON.parse(localStorage.getItem('rr'))
  const todoTarget = findTodoIndex(id);
  console.log(aaa[todoTarget].id==id)
  if (aaa[todoTarget].id==id) {
    console.log( aaa.splice(todoTarget,1));
    getItemPencarian.innerHTML="";
  }
     

     localStorage.setItem('rr', JSON.stringify(aaa));
      render()
       document.dispatchEvent(new Event(RENDER_EVENT));
    });
      
    selesai.addEventListener('click', ()=>{
      let userData = JSON.parse(localStorage.getItem('rr'));
      const todoTarget = findTodoIndex(id);
      if(userData[todoTarget].id==id) {
        if (userData[todoTarget].isComplete==false){
        selesai.innerText='Belum Selesai Baca'
        getItem2.append(containerItem)
        userData[todoTarget].isComplete=true;
        // console.log(todo)
        localStorage.setItem('rr', JSON.stringify(userData));
         let mm = JSON.parse(localStorage.getItem('rr'));
        makeList(mm)
        getItemPencarian.innerHTML="";
      }
      
      else {
        selesai.innerText='Selesai Baca'
        getItem.append(containerItem)
        userData[todoTarget].isComplete=false;
        // console.log(todo)
         localStorage.setItem('rr', JSON.stringify(userData));
       
        getItemPencarian.innerHTML="";
      }
  
      
    }
      else{
        console.log("salah")
      }
      
      document.dispatchEvent(new Event(RENDER_EVENT));
    } )

   
}
   )
}
  
   
   




//hapus item dalam array todo
let deleteTodo = (todoId)=>{
    const todoTarget = findTodoIndex(todoId);
    if (todoTarget === -1) return;
    todo.splice(todoTarget, 1);

  document.dispatchEvent(new Event(RENDER_EVENT));
}

//hapus dari rak buku 
function removeTaskFromCompleted(todoId /* HTMLELement */) {
  // let aaa = JSON.parse(localStorage.getItem('rr'))
  // console.log(aaa)
  // const todoTarget = findTodoIndex(todoId);
  // if (todoTarget === -1) return;
  // aaa.splice(todoTarget, 1);
  // localStorage.setItem('rr', JSON.stringify(aaa));
  // render()

  // let aaa = JSON.parse(localStorage.getItem('rr'))
  // console.log(aaa)
  // const todoTarget = findTodoIndex(todoId);
  // if (todoTarget === -1) return;
  // aaa.splice(todoTarget, 1);
  // localStorage.setItem('rr', JSON.stringify(aaa));
  // render()

  console.log('ouuu')
  


  document.dispatchEvent(new Event(RENDER_EVENT));
}


//input todo ke rak buku
let makeList = (todoObject)=>{
    const {id, judul, penulis, tahun, isComplete} = todoObject;


    const containerItem = document.createElement('div')
    containerItem.classList.add('container-item')

    const makeKumpulanBuku = document.createElement('div')
    makeKumpulanBuku.classList.add('judul-buku')

    const dataJudul = document.createElement('h4')
    dataJudul.innerText = judul;
    const dataPenulis = document.createElement('p')
    dataPenulis.innerText ='Penulis : '+penulis;
    const dataTahun = document.createElement('p')
    dataTahun.innerText ='Tahun : '+tahun;

    makeKumpulanBuku.append(dataJudul,dataPenulis,dataTahun);


    const selesai = document.createElement('button')
    isComplete===true?selesai.innerText='Belum Selesai Baca':selesai.innerText='Selesai Baca'
    selesai.classList.add('selesai')
    
    const hapus = document.createElement('button')
    hapus.innerText='Hapus Buku'
    hapus.classList.add('hapus')

    const makeAksi = document.createElement('div')
    makeAksi.classList.add('aksi')
    makeAksi.append(selesai,hapus)

    containerItem.append(makeKumpulanBuku,makeAksi)

    todoObject.isComplete===true?getItem2.insertBefore(containerItem,getItem2.firstElementChild):getItem.insertBefore(containerItem,getItem.firstElementChild);
    
    hapus.addEventListener('click', function () {
      let aaa = JSON.parse(localStorage.getItem('rr'))
      const todoTarget = findTodoIndex(id);
      console.log(aaa[todoTarget].id==id)
      if (aaa[todoTarget].id==id) {
        console.log( aaa.splice(todoTarget,1));
      }
     

     localStorage.setItem('rr', JSON.stringify(aaa));
      render()
    });
      

    
    
    selesai.addEventListener('click', ()=>{
      let userData = JSON.parse(localStorage.getItem('rr'));
      const todoTarget = findTodoIndex(id);
      

      if (userData[todoTarget].isComplete==false){
        selesai.innerText='Belum Selesai Baca'
        getItem2.insertBefore(containerItem,getItem2.firstElementChild)
        userData[todoTarget].isComplete=true;
        localStorage.setItem('rr', JSON.stringify(userData));
        let mm = JSON.parse(localStorage.getItem('rr'));
        console.log(mm)
      }
      else {
        selesai.innerText='Selesai Baca'
        getItem.insertBefore(containerItem,getItem.firstElementChild)
        userData[todoTarget].isComplete=false;
        localStorage.setItem('rr', JSON.stringify(userData));
        let mm = JSON.parse(localStorage.getItem('rr'));
        console.log(mm)
      }
      // console.log(todo)
    } )


    
}




const render = ()=>{
        let userData = JSON.parse(localStorage.getItem('rr'));
        if (!userData) {
          userData=[]
          console.log("Local Storage Kosong")
        }
        else {
        getItem.innerHTML='';
        getItem2.innerHTML='';
        
        userData.forEach((e)=>{
        makeList(e)
        todo = userData
        console.log(todo)
        console.log(userData)
    })
        }
        

       document.dispatchEvent(new Event(RENDER_PENCARIAN));
  

    // console.log(todo)

}



document.addEventListener(RENDER_EVENT, render() );

document.addEventListener(RENDER_PENCARIAN, getPencarian() );


document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('masukkan-buku');
  submitForm.addEventListener('submit', function (event) {
    makeTodo();
  });
});
