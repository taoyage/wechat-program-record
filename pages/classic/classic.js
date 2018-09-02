// pages/classic/classic.js
import classicModel from '../../models/classic';
import likeModel from '../../models/like';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    classicData: {},
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    classicModel.getLatest(res => {
      this.setData({
        classicData: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      });
    });
  },

  /**
   * 监听like组件点击事件
   */
  onLike: function(event) {
    let like_or_cancel = event.detail.behavior;
    likeModel.like(like_or_cancel, this.data.classicData.id, this.data.classicData.type);
  },

  /**
   * 监听navi组件点击左按钮
   */
  onNext: function() {
    this._updateClassic('next');
  },

  /**
   * 监听navi组件点击右按钮
   */
  onPrevious: function() {
    this._updateClassic('previous');
  },

  _updateClassic: function(nextOrPrevious) {
    let index = this.data.classicData.index;
    classicModel.getClassic(index, nextOrPrevious, res => {
      this._getLikeStatus(res.id, res.type);
      this.setData({
        classicData: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      });
    });
  },
  _getLikeStatus: function(artID, category) {
    likeModel.getClassicLikeStatus(artID, category, res => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      });
    });
  }
});
