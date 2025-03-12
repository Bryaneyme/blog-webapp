// Express app here
import express from "express";


const app = express();
const PORT = 3000;

let blogPosts = []

app.set('view model', 'ejs');
app.use(express.urlencoded({ extended: true }))


app.get("/", (req, res) => {
    console.log("Rendering index page...");
    console.log(blogPosts);
    
    res.render('index.ejs', { blogPosts });
})

app.get("/create", (req, res) => {
    console.log("Rendering create page...");
    res.render('index.ejs', { create: true, blogPosts })
})

function addBlogPost(req, res, next) {
    console.log("Adding blog posts locally...");
    blogPosts.push({
        slug: req.body['slug'],
        title: req.body['title'],
        content: req.body['content'],
    });
    next();
}

app.post("/create/submit", addBlogPost, (req, res) => {
    console.log("Handling 'create blog' route...");
    console.log(blogPosts);

    res.render("index.ejs", { blogPosts })
})

app.post('/update', (req, res) => {
    console.log("Rendering 'update blog' route");
    res.render('index.ejs', {update: true, slug: req.body['slug']});

})

function updateBlogPost(req, res, next) {
    console.log("Updating blog post...");
    let blogIndex = blogPosts.findIndex((object) => {
        return object['slug'] === req.body['slug'];
    })
    blogPosts[blogIndex] = {title: req.body['newTitle'], slug: req.body['slug'], content: req.body['newContent']}; 
    next()
}

app.post('/update/submit', updateBlogPost, (req, res) => {
    console.log("Handling POST request to update blog...");
    res.render('index.ejs', {blogPosts})
})

function deleteBlogPost(req, res, next) {
    console.log(`Deleting ${req.body['slug']}`);
    let blogIndex = blogPosts.findIndex((object) => {
        console.log("Looking for slug index");
        return object['slug'] === req.body['slug'];
    })
    console.log(blogIndex)
    blogPosts.splice(blogIndex, 1)
    next();
}

app.post('/delete/submit', deleteBlogPost, (req, res, next) => {
    console.log("Rendering 'delete blog' route...");
    res.render('index.ejs', {blogPosts});
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})