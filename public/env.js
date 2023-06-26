var agreement = 'http://'
var defaultHost = '10.0.0.19:14001' // api网关ip和端口
var oauthHost = '10.0.0.19:12001' // 认证服务ip和端口
var env = {
  // 基础请求地址
  baseUrl: agreement + defaultHost,
  // 认证服务
  authUrl: agreement + oauthHost,
  // auth登录方式 iot ,iot2
  authType: 'iot',
  clientId: 'J8Kq169h56tm',
  clientSecret: 'dd1492ee1c6e2c0cc72f963134534375',
  // 请求服务名
  api: {
    ica: '/api/ica',
    // 用户中心服务
    userCenter: '/api/user-center-optimization',
  },
}
