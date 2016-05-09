function doSave(value, type, name) {
  var blob;
  if (typeof window.Blob == "function") {
    blob = new Blob([value], {
      type: type
    });
  } else {
    var BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder;
    var bb = new BlobBuilder();
    bb.append(value);
    blob = bb.getBlob(type);
  }
  var URL = window.URL || window.webkitURL;
  var bloburl = URL.createObjectURL(blob);
  var anchor = document.createElement("a");
  if ('download' in anchor) {
    anchor.style.visibility = "hidden";
    anchor.href = bloburl;
    anchor.download = name;
    document.body.appendChild(anchor);
    //var evt = document.createEvent("Event");
    //var evt = document.createEvent("UIEvents");
    var evt = document.createEvent("MouseEvents");
    evt.initEvent("click", true, true);
    //evt.initUIEvent("click", true, true, document.defaultView, 0);
    //evt.initMouseEvent("click", true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    anchor.dispatchEvent(evt);
    document.body.removeChild(anchor);
  /*
  var a = document.createElement('a');
  a.href = bloburl;
  a.download = name;
  a.textContent = 'Download';
  document.body.appendChild(a);
  */
  } else if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, name);
  } else {
    location.href = bloburl;
  }
}

function top() {
  document.getElementsByTagName("body")[0].scrollTop = 0;
}
