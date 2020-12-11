const { ApolloServer, gql, PubSub } = require('apollo-server')
const user = require('./src/users')
const post = require('./src/posts')
const comment = require('./src/comments')

const typeDefs = gql
` 
  type Post {
    id: ID!
    topic: String!
    user: String!
    body: String!
    comment: String!
  }

  type User {
    id: ID!
    name: String
    email: String
  }

  type Comment {
    id: ID!
    user: String!
    body: String!
    responses: String
    post: String 
  }

  type Response {
    id: ID!
    body: String!
  }

  type Subscription {
      newPost: Post!

  }

  type Query {
    post: [Post]
    getPostbyID(id: ID!): Post
    getPostByTopic(topic: String!): Post
  }

  type Mutation {
      createPost(id: String!, topic: String!, body: String!, user: String!, comment:String!) : Post!,
      addComment(id: ID!, user: String!, body: String!, responses: String!, post: String!): String,
      addResponse(id: ID!, user: String!, body: String!, responses: String!, post: String!): String
 }

  `
const NEW_POST = "NEW_POST"

const resolvers = {
    Query: {
        // gets all posts
        post: () => post,

        // gets a post by ID
        getPostbyID: (_, { id }) => {
            const postsList = post.find(b => b.id == id)
            return postsList
          },

        // Gets a post by topic
        getPostByTopic: (_, { topic }) => {
            const postsTopicList = post.find(b => b.topic == topic)
            return postsTopicList
          }
        
    },

    Mutation: {
        //This mutation creates a post
        createPost: (_, { id, topic, user, body, comment }, { pubsub }) => {
            const writepost = { id, topic, user, body, comment }
            post.push(writepost)
            pubsub.publish(NEW_POST, { newPost: writepost})
            return writepost
        },

        // This mutation takes in the id of the post and comments on it
        addComment: (_, {id, user, body, responses, post}) => {
            const writeComment = (id, {user: user, body: body, responses: responses, post: post})
            comment.push(writeComment)
            return writeComment
        },

        // This mutation takes in the id of the comment and writes a resonse to it
        addResponse: (_, {id, user, body, responses, post}) => {
            const writeResponse = (id, {user: user, body: body, responses: responses, post: post})
            comment.push(writeResponse)
            return writeResponse
        }
    },

    // This is the subscription part
    Subscription: {
        newPost: {
            subscribe: (_, __, {pubsub}) => pubsub.asyncIterator(NEW_POST)
        }
    },
}

const pubsub = new PubSub()
const server = new ApolloServer({ typeDefs, resolvers, context: ({ req, res}) => ({ req, res, pubsub }) })

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});