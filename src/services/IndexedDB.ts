import { ActivitiesProps } from "../types/Activitiy";
import { UserProps } from "../types/User";

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
  return new Promise((resolve, reject)=>{
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
        return resolve(data)
      }
      transactionAdd.onerror = (event) => {
        console.log("transaction falied", event)
      }
    }
  })
  
}
export function AuthenticateDB(data : any){
  let database : IDBDatabase
  let request: IDBOpenDBRequest = self.window.indexedDB.open("DB_TCC", 1);

  console.log(data)

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

      deleteData.onsuccess = function() {
        objectStoreUser.add(data).onsuccess = (e)=> {
          console.log("User added:", e)
        }
      };
    }
  }
}
export function updateMyQuestionnaire(answers : Number[]){
  let database : IDBDatabase
  let request: IDBOpenDBRequest = self.window.indexedDB.open("DB_TCC", 1);

  request.onerror = () => {
    alert("Você não habilitou minha web app para usar IndexedDB?!");
  };

  request.onsuccess = () => {
    database = request.result;
    let objectStoreUser = database.transaction(["usuario"], 'readwrite').objectStore("usuario")

    const objectStoreUserGetAll = objectStoreUser.getAll()

    objectStoreUserGetAll.onsuccess = ()=> {
      if(objectStoreUserGetAll.result.length == 0){
        return 
      }
      console.log("MEU ID")
      console.log(objectStoreUserGetAll.result[0]._id)

      const objectStoreUserGetOne = objectStoreUser.get(objectStoreUserGetAll.result[0]._id)

      objectStoreUserGetOne.onsuccess = ()=> {
        const user = objectStoreUserGetOne.result
        const allAnswersString = []

        answers.map(answer => {
          allAnswersString.push(String(answer))
        })

        user.answers = allAnswersString
        
        objectStoreUser.put(user).onsuccess = () =>{
          console.log("Conseguiu atualizar o questionario")
        }

      }
      return objectStoreUserGetAll.result[0]._id
    }
  }
}
export function updateMyActivities(activities : ActivitiesProps[]){
  let database : IDBDatabase
  let request: IDBOpenDBRequest = self.window.indexedDB.open("DB_TCC", 1);

  request.onerror = () => {
    alert("Você não habilitou minha web app para usar IndexedDB?!");
  };

  request.onsuccess = () => {
    database = request.result;
    let objectStoreUser = database.transaction(["usuario"], 'readwrite').objectStore("usuario")

    const objectStoreUserGetAll = objectStoreUser.getAll()

    objectStoreUserGetAll.onsuccess = ()=> {
      if(objectStoreUserGetAll.result.length == 0){
        return 
      }
      const objectStoreUserGetOne = objectStoreUser.get(objectStoreUserGetAll.result[0]._id)

      objectStoreUserGetOne.onsuccess = ()=> {
        const user = objectStoreUserGetOne.result
        user.myCurrentActivities = activities
        user.activitiesFinishedToday = 0
        
        objectStoreUser.put(user).onsuccess = () =>{
          console.log("IndexedDB conseguiu atualizar as atividades")
        }
      }
      return objectStoreUserGetAll.result[0]._id
    }
  }
}
export function getMyData(): Promise<UserProps>{
  return new Promise((resolve, reject)=> {
    let database : IDBDatabase
    let request: IDBOpenDBRequest = self.window.indexedDB.open("DB_TCC", 1);

    request.onerror = () => {
      alert("Você não habilitou minha web app para usar IndexedDB?!");
    };

    request.onsuccess = () => {
      database = request.result;
      let objectStoreUser = database.transaction(["usuario"], 'readonly').objectStore("usuario")

      const objectStoreUserGetAll = objectStoreUser.getAll()

      objectStoreUserGetAll.onsuccess = ()=> {
        if(objectStoreUserGetAll.result.length == 0){
          return 
        }
        const objectStoreUserGetOne = objectStoreUser.get(objectStoreUserGetAll.result[0]._id)

        objectStoreUserGetOne.onsuccess = ()=> {
          const user = objectStoreUserGetOne.result
          return resolve(user)
        }
      }
    }
  })
  
}
export function finishMyActivity(id : string){
  return new Promise((resolve, reject)=> {
    let database : IDBDatabase
    let request: IDBOpenDBRequest = self.window.indexedDB.open("DB_TCC", 1);

    request.onerror = () => {
      alert("Você não habilitou minha web app para usar IndexedDB?!");
    };

    request.onsuccess = () => {
      database = request.result;
      let objectStoreUser = database.transaction(["usuario"], 'readwrite').objectStore("usuario")

      const objectStoreUserGetAll = objectStoreUser.getAll()

      objectStoreUserGetAll.onsuccess = ()=> {
        if(objectStoreUserGetAll.result.length == 0){
          return 
        }
        const objectStoreUserGetOne = objectStoreUser.get(objectStoreUserGetAll.result[0]._id)

        objectStoreUserGetOne.onsuccess = ()=> {
          const user = objectStoreUserGetOne.result
          const myActvityes = user.myCurrentActivities

          myActvityes.map((activity: ActivitiesProps, index: number )=> {
            if(activity._id === id){
              myActvityes.splice(index, 1)
            }
          })
          user.myCurrentActivities = myActvityes
          user.activitiesFinishedToday += 1
          user.allAtivitiesFinished += 1
          
          objectStoreUser.put(user).onsuccess = () =>{
            console.log("IndexedDB conseguiu atualizar as atividades")
            return resolve(user)
          }
        }
      }
    }
  })
  
}
export function deleteMyActivity(id : string){
  let database : IDBDatabase
  let request: IDBOpenDBRequest = self.window.indexedDB.open("DB_TCC", 1);

  request.onerror = () => {
    alert("Você não habilitou minha web app para usar IndexedDB?!");
  };

  request.onsuccess = () => {
    database = request.result;
    let objectStoreUser = database.transaction(["usuario"], 'readwrite').objectStore("usuario")

    const objectStoreUserGetAll = objectStoreUser.getAll()

    objectStoreUserGetAll.onsuccess = ()=> {
      if(objectStoreUserGetAll.result.length == 0){
        return 
      }
      const objectStoreUserGetOne = objectStoreUser.get(objectStoreUserGetAll.result[0]._id)

      objectStoreUserGetOne.onsuccess = ()=> {
        const user = objectStoreUserGetOne.result
        const myActvityes = user.myCurrentActivities

        myActvityes.map((activity: ActivitiesProps, index: number )=> {
          if(activity._id === id){
            myActvityes.splice(index, 1)
          }
        })
        user.myCurrentActivities = myActvityes
        
        objectStoreUser.put(user).onsuccess = () =>{
          console.log("IndexedDB conseguiu atualizar as atividades")
        }
      }
      return objectStoreUserGetAll.result[0]._id
    }
  }
}
export function DeleteMyDataFromIDB(){
  return new Promise((resolve, reject)=>{
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
        const dataGet = objectStoreUserGet.result
        const deleteData = database.transaction(["usuario"], 'readwrite')
        .objectStore("usuario")
        .delete(dataGet[0]._id)

        deleteData.onsuccess = function(event) {
          return console.log("Data Deleted")
        };
      }
    }
  })
}