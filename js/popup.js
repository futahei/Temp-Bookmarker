$(function(){
  var bg = chrome.extension.getBackgroundPage();
  $('#counter').val(bg.getCounter());
});