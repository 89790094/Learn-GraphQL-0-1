import { SECRET } from '../utils/config'
import { getUserId, signToken, encrypt, compare } from '../utils/common'

const Mutation = {
    async createUser(parent, args, { prisma }, info) {
        const { data } = args
        const isExistsEmail = await prisma.$exists.user({ 'email': data.email })
        if (isExistsEmail) {
            throw new Error('Email已占用')
        }
        const password = await encrypt(data.password)
        const user = await prisma.createUser({
            ...data,
            password
        }, info)
        return {
            user,
            token: signToken({ 'uid': user.id })
        }
    },
    async updateUser(parent, { data }, { prisma, request }, info) {
        const uid = getUserId(request)
        if (data.password) {
            let password = await encrypt(data.password)
            data = { ...data, password }
        }
        return prisma.updateUser({
            where: { id: uid },
            data
        }, info)

    },
    async deleteUser(parent, args, { prisma, request }, info) {
        const id = getUserId(request)
        const isExistsId = await prisma.$exists.user({ id })
        if (!isExistsId) {
            throw new Error('不存在')
        }
        return await prisma.deleteUser({ id }, info)
    },

    async deleteManyUsers(parent, args, { prisma }, info) {
        const optArgs = {}
        if (args.query) {
            optArgs.OR = [
                { id_in: args.query },
                { email_in: args.query }
            ]
        }
        return await prisma.deleteManyUsers(optArgs, info)
    },

    async userLogin(parent, { data }, { prisma }, info) {
        const user = await prisma.user({ 'email': data.email })
        if (!user) {
            throw new Error('Email无效')
        }
        const isValidPwd = await compare(data.password, user.password)
        if (!isValidPwd) {
            throw new Error('密码错误')
        }
        return {
            user,
            token: signToken({ 'uid': user.id })
        }
    },

    createArticle(parent, { data }, { prisma, request }, info) {
        const uid = getUserId(request)
        if (uid) {
            let author = {
                connect: {
                    id: uid
                }
            }
            data = { ...data, author }
        }
        return prisma.createArticle(data, info)
    },
    async updateArticle(parent, { id, data }, { prisma, request }, info) {
        const uid = getUserId(request)
        const isMyArticle = await prisma.$exists.article({
            id, author: { id: uid }
        })
        if (!isMyArticle) {
            throw new Error('无法修改')
        }
        const isPublished = await prisma.$exists.article({
            id, published: true
        })
        if (isPublished && data.published == false) {
            await prisma.deleteManyComments({ article: { id } })
        }
        return await prisma.updateArticle({
            where: { id },
            data
        }, info)
    },
    async deleteArticle(parent, { id }, { prisma, request }, info) {
        const uid = getUserId(request)
        const isMyArticle = await prisma.$exists.article({
            id,
            author: { id: uid }
        })
        if (!isMyArticle) {
            throw new Error('无法删除')
        }
        return prisma.deleteArticle({ id }, info)
    },
    async createComment(parent, { data }, { prisma, request }, info) {
        const uid = getUserId(request)
        const isExistsPub = await prisma.$exists.article({ published: true, id: data.article })
        if (!isExistsPub) {
            throw new Error('文档未分开')
        }
        const optArgs = {}
        optArgs.txt = data.txt
        optArgs.author = {
            connect: {
                id: uid
            }
        }
        optArgs.article = {
            connect: {
                id: data.article
            }
        }
        return prisma.createComment(optArgs, info)
    }

}
export { Mutation }