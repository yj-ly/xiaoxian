//初始化数据
function tabbarinit() {
  return [
    {
      "current": 0,
      "pagePath": "/pages/discover/discover",
      "iconPath": "/pages/imgs/discover.png",
      "selectedIconPath": "/pages/imgs/discover_down.png", 
      "text": "探索发现"
    },
    {
      "current": 0,
      "pagePath": "/pages/clockin/clockin",
      "iconPath": "/pages/imgs/clockin.png", 
      "selectedIconPath": "/pages/imgs/clockin.png",
      "text": ""
    },
    {
      "current": 0,
      "pagePath": "/pages/my/my",
      "iconPath": "/pages/imgs/user.png",
      "selectedIconPath": "/pages/imgs/user_down.png",
      "text": "个人中心"
    }
  ]

}
//tabbar 主入口
function tabbarmain(bindName = "tabdata", id, target) {
  var that = target;
  var bindData = {};
  var otabbar = tabbarinit();
  otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
  otabbar[id]['current'] = 1;
  bindData[bindName] = otabbar
  that.setData({ bindData });
}

module.exports = {
  tabbar: tabbarmain
}
