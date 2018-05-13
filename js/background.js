var counter = 0;
chrome.tabs.getAllInWindow(null, function(tabs){
  counter = tabs.length;
  chrome.browserAction.setBadgeText({text:String(counter)});
});
chrome.tabs.onCreated.addListener(function(tab){
  counter++;
  chrome.browserAction.setBadgeText({text:String(counter)});
})
chrome.tabs.onRemoved.addListener(function(tab){
  counter--;
  chrome.browserAction.setBadgeText({text:String(counter)});
})