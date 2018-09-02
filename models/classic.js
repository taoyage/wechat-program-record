import HTTP from '../utils/http.js';

class ClassicModel extends HTTP {
  /**
   * getLatest
   * @param {*} callback
   */
  getLatest(callback) {
    this.request({
      url: '/classic/latest',
      success: res => {
        callback(res);
        this._setLatestIndex(res.index);
      }
    });
  }

  /**
   * getClassic
   * @param {*} index
   * @param {*} nextOrPrevious
   * @param {*} callback
   */
  getClassic(index, nextOrPrevious, callback) {
    let key = nextOrPrevious === 'next' ? this._getKey(index + 1) : this._getKey(index - 1);
    let classic = wx.getStorageSync(key);
    if (!classic) {
      this.request({
        url: `/classic/${index}/${nextOrPrevious}`,
        success: res => {
          wx.setStorageSync(this._getKey(res.index), res);
          callback(res);
        }
      });
    } else {
      callback(classic);
    }
  }
  /**
   * 判断是否是第一期
   * @param {*} index
   */
  isFirst(index) {
    return index === 1 ? true : false;
  }

  /**
   * 判断是否是最后一期
   * @param {*} index
   */
  isLatest(index) {
    let latestIndex = this._getLatestIndex();
    return latestIndex === index ? true : false;
  }
  /**
   * 设置最后一期的index
   * @param {*} index
   */
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index);
  }
  /**
   * 获取最后一期的index
   */
  _getLatestIndex() {
    return wx.getStorageSync('latest');
  }
  /**
   * 获取缓存key
   * @param {*} index 
   */
  _getKey(index) {
    let key = `classic-${index}`;
    return key;
  }
}

export default new ClassicModel();
