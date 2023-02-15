import graphql from 'graphql';

import { postModel } from '../models/post-model.js';
import { authorModel } from '../models/author-model.js';

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
} = graphql;

const author = new GraphQLObjectType({
    name: 'author',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
    })
});

const posts = new GraphQLObjectType({
    name: 'post',
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        author: { type: GraphQLString },
        author_data: {
            type: author,
            resolve(parent, args) {
                return authorModel.find({ name: parent.author });
            }
        },
    }),
});

const rootQuery = new GraphQLObjectType({
    name: 'rootQuery',
    fields: {
        post: {
            type: posts,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return postModel.findById(args.id);
            }
        },
        posts: {
            type: new GraphQLList(posts),
            resolve(parent, args) {
                return postModel.find({});
            },
        }
    },
});

const mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        addPost: {
            type: posts,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                content: { type: new GraphQLNonNull(GraphQLString) },
                author: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                return postModel.create({ title: args.title, content: args.content, author: args.author });
            }
        }
    },
});

export const schema = new GraphQLSchema({
    query: rootQuery,
    mutation: mutation,
});