import { GraphQLServer, PubSub } from 'graphql-yoga'
import { db } from './data'
import { Query } from './resolvers/Query'
import { Mutation } from './resolvers/Mutation'
import { Subscription } from './resolvers/Subscription'
import { Article } from './resolvers/Article'
import { User } from './resolvers/User'
import { Comment } from './resolvers/Comment'
import { prisma } from '../prisma/generated/prisma-client'

//scalar:String,Int,Float,Boolean,ID

const pubsub = new PubSub()
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    context(request) {
        return { db, prisma, pubsub, request}
    },
    resolvers: {
        Query,
        Mutation,
        Subscription,
        Article,
        User,
        Comment
    }
})
server.start(() => {
    console.log('server is run localhost:4000')
})