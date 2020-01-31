# Fiction Server
This heroku back end is designed to store use story information.
Each fiction story is stored as text for the end user to interpret.
The main difficulty with this server was getting the correct information to the client without giving them all of the users information. 
## To view more information about the front end go here
https://benlirio.github.io/fiction-client

## Technologies Used:
* Node js
* Express js
* Mongo DB
* Mongoose

## To view both front and back end deployed go here:
Note, the back end is just a REST api with no index.html file.

https://fiction-api.herokuapp.com/

https://benlirio.github.io/fiction-client


## Unsolved problems
I was attempting to insert a AI text analysis software into the program, but the the platform I was running on, Google cloud run only supports up to 2 gigabit's of storage.

## Back end planning

I started with one resource named Story(which pluralized to storys) in code.
Because of the pluralization I changed the resource name to Slate.
This was the name of the editor interface I was using. This was a large mistake, because it was not trivial changing the client side to reflect that. Because of this I switched back to story.
I removed the title and only gave my resource one variable because of the type of data I was storing. It looks like parsed dom, but it is actually an entity of slate (the text editing interface) I was storing.


## Entity Relationships:
USER { 
  email,
  password,
  token
}
STORY {
  user: USER-ID
  text: (slate info)
}

# ROUTES
* AUTH GET `/storys` : returns that users stories
* AUTH GET `/storys/:id` : return that users story by id
* AUTH POST `/storys` : creates new story for that user
* AUTH PATCH `/storys/:id` : updates a story belonging to that user
* AUTH DELETE `/storys/:id` : delete a story belonging to that user

* `/sign-up` : credentials => creates user
* `/sign-in` : credentials => returns token
* AUTH `/change-password `: passwords => changes users password
* AUTH `/sign-out` : deletes users token


# Set up instruction
fork and clone the repo then use 
`npm install`
to download dependencies.
After if you want to serve to local 4741 use `nodemon index` in order to get hot reload.