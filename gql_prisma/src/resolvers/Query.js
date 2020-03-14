import { getUserId } from "../utils/common"

const Query = {
    users(parent, { keyword, first, skip, orderBy }, { prisma }, info) {
        const optArgs = { first, skip, orderBy }
        if (keyword) {
            optArgs.where = {
                OR: [
                    { id: keyword },
                    { email: keyword }
                ]
            }
        }
        return prisma.users(optArgs, info)
    },
    articles(parent, { keyword, first, skip, orderBy }, { prisma, request }, info) {
        orderBy = orderBy ? orderBy : updatedAt_DESC
        const optArgs = { first, skip, orderBy }
        const uid = getUserId(request)
        if (uid) {
            if (keyword && keyword === uid) {
                optArgs.where = {
                    author: { id: uid }
                }
            } else {
                optArgs.where = {
                    OR: [
                        { published: true },
                        { author: { id: uid } }
                    ]
                }
            }

        } else {
            optArgs.where = {
                published: true
            }
        }
        return prisma.articles(optArgs, info)
    },
    comments(parent, { keyword, first, skip, orderBy }, { prisma }, info) {
        const optArgs = { first, skip, orderBy }
        if (keyword) {
            optArgs.where = {
                OR: [
                    { id: keyword },
                    { author: { id: keyword } },
                    { article: { id: keyword } }
                ]
            }
        }
        return prisma.comments(optArgs, info)
    }
}
export { Query }