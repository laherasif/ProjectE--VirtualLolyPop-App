const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require('faunadb'),
  q = faunadb.query;

const typeDefs = gql`
  type Query {
    LolyData: [Loly!]
    getLollyByPath(link: String!): Loly
  }
  type Loly {
    id: ID!
    c1: String!
    c2: String!
    c3: String!
    rec: String!
    sender: String!
    msg: String!
    link: String!
  }
  type Mutation {
    addLoly(
      c1: String!, 
      c2: String!,
      c3: String!,
      rec: String!,
      sender: String!,
      link: String!,
      msg: String!) : Loly
  }
`

const resolvers = {
  Query: {
    LolyData: async () => {
      try {
        var adminClient = new faunadb.Client({ secret: 'fnAD6OD-QyACBcMFsavYmk2L8OkTxK5zWMj2r_Y9' })
        const result = await adminClient.query(
          q.Map(
            q.Paginate(q.Match(q.Index('loly'))),
            q.Lambda(x => q.Get(x))
          )
         
        )



        return result.data.map(d => {

          return {
            id: d.ts,
            c1: d.data.c1,
            c2: d.data.c2,
            c3: d.data.c3,
            rec: d.data.rec,
            msg: d.data.msg,
            sender: d.data.sender,
            link: d.data.link
          }
        })
      }
      catch (err) {
        console.log("eror", err)
      }
    },
    getLollyByPath: async (_, { link }) => {
      try {
        var adminClient = new faunadb.Client({ secret: 'fnAD6OD-QyACBcMFsavYmk2L8OkTxK5zWMj2r_Y9' })
        console.log(link)
        var result = await adminClient.query(
          q.Get(q.Match(q.Index('loly'), "sjkdfhkjsdf"))
          // q.Get(q.Ref(q.Collection('Loly'), link))
        )
        console.log("daya" , result.data)
        return result.data
      } catch (e) {
        return e.toString()
      }
    }

  },

  Mutation: {
    addLoly: async (_, { c1, c2, c3, rec, msg, sender, link }) => {
      var adminClient = new faunadb.Client({ secret: 'fnAD6OD-QyACBcMFsavYmk2L8OkTxK5zWMj2r_Y9' });

console.log(c1, c2, c3, rec, msg, sender)
const result = await adminClient.query(
  q.Create(
    q.Collection('Loly'),
    {
      data: {
        c1, c2, c3, rec, msg, sender,
        link,
      }
    },
  )
)
return result.data.data
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()