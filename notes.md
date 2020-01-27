# Notes


## CRUD Routes

| HTTP Verb | URI | Returns | Status Code |
| --- | --- | --- | --- |
| GET | /books | { books: [{}] } | 200 |
| GET | /books/:id | { book: {} } | 200 or 404 |
| POST | /books | { book: {} } | 201 |
| DELETE | /books/:id | - | 204 or 404 |
| PATCH | /books/:id | - / { book: {} } | 204 / 200 or 404 |

## Languages & Frameworks

I introduced this lesson with a comparison of Rails and Express.  I also added a few others after, to help folks understand that there are many different stacks they may encounter, and I was careful to explain that for each language there are many different server/frameworks/databases that are combined into different stacks.

| Language | Server | Framework | Database | Object Mapper |
| ---  | --- | --- | --- | --- |
| Ruby | Puma | Rails | PostgreSQL | ActiveRecord |
| Javascript | Node.js | Express | Mongo | Mongoose |
| PHP | Nginx | Laravel | MySQL | Eloquent |
| Python | uWSGI | Django | PostgreSQL | Django ORM |

Also needed to clarify what ORMs / ODMs do for us:

With an Object Relational Mapping or Object Document Mapper, we can query and manipulate data from a database using an object-oriented paradigm (instead of writing SQL statements for example).  ORMs/ODMs:

- Represent models and their data.
- Represent associations between these models.
- Represent inheritance hierarchies through related models.
- Validate models before they get persisted to the database.
- Perform database operations in an object-oriented fashion.
