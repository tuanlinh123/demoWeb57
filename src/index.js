const express = require("express"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  app = express(),
  bodyParser = require("body-parser"),
  Question = require("./models/Question");

require("./models/User");
const answer = require("./models/answer");
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/demo", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

const Router = express.Router();// router -------------

connectDB();
app.use(express.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
  })
);
app.use(bodyParser.json({ limit: "50mb" }));


app.use('/', Router);
app.get("/question", async (req, res) => {
  const { keyword, tags } = req.query;
  try {
    const questions = await Question.find({
      $or: [
        { title: { $regex: keyword.toString() } },
        { description: { $regex: keyword.toString() } },
      ],
      tags: { $all: tags },
    }).sort({ createdAt: -1, vote: -1, answerCount: 1 });
    // .populate({
    //     path: 'createdBy',
    //     match: {
    //         _id: mongoose.Types.ObjectId('6291d85990798d6c9de31bf0'),
    //     },
    // })
    res.json({
      success: true,
      message: `Found ${questions.length} questions`,
      questions,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
});

// app.post('/question/posts', async (req, res) => {
//     try {
//         req.body.createdBy = mongoose.Types.ObjectId('6291d85990798d6c9de31bf0')
//         console.log(req.body)
//         const newQuestion = new Question(req.body)
//         await newQuestion.save()
//         res.json({
//             success: true,
//             message: `Add question success`,
//             newQuestion,
//         })
//     } catch (err) {
//         console.log(err)
//         res.status(404).json({
//             success: false,
//             message: 'Error',
//         })
//     }
// })

Router.post("/question/posts", async (req, res) => {

  try {
    // req.body.abc = 'asdjashd'
    const NewQuestion = await Question.create(req.body);
    res.send({ success: 1, data: NewQuestion });
  } catch (err) {
    res.send({ success: 0, data: err.message || "something went wrong" });
  }
});

//----------------------------------------------------------------------
Router.post("/answer/posts", async (req, res) => {
//   const { description } = req.body;
  console.log(req.body);
  try {
    req.body.questionId = "6292f08e91638da85f27a192"
    const NewAnswer = await answer.create(req.body);
    res.send({ success: 1, data: NewAnswer });
  } catch (err) {
    res.send({ success: 0, data: err.message || "something went wrong" });
  }
});
app.get("/answer/posts/:postId", async (req, res) => {
    const {postId}= req.params;
    const newAnswer = await answer.find({questionId:postId})
    res.send({success:1, data:newAnswer});
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
