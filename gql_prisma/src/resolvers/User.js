import { getUserId } from "../utils/common"

const User = {
    article(parent, args, { prisma, request }, info) {
        const uid = getUserId(request)
        const optArg = {}
        if (uid) {
            optArg.where = {
                OR: [
                    { published: true },
                    { author: { id: uid } }
                ]
            }
        } else {
            optArg.where = {
                published: true
            }
        }
        return prisma.user({ id: parent.id }).article(optArg, info)
    },
    comment(parent, args, { prisma }, info) {
        return prisma.user({ id: parent.id }).comment()
    },
    email(parent, args, { prisma, request }, info) {
        const uid = getUserId(request)
        return uid && uid === parent.id ? parent.email : null
    },
    password(parent, args, { prisma, request }, info) {
        const uid = getUserId(request)
        return uid && uid === parent.id ? parent.password : null
    }
}
export { User }