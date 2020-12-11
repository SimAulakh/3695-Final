# 3695-Final
## - Simrat Kaur
### - A01085906

### INSTRUCTIONS TO START THE API SERVER
1. First run "npm install"
2. Then run "node index.js" to start the api playground

#### IMPORTANT NOTE:
## I could not figure out how to work with user and comment array. It would've taken too long to figure out the relations between three schema types which is why I chose to use User and Comments as type String.


### Queries and Mutations

## Queries
# 1.	Get a post by id
query{
  getPostbyID(id: "P101"){
    topic
    user
    body
    comment
  }
}

# 2. Get a post by topic
query{
  getPostByTopic(topic: "Gaming"){
    id
    user
    body
    comment
  }
}

## Mutations
# 3. Create a post
mutation{
  createPost(
    id: "A7128",
    topic: "Python",
    user: "Madison",
    body: "This is the body of the post",
    comment: "this is the comment on the post"
  )
  {
  id
  topic
  user
  body
  comment
}

  }

## 4. Subscriptions
# First run the following:
subscription {
  newPost{
    topic
  }
}

# Then run the following in another window while the first one is still running:
mutation{
  createPost(
    id: "A1BB584",
    topic: "GraphQL",
    user: "Simi",
    body: "This is the body of the post",
    comment: "this is the comment on the post"
  )
  {
  id
  topic
  user
  body
  comment
}

}

# Then you go back to the first window and see the subscribed post pop up. Hence, whenever a new post is created the subscription pops up.

# 5. Add a comment
mutation{
  addComment(
    id: "A1",
    user: "SS",
    body:"HDHEK",
    responses: "ehuihei",
    post: "eheauihue"
  )
}
