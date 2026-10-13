require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDb = require("./config/db");
const app = express();
const PORT = process.env.PORT || 3000;

const userRouter = require("./routes/user.js")
const taskRouter = require("./routes/task.js");

connectToDb();

app.use(express.json());
app.use(cors());

app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message:"api is live"
    })
});

app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);

app.listen(PORT, () => {
    console.log(`server successfully running on http://localhost:${PORT}`)
})