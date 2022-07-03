import request from '@/utils/request'

export function fetchList(query) {
    return request({
        url: '/qms/quote/list',
        method: 'get',
        params: query
    })
}
