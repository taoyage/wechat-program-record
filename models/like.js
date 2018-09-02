import HTTP from '../utils/http';

class LikeModel extends HTTP {
  like(behavior, artId, category) {
    let url = behavior === 'like' ? '/like' : '/like/cancel';
    this.request({
      url,
      method: 'POST',
      data: {
        art_id: artId,
        type: category
      }
    });
  }
  getClassicLikeStatus(artID, category, callback) {
    this.request({
      url: `/classic/${category}/${artID}/favor`,
      success: res => callback(res)
    });
  }
}

export default new LikeModel();
