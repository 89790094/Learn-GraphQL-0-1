import { getUserId } from '../utils/common'
const Subscription = {
    user: {
        async subscribe(parent, args, { prisma }, info) {
            return await prisma.$subscribe.user()
        },
        resolve(payload) {
            return resolve
        }
    },
    article: {
        async subscribe(parent, args, { prisma }, info) {
            return await prisma.$subscribe.article({
                node: {
                    published: true
                }
            }, info)
        },
        resolve(payload) {
            return payload
        }
    },
    myArticle: {
        async subscribe(parent, args, { prisma, request }, info) {
            const uid = getUserId(request)
            if(!uid){
                throw new Error('用户未登录')
            }
            return await prisma.$subscribe.article({
                mutation_in: ['CREATED', 'UPDATED'],
                node: {
                    published: true,
                    author: {
                        id: uid
                    }
                }
            }, info)
        },
        resolve(payload) {
            return payload
        }

    },
    comment: {
        async subscribe(parent, { articleId }, { prisma }, info) {
            return await prisma.$subscribe.comment({
                node: {
                    article: {
                        id: articleId
                    }
                }
            }, info)
        },
        resolve(payload) {
            return payload
        }
    }
}
export { Subscription }