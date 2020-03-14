import { prisma } from '../prisma/generated/prisma-client'

//query
async function user() {
    const u = await prisma.user()
    console.log(u)
    return u
}

async function userToarticle(){
    const result =  await prisma.user({id:'ck7fzki8l01fa0922citlx3bj'}).article()
    console.log(result)
    return result
}

userToarticle().catch((err)=>console.log(err))

async function users() {
    const fragment = `
    fragment UserWithArticleAndComment on User{
        id
        name
        email
        article{
          title
          content
        }
        comment{
          txt
        }
    }
    `
    const us = await prisma.users().$fragment(fragment)
    console.log(JSON.stringify(us, null, 2))
}
// users().catch((err)=>console.log(err))


//mutation

async function createUser() {
    return await prisma.createUser({
        name: 'caojiangling',
        email: 'caojianglin@gmail.com'
    })
}

async function createArticle() {
    return await prisma.createArticle({
        title: '东北人都是活雷锋',
        content: '小沈阳',
        published: true,
        author: {
            connect: {
                id: "ck7fzlg7c01g209227n55r1yo"
            }
        }
    })
}
//createArticle().then((data)=>console.log(data)).catch((err)=>console.log(err))

async function updateArticle(data, id) {
    return await prisma.updateArticle({
        where: {
            id
        },
        data: { ...data }

    })
}
//updateArticle({author:{connect:{id:'ck7fzltml01gh09224oib9z7o'}}},'ck7h5g4ti02tp0922lzit3wo6').then((data)=>console.log(data)).catch((err)=>console.log(err))

async function createComment(data) {
    const { txt, aid, uid } = data
    return await prisma.createComment({
        txt: txt,
        article: {
            connect: {
                id: aid
            }
        },
        author: {
            connect: {
                id: uid
            }
        }
    })
}
// createComment({txt:'乡村爱情的评论',aid:'ck7g1wf8j01oi0922rwfxdf69',uid:'ck7fzki8l01fa0922citlx3bj'}).then((data)=>console.log(data)).catch((err)=>console.log(err))
// exists

async function userExists() {
    const result = await prisma.$exists.user({
        AND: {
            id: "ck7fzki8l01fa0922citlx3bj",
            email: '89790094@qq.com'
        }
    })
    console.log(result)
    return result
}

//userExists().catch((err)=>console.log(err))

// subscrible

async function subscribleUser() {
    const userIterator = await prisma.$subscribe.user({
        mutation_in: ['CREATED']
    }).node()
    while (true) {
        const newUser = await userIterator.next()
        console.log(newUser.value)
    }
}

subscribleUser().catch((err) => console.log(err))

async function subscribleArticle(){
    const articleIterator = await prisma.$subscribe.article({
        mutation_in: ['UPDATED'],
        node:{
            published:true
        }
    }).node()
    while (true) {
        const newArticle = await articleIterator.next()
        console.log(newArticle.value)
    }
}

subscribleArticle().catch((err) => console.log(err))