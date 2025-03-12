// Express app here
import express from "express";


const app = express();
const PORT = 3000;

let blogPosts = []

app.set('view model', 'ejs');
app.use(express.urlencoded({ extended: true }))


app.get("/", (req, res) => {
    console.log("Rendering index page...");
    res.render('index.ejs', {blogPosts});
})

app.get("/create", (req, res) => {
    console.log("Rendering create page...");
    res.render('index.ejs', { create: true, blogPosts})
})

function addBlogPost(req, res, next) {
    console.log("Adding blog posts locally...");
    blogPosts.push({
        title: req.body['title'],
        content: req.body['content']
    });
    next();
}

app.post("/create/submit", addBlogPost, (req, res) => {
    console.log("Handling 'create blog' route...");
    console.log(blogPosts);
    
    res.render("index.ejs", {blogPosts})
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})