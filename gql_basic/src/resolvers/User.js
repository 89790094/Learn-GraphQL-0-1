const User = {
    text(parent, args, { db }, info) {
        return db.arts.filter((i) => i.author === parent.id)
    },
    comment(parent, args, { db }, info) {
        return db.comments.filter((i) => i.author === parent.id)
    }
}
export { User }