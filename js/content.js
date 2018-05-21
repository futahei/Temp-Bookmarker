/*
var allowNotify = false

function notify() {
  if(!("Notification" in window)) {
    return;
  }

  else if (Notification.permission === "denied") {
    allowNotify = false
  }

  else if (Notification.permission === "granted") {
    allowNotify = true
  }

  else if (Notification.permission === "default") {
    Notification.requestPermission(function(permission) {
      if(permission==="granted") {
        allowNotify = true
      } else {
        allowNotify = false
      }
    })
  }
}

notify()
*/

var page = {
  title: document.title,
  url: document.location.href
}

var data = [];

chrome.storage.local.get('tempmark', function(temp){
  data = data.concat(temp.tempmark)
})

// Ctrl+Bで一時保存
document.onkeydown = function (e) {
  if (e.ctrlKey&&e.keyCode==66) save();
}

// 被ってるやつ削除しつつ保存
function save() {
  //var not = new Notification("Save Tempmark")
  for(var i=0;i<data.length;i++) {
    if(data[i].url==page.url)data.splice(i,1);
  }
  data.unshift(page)
  if (data.length>10) {
    data.length = 10
  }
  chrome.storage.local.set({'tempmark': data },function() {
    if (chrome.runtime.error) {
      console.log("tempmark error")
    }
  });
}