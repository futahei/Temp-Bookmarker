var tempmark = [];

chrome.storage.local.get('tempmark', function(st){
  tempmark = tempmark.concat(st.tempmark)
});

chrome.runtime.onMessage.addListener(
  function(req, sender, res) {
    console.log(req);
  }
)