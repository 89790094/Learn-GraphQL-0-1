import { ApolloClient, InMemoryCache, HttpLink,ApolloLink, gql } from 'apollo-boost'


const client = new ApolloClient({
    link:new HttpLink({
        uri: 'http://localhost:4000'
    }),
    cache: new InMemoryCache()
})
//Query

const users = gql`
query{
  users{
    id
    name
  }
}
`
client.query({
    query: users
})
    .then((response) => {
        let userStr = ''
        response.data.users.forEach(element => {
            userStr += `<li>${element.name}</li>`
        });
        document.getElementById('users').innerHTML = userStr
    })

// mutation:create

const createUser = gql`
mutation($data:CreateUserInput!){
  createUser(data:$data){
    user{
      id
      name
      email
      password
    }
    token
  }
}
`

client.mutate({
    mutation: createUser,
    variables: {
        data:{
            name:'liudd',
            password:'sa',
            email:'liudd@gmail.com'
        }
    }
})
.then((response)=>console.log(response.data))

// mutation:delete

const authLink = new ApolloLink((operation,forward)=>{
    operation.setContext({
        headers:{
            "authorization":"Bearer "+"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJjazdyOGR5YW0wMTc1MDgyMjh5a2VyYm51IiwiaWF0IjoxNTg0MTY4NDU5LCJleHAiOjE1ODQ3NzMyNTl9.KFEH1DaAAIf48STZQmoT1S-4Ys68eF9DMHNQNJuIhJM"
        }
    })
    return forward(operation)
})

const authClient = new ApolloClient({
    link: ApolloLink.from([
        authLink,
        new HttpLink({uri: 'http://localhost:4000'})
    ]),
    cache: new InMemoryCache()
})

const deleteUser = gql`
mutation{
  deleteUser{
    id
    name
  }
}
`
authClient.mutate({
    mutation:deleteUser
}).then((response)=>console.log(response.data))