const Subscription = {
    somethingChange: {
        subscribe(parent, args, { pubsub }, info) {
            let count = 0
            setInterval(() => {
                count++
                pubsub.publish('something-topic', { somethingChange: count })
            }, 1000)
            return pubsub.asyncIterator('something-topic')
        }
    },
    comment: {
        subscribe(parent, { aid }, { db, pubsub }, info) {
            if (db.arts.find((i) => aid == i.id)) {
                return pubsub.asyncIterator(`comment ${aid}`)
            } else {
                throw new Error('无法订阅')
            }
        }
    },
    article: {
        subscribe(parent, args, { pubsub }, info) {
            return pubsub.asyncIterator("article_topic")
        }
    }
}
export { Subscription }