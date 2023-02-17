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

const authorType = new GraphQLObjectType({
    name: 'author',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        posts: {
            type: new GraphQLList(postsType),
            resolve(parent, args) {
                return authorModel.find({ author: parent.name });
            },
        },
    }
    )
});

const postsType = new GraphQLObjectType({
    name: 'post',
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        author: { type: GraphQLString },
        author_data: {
            type: authorType,
            resolve(parent, args) {
                return authorModel.find({ name: parent.author });
            }
        },
    }),
});

const rootQuery = new GraphQLObjectType({
    name: 'rootQuery',
    fields: {
        getPost: {
            type: postsType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return postModel.findById(args.id);
            }
        },
        getPosts: {
            type: new GraphQLList(postsType),
            resolve(parent, args) {
                return postModel.find({});
            },
        },
        getAuthors: {
            type: new GraphQLList(authorType),
            resolve(parent, args) {
                return authorModel.find({});
            },
        },
    },
});

const mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        addPost: {
            type: postsType,
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