import uuidv4 from 'uuid/v4'
const Mutation = {
    createUser(parent, args, { db }, info) {
        const { data } = args
        const user = { id: uuidv4(), ...data }
        db.users.push(user)
        return users

    },
    updateUser(parent, args, { db }, info) {
        const { id, data } = args
        const user = db.users.find((i) => i.id === id)
        if (user) {
            let index = db.users.findIndex((i) => JSON.stringify(i) === JSON.stringify(user))
            db.users[index].name = data.name
            db.users[index].age = data.age
        }
        return user
    },
    deleteUser(parent, args, { db }, info) {
        const { id } = args
        const user = db.users.find((i) => i.id === id)
        if (user) {
            db.users = db.users.filter((i) => i.id !== id)
            return user
        } else {
            throw new Error('用户未发现')
        }
    },
    createArticle(parent, args, { db, pubsub }, info) {
        const { data } = args
        const article = { id: uuidv4(), ...data }
        db.arts.push(article)
        pubsub.publish('article_topic', {
            article: {
                mutation: 'CREATED',
                data: article
            }
        })
        return article
    },
    deleteArticle(parent, { id }, { db, pubsub }, info) {
        if (db.arts.find((i) => id == i.id)) {
            db.arts = db.arts.filter((i) => id != i.id)
            pubsub.publish('article_topic', {
                article: {
                    mutation: 'DELETED',
                    data: db.arts.find((i) => id == i.id)
                }
            })
        } else {
            throw new Error('文章不存在')
        }
    },
    createComment(parent, args, { db, pubsub }, info) {
        const { data } = args
        const comment = { id: uuidv4(), ...data }
        db.comments.push(comment)
        pubsub.publish(`comment ${comment.aid}`, { comment })
        return comment
    }

}
export { Mutation }