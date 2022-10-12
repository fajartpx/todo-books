
let todo = []

const getItem = document.getElementById('item')
const getItem2 = document.getElementById('item-kedua')
const RENDER_EVENT = 'render-todo';

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

let makeTodo = ()=>{

    const judul  = document.getElementById('judul-buku').value;
    const penulis = document.getElementById('penulis').value;
    const tahun = document.getElementById('tahun').value;
    const ceklis = document.getElementById('jenis-bacaan').checked
    todo.push(dataBuku(judul,penulis,tahun,ceklis));
    
    document.dispatchEvent(new Event(RENDER_EVENT));
   
}

// let tele = [{A:"Tingkiwingki",B:"Dipsi"},{C:"Lala",D:"Po"}];
// let nomor = [{E:"2",F:"6"},{G:"7",H:"12"}];

// 		// for in
        
//         function xx() {
//             for (let index in tele) {

//         // console.log(typeof(x))
// 		//   console.log(x);
//          if (tele[index].A === "Tingkiwingki") {
//         // console.log(tele[index].A)
//         return index;

//         }
//             return -1;
// 		};
//         }
		
//         // console.log(tele[0].A)

//         console.log(xx())

//         const yy = ()=> {

//         return tele.findIndex((e)=>{
//             return e.A=="Tingkiwingki"
//         }
//         )   
      
//         }
//         console.log(yy())
       


		// for of
		// tele.forEach((e,index)=>{
        //     console.log(typeof(index))
        //     console.log("ini for each"+parseInt(index))
        // })

let findTodoIndex = (todoId)=>{
    return todo.findIndex((e)=>{
        return e.id===todoId
    })
    
}

function findTodoIndex2(todoId) {
  for (index in todo) {
    if (todo[index].id === todoId) {
      return index;
      
    }
   
  }
  
  return -1;
}




let deleteTodo = (todoId)=>{
    const todoTarget = findTodoIndex(todoId);
    if (todoTarget === -1) return;
    todo.splice(todoTarget, 1);

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function removeTaskFromCompleted(todoId /* HTMLELement */) {
  const todoTarget = findTodoIndex(todoId);
  const todoTarget2 = findTodoIndex2(todoId);
 
  console.log(todoTarget)
  console.log(todoTarget2)

  if (todoTarget === -1) return;
  todo.splice(todoTarget, 1);

  document.dispatchEvent(new Event(RENDER_EVENT));
}

const moveTaskFromStatment = (todoId)=>{
  const todoTarget = findTodoIndex(todoId);
  todoTarget.isComplete=true?false:true;
}

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
      removeTaskFromCompleted(id);
    });

    
    
    selesai.addEventListener('click', ()=>{
      const todoTarget = findTodoIndex(id);
      if (todo[todoTarget].isComplete==false){
        selesai.innerText='Belum Selesai Baca'
        getItem2.append(containerItem)
        todo[todoTarget].isComplete=true;
        console.log( todo[todoTarget].isComplete)
      }
      else {
        selesai.innerText='Selesai Baca'
        getItem.append(containerItem)
        todo[todoTarget].isComplete=false;
      }
    } )
    
}







document.addEventListener(RENDER_EVENT, ()=>{
    getItem.innerHTML='';
    getItem2.innerHTML='';
    todo.forEach((e)=>{
    makeList(e)
    })
    console.log(todo)
});




document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('masukkan-buku');
  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    makeTodo();
  });
});




