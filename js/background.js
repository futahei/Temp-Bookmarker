var tempmark = [];

//runtime.getURL(...)でchrome拡張内の任意のリソースのURLを取得できる
const notifIcon = chrome.runtime.getURL('/icons/icon_48.png')

//通知する関数
function notificate (message) {
    //通知に表示する文章や画像、そのオプション
    const notifOption = {
        type: "basic",
        title: "Temp-BookMarker",
        message: `ページが登録されました! : ${message}`,
        iconUrl: notifIcon
    };

    //通知に関するPermissionを取得する
    chrome.notifications.getPermissionLevel(function (level) {
        if (level === "granted") {
            //許可されてれば通知を表示
            chrome.notifications.create(notifOption);
        } else if (level === "denied") {
            //ダメならエラーメッセージを吐く
            console.log("User has elected not to show notifications from the app or extension.")
        }
    })
}

chrome.storage.local.get('tempmark', function (st) {
    tempmark = tempmark.concat(st.tempmark)
});

chrome.runtime.onMessage.addListener((req, sender, res) => {
    console.log(req);
    //tagが"notify"なメッセージは通知用なので通知関数に回す
    if (req.tag === "notify") {
        //req.messageにはpagetitleが格納されている
        notificate(req.message)
    }
})