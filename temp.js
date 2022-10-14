let todo = []
let rr = "key"
let arr = []
//ambil komponen berdasarkan ID
const getItem = document.getElementById('item')
const getItem2 = document.getElementById('item-kedua')
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
    todo.push(dataBuku(judul,penulis,tahun,ceklis));
    
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
let pencarianBuku = (todoObj)=> {
    const ambilJudul = 'potter'
    const x = todoObj.find((e)=> {
      return e.judul === ambilJudul
    })
    return x
}

let getPencarian = () => {
   const yy = document.getElementById('btn-cari')
   return yy.addEventListener('click', ()=>{
   const judulnya  = document.getElementById('cari-buku').value;
   console.log(judulnya)
   const x = todo.find((e)=> {
      return e.judul === judulnya
    })
   console.log(x)
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
  const todoTarget = findTodoIndex(todoId);

  if (todoTarget === -1) return;
  todo.splice(todoTarget, 1);

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

    todoObject.isComplete===true?getItem2.append(containerItem):getItem.append(containerItem);
    
    hapus.addEventListener('click', function () {
      window.confirm('yakin hapus')?removeTaskFromCompleted(id):removeTaskFromCompleted();
    });
      

    
    
    selesai.addEventListener('click', ()=>{
      const todoTarget = findTodoIndex(id);
      if (todo[todoTarget].isComplete==false){
        selesai.innerText='Belum Selesai Baca'
        getItem2.append(containerItem)
        todo[todoTarget].isComplete=true;
      }
      else {
        selesai.innerText='Selesai Baca'
        getItem.append(containerItem)
        todo[todoTarget].isComplete=false;
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
