const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLList }  = require('graphql')
const { find, propEq, filter } = require('ramda')
const Category = require('../models/category')

const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: () => ({
        id: { type: GraphQLString },
        t: { type: GraphQLString },
    })
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCategory: {
            type: CategoryType,
            args: {
                t: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                const category = new Category({
                    t: args.t
                })
                return category.save()
            }
        }
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        category: {
            type: CategoryType,
            args: {
                id: { type: GraphQLString },
                t: { type: GraphQLString }
            },
            resolve: (parent, args) => Category.find({
                id: args.id,
                t: args.t
            })
        },
        categories: {
            type: GraphQLList(CategoryType),
            resolve: () => Category.find({})
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})