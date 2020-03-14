const Query = {
    user(parent, args, { db }, info) {
        const { id } = args
        return id ? db.users.filter((i) => i.id === id) : db.users
    },
    article(parent, args, { db }, info) {
        const { id } = args
        return id ? db.arts.filter((i) => i.author == id ? i : null) : db.arts
    },
    comment(parent, args, { db }, info){
        const {id} = args
        return id ? db.comments.filter((i) => i.id == id ? i : null) : db.comments
    }
}
export {Query}