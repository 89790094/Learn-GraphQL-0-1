const Comment = {
    author(parent, args, { prisma }, info) {
        return prisma.comment({id:parent.id}).author()
    },
    article(parent, args, { prisma }, info) {
        return prisma.comment({id:parent.id}).article()
    }
}
export { Comment }