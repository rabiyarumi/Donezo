const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oj61d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const db = client.db("donezo");
    const usersCollection = db.collection("users");
    const tasksCollection = db.collection("tasks");




    //-------------------------Users-----------------------------\\
    // save  a user in db
    app.post("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const user = req.body;
      // check if user exists in db
      const isExist = await usersCollection.findOne(query);
      if (isExist) {
        return res.send(isExist);
      }
      const result = await usersCollection.insertOne({
        ...user,
        timestamp: Date.now(),
      });
      res.send(result);
    });


      //---------------------------- Task -----------------\\

      //save task in db
      app.post("/tasks", async (req, res) => {
        try {
          const task = req.body;

          
          const result = await tasksCollection.insertOne({
            ...task,
            timestamp: Date.now(),
          });
          res.send({ message: "Task added successfully", result });
        } catch (error) {
          console.error("Error creating task:", error);
          res.status(500).send({ message: "Internal server error", error });
        }
      });


      //get task
      app.get("/tasks/:email", async(req, res) => {
        const email = req.params.email
        const query = {email}
        const result = await tasksCollection.find(query).toArray()
        res.send(result);
      })
      //get single task
      app.get("/task/:id", async(req, res) => {
        const id = req.params.id
        const query = {_id: new ObjectId(id)}
        const result = await tasksCollection.findOne(query)
        res.send(result);
      })
      //Delete task
      app.delete("/tasks/:id", async(req, res) => {
        const id = req.params.id
        const query = {_id: new ObjectId(id)}
        const result = await tasksCollection.deleteOne(query)
        res.send(result);
      })

      // update user biodata by id
    app.patch("/tasks/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedData = {
        $set: {
          title: data.title,
          description: data.description,
          status: data.status,
        },
      };

      const result = await tasksCollection.updateOne(
        query,
        updatedData,
        options
      );
      res.send(result);
    });


    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from Donezo Server..");
});

app.listen(port, () => {
  console.log(`SoulSync is running on port ${port}`);
});
