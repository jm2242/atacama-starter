# `Atacama Books`

# CS411 Project Report

# Atacama: A Digital Library Promoting Literacy.

# Important Links

- Youtube Link to final project demo video: https://www.youtube.com/watch?v=TwttDNIZW50&feature=youtu.be
- Github Repo to code and db dump: https://github.com/jm2242/atacama-starter

## 1. Briefly describe what the project accomplished and 2. Discuss the usefulness of your project, i.e. what real problem you solved.

Atacama is a digital library promoting literacy. Why is promoting literacy important? According to the Nevada Department of Corrections, some prison systems "plan how many jail cells they will build in the future by how many children are not reading on grade level by third grade." We believe that the future of society depends on literacy. Albert Einstein said, "If you want your children to be intelligent, read them fairy tales. If you want them to be more intelligent, read them more fairy tales." Albert Einstein knew that promoting literacy nurtures an intelligent society.

Atacama is a digital library and ebook reader whose goal is to promote literacy by remove barriers to literacy. Barriers we address include (i) convenient access to books, (ii) prohibitive cost of books, and (iii) pleasant discovery of new books. The following paragraphs addressed these problems, how Atacama solves them, and how existing services fail to solve them.

A public library system serves much of the world. But many people lack convenient access to libraries, especially children. The problem is worsened by budget cuts, limited hours, and even library closings. At Atacama, we believe that the reach and convenience of the internet is greater than that of libraries. Atacama is a digital library which serves books to everyone in the world through the internet.

Even with convenient access to a library, the selection may not be satisfactory. Many libraries are small. The inter-library loan system is known to be slow; some request a service fee. Atacama provides instant access to a large library of books for free. Our library consists of free books from Project Gutenberg [note: currently a subset of all the books].

After providing access, we believe that the biggest problem is providing a means to discover new books -- too many options may be overwhelming. Eric Schmidt of Google said, "Every two days now we create as much information as we did from the dawn of civilization up until 2003." To remedy, Atacama provides three tools to discover new books: a term frequency-inverse document frequency based search engine, a visual graph with related books, and the ability to share book lists with friends. We hope that these three tools, used individually or together, provide a pleasurable and non-overwhelming book discovery experience.

In comparison to existing online services, companies like Amazon and Scribd provide access to books, but often at a prohibitive cost. Projects like Gutenberg provide free books, but lack book discovery features. We combine the best of these services: free books like Gutenberg and useful features like Amazon and Scribd.

The main goal of Atacama is to empower society by fostering a curiosity and love of reading. We hope to accomplish this goal by providing an accessible interface to discover and read books. We hope that Atacama will, in-turn, improve society.


## 3. Discuss the data in your database

The database holds book metadata including author, title, subtitle (if we have one for the book), as well as a number of tags such as subject and genre. This metadata supports search and the visualiation functionalities. We also save information about when users view specific books for our recent books feature.

In addition to book metadata, we store basic user information and book list metadata to support our book list feature.

## 4. Include your ER Diagram and Schema

