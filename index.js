import express from 'express';
const app = express ();
const port = 3001;

import { v4 as uuidv4 } from 'uuid';

import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let tracker = [
    {
        date: "Fri Nov 25",
        bedTime: "10:30pm",
        cups: 3,
        sleepQuality: "Bad",
        id: `${uuidv4()}`
    },
    {
        date: "Satur Nov 26",
        bedTime: "9:30pm",
        cups: 1,
        sleepQuality: "",
        id: `${uuidv4()}`
    }
]

app.get("/", (req, res) =>{
    res.send(tracker)
})

app.listen(port, () => {
    console.log( `Example app listening on port ${port}` )
})

app.post("/tracker", (req, res) => {
    console.log(req.body)
    const entry = {...req.body, id: uuidv4()}
    tracker.push(entry)
    res.send(tracker)
})


app.patch("/tracker/:id", (req, res) => {
  const userId = req.params.id

  if(req.body.id){
    delete req.body.id
  }

    tracker = tracker.map((data) => {
    if(userId === data.id){
        return {...data, ...req.body}
    }
    return data
  })

  res.send(tracker)
})

app.delete("/tracker/:id", (req, res) =>{
    const userId = req.params.id
    console.log("This the DELETE")
    tracker = tracker.filter((data) => data.id !== userId)

    res.send(tracker)
})