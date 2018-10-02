// pages/book/book.js

import BookModel from '../../models/book';
import { random } from '../../utils/common';

const bookModel = new BookModel();

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		books: [],
		searching: false,
		more: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		bookModel.getHotList()
			.then(res => {
				this.setData({
					books: res
				})
			});
	},
	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {
		this.setData({
			more: random(16)
		})
	},

	onSearching: function(event) {
		this.setData({
			searching: true
		})
	},

	onCancel: function(event) {
		this.setData({
			searching: false
		})
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {}
});