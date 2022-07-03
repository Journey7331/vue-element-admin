const Mock = require('mockjs')

const List = []
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        'id': /^([0-9]{12})(22)[0-9]{5}$/,
        source: '@cname',
        receive_time: +Mock.Random.date('T'),
        due_time: +Mock.Random.date('T'),
        contact: '@cname',
        'number': /^[1]([3-9])[0-9]{9}$/,
        content: '@csentence',
        'amount|50-2000': 1,
        'rate': /^([1-9]?\d(\.\d\d?\d?)?)%$/,
        files: '',
        'follow|0-3':1,

    }))
}

module.exports = [
    {
        url: '/qms/quote/list',
        type: 'get',
        response: config => {
            const { page = 1, limit = 20, sort} = config.query

            let mockList = List.filter(item => {
                // if (importance && item.importance !== +importance) return false
                // if (type && item.type !== type) return false
                // if (title && item.title.indexOf(title) < 0) return false
                return true
            })

            if (sort === '-id') {
                mockList = mockList.reverse()
            }

            const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

            return {
                code: 20000,
                data: {
                    total: mockList.length,
                    items: pageList
                }
            }
        }
    },

    // {
    //     url: '/vue-element-admin/article/detail',
    //     type: 'get',
    //     response: config => {
    //         const {id} = config.query
    //         for (const article of List) {
    //             if (article.id === +id) {
    //                 return {
    //                     code: 20000,
    //                     data: article
    //                 }
    //             }
    //         }
    //     }
    // },

    // {
    //     url: '/vue-element-admin/article/pv',
    //     type: 'get',
    //     response: _ => {
    //         return {
    //             code: 20000,
    //             data: {
    //                 pvData: [
    //                     {key: 'PC', pv: 1024},
    //                     {key: 'mobile', pv: 1024},
    //                     {key: 'ios', pv: 1024},
    //                     {key: 'android', pv: 1024}
    //                 ]
    //             }
    //         }
    //     }
    // },
    //
    // {
    //     url: '/vue-element-admin/article/create',
    //     type: 'post',
    //     response: _ => {
    //         return {
    //             code: 20000,
    //             data: 'success'
    //         }
    //     }
    // },
    //
    // {
    //     url: '/vue-element-admin/article/update',
    //     type: 'post',
    //     response: _ => {
    //         return {
    //             code: 20000,
    //             data: 'success'
    //         }
    //     }
    // }
]

