
export function IndexedDB(){
  let database : IDBDatabase
  let request: IDBOpenDBRequest = self.window.indexedDB.open("DB_TCC", 1);

  request.onerror = () => {
    alert("Você não habilitou minha web app para usar IndexedDB?!");
  };
  request.onsuccess = () => {
    database = request.result;
    console.log("CONECTOU")
  }
  request.onupgradeneeded = () => {
    database = request.result;
    const userObjectStore  = database.createObjectStore("usuario", { keyPath: "_id"});
    userObjectStore.createIndex("email", "email", {unique : true})
  };
}
function AddDataInDB(data : Object){
  let database : IDBDatabase
  let request: IDBOpenDBRequest = self.window.indexedDB.open("DB_TCC", 1);

  request.onerror = () => {
    alert("Você não habilitou minha web app para usar IndexedDB?!");
  };
  request.onsuccess = () => {
    database = request.result;

    const transactionAdd : IDBTransaction = database.transaction(["usuario"], 'readwrite')
    const objectStoreUser = transactionAdd.objectStore("usuario")

    objectStoreUser.add(data)
    transactionAdd.oncomplete = (event) => {
      console.log("transaction completed", event)
    }
    transactionAdd.onerror = (event) => {
      console.log("transaction falied", event)
    }
  }
}
export function AuthenticateDB(data : any){
  let database : IDBDatabase
  let request: IDBOpenDBRequest = self.window.indexedDB.open("DB_TCC", 1);

  request.onerror = () => {
    alert("Você não habilitou minha web app para usar IndexedDB?!");
  };

  request.onsuccess = () => {
    database = request.result;
    let objectStoreUser = database.transaction(["usuario"], 'readwrite').objectStore("usuario")

    const objectStoreUserGet = objectStoreUser.getAll()

    objectStoreUserGet.onsuccess = ()=> {
      if(objectStoreUserGet.result.length == 0){
        return AddDataInDB(data)
      }
      const dataGet = objectStoreUserGet.result
      const deleteData = database.transaction(["usuario"], 'readwrite')
      .objectStore("usuario")
      .delete(dataGet[0]._id)

      deleteData.onsuccess = function(event) {
        AddDataInDB(data)
      };
    }
  }
}