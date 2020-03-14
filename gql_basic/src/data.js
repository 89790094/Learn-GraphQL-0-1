// 用户
const users = [{
    id: '1',
    name: 'liuneng',
    age: 32
}, {
    id: '2',
    name: 'zhaosi',
    age: 13
},
{
    id: '3',
    name: 'xieguankun',
    age: 26
}]
// 文章
const arts = [{
    id: 1,
    title: '乡村爱情',
    content: '赵四、刘能、谢广坤',
    author: '3'
}, {
    id: 2,
    title: '东北二人转',
    content: '赵家班',
    author: '2'
}, {
    id: 3,
    title: '刘老根',
    content: '大舞台',
    author: '3'
}]
// 评论
const comments = [{
    id: '101',
    txt: '评论乡村爱情',
    aid: '1',
    author: '1'
},
{
    id: '102',
    txt: '评论东北二人转',
    aid: '2',
    author: '2'
},
{
    id: '103',
    txt: '评论刘老根',
    aid: '3',
    author: '2'
}]

const db = {users,arts,comments}
export {db}