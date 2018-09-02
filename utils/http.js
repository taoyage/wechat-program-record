import config from '../config';

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效',
  3000: '期刊不存在'
};

class HTTP {
  request({ url, method = 'GET', data, success }) {
    wx.request({
      url: config.api_base_url + url,
      method,
      data,
      header: {
        'content-type': 'application/json',
        appkey: config.appKey
      },
      success: res => {
        let code = res.statusCode.toString();
        if (code.startsWith('2')) {
          success && success(res.data);
        } else {
          let error_code = res.data.error_code;
          this._show_error(error_code);
        }
      },
      fail: err => {
        this._show_error();
      }
    });
  }
  _show_error(error_code = 1) {
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    });
  }
}

export default HTTP;
