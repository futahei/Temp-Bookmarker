// 一時記録の配列
var tempmark = [];

// 最初に読み込む
chrome.storage.local.get('tempmark', function(st){
  tempmark = tempmark.concat(st.tempmark)
});

// content.jsからのメッセージで処理
chrome.runtime.onMessage.addListener(
  function(req, sender) {
    switch(req.type) {
      case "savePage":
        save(req.page);
        break;
      case "updateIcon":
        updateIcon(req.page);
        break;
    }
  }
)

function updateIcon(page) {
  // あればON、なければOFF
  changeIcon(tempmark.indexOf(page)>=0);
}

function changeIcon(isOn) {
  // アイコン切り替え
  chrome.browserAction.setIcon({
    path: isOn?"icons/icon_16_on.png":"icons/icon_16.png",
    tabId: sender.tab.id
  })
}

function save(page) {
  try {
    // 被り削除
    let index = tempmark.indexOf(page);
    if(index>=0) {
      tempmark.splice(index, 1);
    }

    // 配列に組み込む
    tempmark.unshift(page);

    // 長すぎたら消す
    if(tempmark.length>20) tempmark.length = 20;

    // 保存
    saveStorage();

    // アイコン変更
    changeIcon(true)
  } catch(e) {
    console.log(e);
  }
}

function saveStorage() {
  chrome.storage.local.set({'tempmark': tempmark },function() {
    if (chrome.runtime.error) {
      console.log("tempmark error")
    }
  });
}