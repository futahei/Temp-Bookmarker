var data = []
chrome.storage.local.get('tempmark', function(temp){
  data = data.concat(temp.tempmark)
  for(var i=0;i<data.length;i++){
    try {
      var title = data[i].title
      var url = data[i].url
      var num = i

      var tempmark = 
        "<p id=\"mark"+num+"\">"+
          "<a href=\""+url+"\" target=\"_blank\">"+title+"</a>"+
          "<input id=btn"+num+" type=\"button\" value=\"x\">"+
        "</p>";
      $("#tempmarks").append(tempmark);
      $("#btn"+num).on("click", function() {
        deleteone("#mark"+num, title)
      })
    } catch (e) {
      console.log(e);
    }
  }
  $("#deleteAll").on("click", deleteAll)
})

function deleteone(id, title) {
  $(id).remove()
  data.some(function(v,index) {
    if(v.title==title) {
      data.splice(index, 1)
    }
  });
  save()
}

function deleteAll() {
  data = []
  $("#tempmarks").empty()
  save()
}

function save() {
  chrome.storage.local.set({'tempmark': data}, function() {
    if (chrome.runtime.error) {
      console.log("save error")
    }
  });
}