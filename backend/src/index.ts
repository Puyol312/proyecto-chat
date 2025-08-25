import { fireStore, rtbd } from "./db";
import express from "express";
import { json } from "body-parser"
import { v4 as uuidv4 } from "uuid";

const port = 8080;
const app = express();
app.use(json());

const usersCollection = fireStore.collection("users");

//router

  app.get("/users", function (req: any, res: any) {
    res.json(["Todos los usuarios"/*Aca va la respuesta*/]);
    // res.status(204).json(["Todos los usuarios"/*Aca va la respuesta*/]);
  });
  
  app.get("/users/:id", function (req: any, res: any) {
    const userId = req.params.id;
    const userDoc = usersCollection.doc(userId);
    userDoc.get().then(snap => { 
      res.json(snap.data);
    })
  });

//crear
  //Post para la API
  app.post("/messages", function (req: any, res: any) {
    const chatRoomRef = rtbd.ref("/chatrooms/general/messages");
    chatRoomRef.push(req.body, () => { 
      res.json("todo ok");
    });
  });

  //cambiar
    //Uso de ruta dinamica
      app.patch("/users/:id", function (req: any, res: any) { 
        const userId = req.params.id;
        const userDoc = usersCollection.doc(userId);
        const updateObject = req.body;

        updateObject.updatedAt = new Date();
        userDoc.update(req.body).then(() => { 
          res.json({ "message": "OK" });
        });
      })

//Inicializacion del router
app.listen(port, () => {
  console.log(`El servidor esta escuchando en el puerto en -> http://localhost:${port} <-`);
});