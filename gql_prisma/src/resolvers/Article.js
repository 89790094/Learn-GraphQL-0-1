const Article = {
    author(parent, args, { prisma }, info) {
        return prisma.article({id:parent.id}).author()
    },
    comment(parent, args, { prisma }, info) {
        return prisma.article({id:parent.id}).comment()
    }
}
export { Article }