### ER Diagram
![](https://i.imgur.com/cqUr0Ff.png)

### Schema
(**_keys in bold & italics_**)
Author(**_id_**, name, ol_key)
AuthorAlternativeNames( **_author_id_**,alt_name,ol_key)
AuthoredBy(**_book_id_**,**_author_id_**)
Book(**_id_**,title,publish_date,bucket,key,ol_key,subtitle,number_of_pages)
BookList(**_id_**,name,description,created,owner)
Contains(**_book_id_**,**_book_list_id_**)
ExternalBookIdentifiers(**_id_**,type,value,book_id)
HasTag(**_book_id_**,**_tag_id_**)
OwnedBy(**_user_id_**,**_book_list_id_**)
Saved(**_book_**id,_user_id_)
Tag(**_id_**,type,value)
User(**_id_**,name,email,photo)
Viewed(**_id_**,book_id,user_id,date)
sessions(**_session_id_**,expires,data)


## 5. Briefly discuss from where you collected data and how you did it (if crawling is automated, explain how and what tools were used)

We originally used data from Open Library (OL) to populate our database. They provide a complete dump of their data which has a large amount of metadata about millions of books. This was a good start, however a core feature was enabling reading books online. To support this, we pulled data from Project Gutenberg (PG) - they have books in epub format, which enables us to display books in a consistent manner across different displays. It also enables us to search against not only the metadata, but also the full text of a book.

The OL data was provided as tab separated values with the last column being a json object containing all of the information. We used a number of linux command line utilities (such as grep, awk, sed, and jq) to transform the data into something we could load into our database. We also added a few columns of metadata (such as the open library id for an item) to facilitate correlating related data. Once we finished ingesting the records, we removed these extra columns from the relations.

Once we were ready to start displaying books, and implementing search, we added data from PG. This was slightly more complicated as they did not provide raw dumps of their data, and we wanted to only use records for which they had ePubs. We rsynced their rdf records for the books in their collection, used xmlstarlet to extract data from these, and filter out books for which an ePub is not present, and then downloaded the ePub files from PG. We then loaded the metadata for these books into our database, and uploaded the ePubs to S3. After this, we used a script to grab the data we needed to index, and indexed the data.

## 6. Clearly list the functionality of your application (feature specs)

 - Modern and aesthetically pleasing user interface through a Single Page App (SPA) supporting both computers and mobile devices.
 - Book reading in the browser
 - Booklist sharing, with user authentication
 - Advanced Search Engine supporting fielded boolean queries with wildcards and proximity queries
 - Support for drilling down into searches using facetting
 - Visualization of related books


## 7. Explain one basic function

One of our basic functions is our book list feature. Through our application, you can create booklists to store a list of books that you'd like to keep for later. You can view all of your book lists, as well as the books in them on a separate page. This page also allows you to remove books from your book list.

## 8. Show the actual SQL code snippet

The SQL code to fetch all of the books which are part of a book list is:

```sql
SELECT Book.*, saved, viewed.date
FROM Book
  INNER JOIN Contains ON Book.id = Contains.book_id
  INNER JOIN BookList ON Contains.book_list_id = BookList.id AND BookList.owner = ?
  LEFT JOIN (
    SELECT book_id, date
    FROM Viewed WHERE user_id = ?
    GROUP BY user_id ORDER BY date DESC
  ) AS viewed ON Book.id = viewed.book_id
  LEFT JOIN (
    SELECT COUNT(*) AS saved, book_id
    FROM Saved WHERE user_id = ?
    GROUP BY book_id
  ) AS saved ON Book.id = saved.book_id
WHERE Contains.book_list_id = ?
ORDER BY Book.publish_date
```

The question marks are placeholders, a fully populated example query looks like:

```sql
SELECT Book.*, saved, viewed.date
FROM Book
  INNER JOIN Contains ON Book.id = Contains.book_id
  INNER JOIN BookList ON Contains.book_list_id = BookList.id AND BookList.owner = 1
  LEFT JOIN (
    SELECT book_id, date
    FROM Viewed WHERE user_id = 1
    GROUP BY user_id ORDER BY date DESC
  ) AS viewed ON Book.id = viewed.book_id
  LEFT JOIN (
    SELECT COUNT(*) AS saved, book_id
    FROM Saved WHERE user_id = 1
    GROUP BY book_id
  ) AS saved ON Book.id = saved.book_id
WHERE Contains.book_list_id = 3
ORDER BY Book.publish_date
```

The query selects all of the book metadata specific to a book, the last date the book was viewed by the specific user, if the book has been saved by a specific user (the data about 'saving' books is currently unused), and limits the books to those that are in a specific book list.

## 9. List and briefly explain the dataflow, i.e. the steps that occur between a user entering the data on the screen and the output that occurs (you can insert a set of screenshots)

While our interface is pretty simple, the data flow behind the scenes is somewhat complex. Let's take a dive into the data flow for a book search query:

### Search dataflow in the frontend

Things begin in the search box component. When the user hits enter in the AutoComplete (search box component ), the function `this.props.onNewRequest`, which is passed by the parent component, gets called. This function dispatches an `Action`, which is the way you make state changes in Redux.
```
<AutoComplete
              hintText="Search For Books"
              dataSource={this.state.dataSource}
              onUpdateInput={this.onUpdateInput}
              onNewRequest={this.props.onNewRequest}
/>
```
We then use middleware to make an http request to one of our endpoints. While we wait for our request, we'll display a loading circle. When the response comes back, a reducer will pick up a newly dispatched success action and create a new state with the books.

We have a `BookGrid` component that is 'connected to our redux store:
 ```
 <BookGrid
               {...this.props}
               currentPage={this.state.currentPage}
               nextPage={this.nextPage}
               prevPage={this.prevPage}
              />
```
This `BookGrid` component will rerender when its `this.props.books` changes:
```
{this.props.books.results.map((book,i) => <BookCard key={i} book={book} {...this.props} addBookToBookList={this.props.addBookToBookList} />)}

```
This is then displayed to the user.

![](https://i.imgur.com/i13tOYR.png)


### Search dataflow in the backend

When we recieve a request to /api/books/search, we pull out the required and optional parameters:
- page is optional, search results are paginated, it indicates which page of search results you are requesting and defaults to 0 (note: 0-indexed)
- count is optional, it indicates how many results you want per page and defaults to 20
- q is required. This is the query you are executing.
- fq.\<field\> can be repeated any number of time for any number of fields. These filter queries are used by our facet functionality.

All of the filter query parameters for a single field are ORed together. For example, `/api/books/search?q=*&fq.language=tl&fq.language=en` would result in a final filter query looking like `language:(en OR tl)`. Filter queries for different fields are ANDed together. For example, `/api/books/search?q=*&fq.language=en&fq.language=tl&fq.author=Robert Jordan` would result in a filter query looking like `language:(en OR tl) AND author:"Robert Jordan"`. This is important, otherwise adding multiple filter queries (i.e. selecting multiple facet values) for a single field would result in far fewer results than would be expected.

Once this restructuring is complete, we execute the query against our index. This results in a list of book ids which match the query sorted by relevance. Once we have these ids, we fetch all of the metadata about the books from our database and return this list, as well as pagination information.

## 10. Explain your two advanced functions and why they are considered as advanced. Being able to do it is very important both in the report and final presentation.

### Advanced Function 1: Search engine

Our advanced free text search allows searching through the entire corpus of books using a complex and powerful query language which support boolean queries, wildcards, and proximity queries. This feature allows you to discover new books which might be of some interest. The search algorithm is based on term frequency-inverse document frequency. This algorithm is widely used as a base for search engines like google. The basic idea is that you have a set of documents, each of which has a list of terms. For each document, you count how many times each term appears. Then you divide that by how many documents the term appears in. This ensures that terms which are unique to a specific document, and appear numerous times in that document, contribute significantly more to a search score than terms which appear in every document a lot of times (An example of the first type of term might be something like 'Alice' in Alice in Wonderland, and the second would be the word 'the'). We also use lists of stopwords so that words that we know are not unique (i.e. 'the') don't adversely effect searching.

Our advanced search also allows us to calculate facet values for specific fields. We currently support facetting on author, language, subject, and if the book is public domain or copywrited. This allows you to drill down and refine your search as your looking through the results. This is a quick way to amend your search and add criteria such as 'I only want results that are in english', or 'I only want to see books by Lewis Carroll'.

### Advanced Function 2: Visualization
Online stores often provide lists of related books. We want to do something similar but unique -- put related books in a non-linear data structure, a graph.

Problems with graph layouts include edge crossings (famous Kuratowski theorem characterizing crossings, it turns out most graphs have crossings), which we want to minimize. We also want to distribute vertices evenly and conform to the frame. We also want connected books to be near each other.

Our solution is to use the algorithm from a seminal paper with 4000 citation, Fruchterman and Reingold. The goal: distribute vertices evenly, minimize edge crossings, reflect inherent symmetry. The method: analogy to natural forces, nodes move relative to each other until energy minimized at equilibrium state -- nodes too close together will repel, connected but distant nodes will attract. This is a heuristic for aesthetically pleasing layout; it only converges to a local, not always global, minimum. The model is defined as follows. Let
   - A be the area of the canvas
   - graph G with
     - n_i and n_j be an arbitrary pair of nodes in the graph
     - p_i and p_j be 2d coordinates of nodes n_i and n_j
   - N be the number of nodes
   - C be an adjustable constant
   - k=C\sqrt{A/N}
   - F_a(n_i,n_j) = ((|p_j-p_i|^2)/k)*(p_i-p_j)  is an attractive force between each pair of connected nodes
   - F_r(n_i,n_j) = (-k^2/|p_j-p_i|)*(p_i-p_j)  is a repulsive force between all pairs of nodes.

Our implementation of this algorithm uses the D3.js visualization library. The visualization started with a simple graph with draggable nodes. We added panning and zooming, a book cover at each node, and hyperlinks to navigate to the next book. We implemented the algorithm described above for node layout. The forces were slightly modified to prevent book covers from overlapping. The algorithm uses D3's time-stepping, which causes some instability at the beginning of simulation, but seems to stabilize.

Also, we wrote an algorithm that takes a book id, and returns related books along with their inter-relationships among themselves. This algorithm accumulates statistics including whether authors match, how many tags match, and the text search results. These statistics are put into a histogram which is truncated to choose only the strongest connected nodes, which recieve a graph edge between them. Currently, the database of books is small, so the number of matches is small, so there is no need to truncate the histogram.





## 11. Describe one technical challenge that the team encountered.  This should be sufficiently detailed such that another future team could use this as helpful advice if they were to start a similar project or were to maintain your project. Say you created a very robust crawler - share your knowledge. You learnt how to visualize a graph and make an interactive interface for it - teach all! Know how to minimize time building a mobile app - describe!

One challenge that emerged was how we would build our frontend - what tools to use, which framework to choose, and how to integrate with the backend. From a frontend perspective, React has emerged as one of the dominant technologies for building UI's. While building apps with React is awesome, there is the JavaScript tooling intimidating effect, as it moves very quickly and is constantly changing. It's especially important to stay attentive to the age of articles/tutorials/commits, as even something that's a year old could be out of date by the time you get around to reading it.

Choosing the appropriate tools to build a frontend is critical - use tools/constructs from 2002 and your UI will be outdated in the best scenario - use tools you can't understand and that are poorly configured will steal your precious time away from actually building things.

As of this writing in May 2017, the `create-react-app` project maintained by Facebook should be your go-to when developing an interface. The project has good documentation and comes with many popular tools out of the box, which vastly improve the development process. If you are a beginner or inexperieced, having a zero-config starter repo goes miles, as you can focus on actually building components instead of configuring Webpack to understand your project correctly. Before `create-react-app`, there were many boilerplates that came configured to some degree, but it was difficult to choose the right one, and some boilerplates are way too large and unwieldy to learn from. Using this repo will 100% reduce the maintenaince and time to get a project set up, and you will be thankful.

We actually took `create-react-app` one step further with [this post](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/). Since webpack runs its own development server, we needed a way to develop cleanly with the express server. The great people at fullstackreact built a repo that allows you to integrate a backend node server into your development environment by setting up proxy requests from the frontend to backend - golden! The guide also showed how to deploy directly to Heroku via push to master, which is great.
## 12. State if everything went according to the initial development plan and proposed specifications, if not - why?!

We encountered the following unforseen difficulties:
 - React and D3 compete over how they handle data. We made a good-faith effort to combine them, but we were, unfortunately, unsuccessful. The visualization currently lives on a different webpage, but still accesses the backend.
 - The visualization required more work than expected. D3.js v4 is new, has many changes breaking compatibility with v3, and lacks online examples, but has a modular physics engine allowing implementing our own forces. Working with D3 requires persistence in trying different things and hoping they work. A lot of debugging was done with browser dev tools to see what svg structure is created by the D3 code.
 - We were initially pretty ambitious in what we wanted to build - our first thought was an Amazon clone. But when we lost a team member, we realized that we'd have to tone down our ambitious goals to something more realistic but still useful. We're still happy with what we built, since it's something useful to the world - if I'm on the train and have nothing to do, I can pull up the app and pick a free book to read

## 13. Describe the final division of labor and how did you manage team work.

Jonathan produced a modern, flexible, aesthetically pleasing frontend. Especially time consuming were the booklist interface and the e-book reader.

Lloyd powered the project with the database and server work. In particular, he wrote the scripts to scrape books, and he set up the search engine which even searches full-text of books.

Paul supplemented the features with the visualization advanced functionality. Paul also performed some administrative tasks and wrote a large portion of the final report.








# Starter Repo Overview
This project was forked from `fullstackreact/food-lookup-demo`. Below are instructions on how to run the project locally as well as deploy to Heroku.


## Running locally

```
git clone git@github.com:fullstackreact/food-lookup-demo.git
cd food-lookup-demo
npm i

cd client
npm i

cd ..
npm start
```

## Overview

`create-react-app` configures a Webpack development server to run on `localhost:3000`. This development server will bundle all static assets located under `client/src/`. All requests to `localhost:3000` will serve `client/index.html` which will include Webpack's `bundle.js`.

To prevent any issues with CORS, the user's browser will communicate exclusively with the Webpack development server.

Inside `Client.js`, we use Fetch to make a request to the API:

```js
// Inside Client.js
return fetch(`/api/food?q=${query}`, {
  // ...
})
```

This request is made to `localhost:3000`, the Webpack dev server. Webpack will infer that this request is actually intended for our API server. We specify in `package.json` that we would like Webpack to proxy API requests to `localhost:3001`:

```js
// Inside client/package.json
"proxy": "http://localhost:3001/",
```

This handy features is provided for us by `create-react-app`.

Therefore, the user's browser makes a request to Webpack at `localhost:3000` which then proxies the request to our API server at `localhost:3001`:

![](./flow-diagram.png)

This setup provides two advantages:

1. If the user's browser tried to request `localhost:3001` directly, we'd run into issues with CORS.
2. The API URL in development matches that in production. You don't have to do something like this:

```js
// Example API base URL determination in Client.js
const apiBaseUrl = process.env.NODE_ENV === 'development' ? 'localhost:3001' : '/'
```

This setup uses [concurrently](https://github.com/kimmobrunfeldt/concurrently) for process management. Executing `npm start` instructs `concurrently` to boot both the Webpack dev server and the API server.

## Deploying

### Background

The app is ready to be deployed to Heroku.

In production, Heroku will use `Procfile` which boots just the server:

```
web: npm run server
```

Inside `server.js`, we tell Node/Express we'd like it to serve static assets in production:

```
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
```

You just need to have Webpack produce a static bundle of the React app (below).

### Steps

We assume basic knowledge of Heroku.

**0. Setup your Heroku account and Heroku CLI**

For installing the CLI tool, see [this article](https://devcenter.heroku.com/articles/heroku-command-line).

**1. Build the React app**

Running `npm run build` creates the static bundle which we can then use any HTTP server to serve:

```
cd client/
npm run build
```

**2. Commit the `client/build` folder to source control**

From the root of the project:

```
git add client/build
git commit -m 'Adding `build` to source control'
```

**3. Create the Heroku app**

```
heroku apps:create food-lookup-demo
```

**4. Push to Heroku**

```
git push heroku master
```

Heroku will give you a link at which to view your live app.
