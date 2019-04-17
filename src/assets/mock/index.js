import Mock from 'mockjs'
const random = Mock.Random

const listData = () => {
  let dataArray = new Array(10).fill(random.csentence(1, 10))
  return {
    type: 1,
    message: '请求完成',
    data: dataArray
  }
}

Mock.mock('/demo/goods/list', 'post', listData)
