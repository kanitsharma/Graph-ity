const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const app = express()
mongoose.connect(
    'mongodb://kt:tsuk1yomi@ds121225.mlab.com:21225/mangalist',
    {
        useNewUrlParser: true
    }
)

mongoose.connection.once('open', () => {
    console.log('connected')
})


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(process.env.PORT || 4000 , _ => {
    console.log('App running on 4000')
})