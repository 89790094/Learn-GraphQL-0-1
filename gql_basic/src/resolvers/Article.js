const Article = {
    author(parent, args, { db }, info) {
        return db.users.find((i) => i.id === parent.author)
    },
    comment(parent, args, { db }, info) {
        return db.comments.filter((i) => i.aid == parent.id)
    }
}
export { Article }