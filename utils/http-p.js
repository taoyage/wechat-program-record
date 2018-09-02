import config from '../config';

const tips = {
	1: '抱歉，出现了一个错误',
	1005: 'appkey无效',
	3000: '期刊不存在'
};

class Http {
	request({ url, data = {}, method = 'GET' }) {
		return new Promise((resolve, reject) => {
			this._request(url, resolve, reject, data, method);
		});
	}
	_request(url, resolve, reject, data = {}, method = 'GET') {
		wx.request({
			url: config.api_base_url + url,
			method,
			data,
			header: {
				'content-type': 'application/json',
				appkey: config.appKey
			},
			success: res => {
				const code = res.statusCode.toString();
				if (code.startsWith('2')) {
					resolve(res.data);
				} else {
					const error_code = res.data.error_code;
					this._show_error(error_code);
				}
			},
			fail: err => {
				this._show_error();
			}
		});
	}
	_show_error(error_code = 1) {
		const tip = tips[error_code];
		wx.showToast({
			title: tip ? tip : tips[1],
			icon: 'none',
			duration: 2000
		});
	}
}

export default Http;