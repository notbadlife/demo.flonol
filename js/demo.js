const _hideClassName = "hide";

function hideElementById(elementId) {
  const element = document.getElementById(elementId);
  if (!element.classList.contains(_hideClassName)) {
    element.classList.add(_hideClassName);
  }
}

function showElementById(elementId) {
  const element = document.getElementById(elementId);
  if (element.classList.contains(_hideClassName)) {
    element.classList.remove(_hideClassName);
  }
}

const _initValues = {
  licenseKey: "909a9d4d30704b23ba376b35b7a184eb",
  id: "5deec23ff2911c0acc582ee9c700851b",
  currentOwnerId: "notbadlife.demo",
  youtubeVideoId: "BLxy2jCrd8s",
  url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
};

const _context = {
  // basic params
  licenseKey: _initValues.licenseKey,
  id: _initValues.id,
  currentOwnerId: _initValues.currentOwnerId,
  youtubeVideoId: _initValues.youtubeVideoId,
  url: _initValues.url,

  // page setting
  callType: "id-form",

  // frame
  elementId: "flonol-editor",

  // object
  popupFlnl: null,
  iframeFlnl: null,
};

function bindingInputToContext() {
  _context.licenseKey = getInputElementValue("editor-params-license-key");
  _context.id = getInputElementValue("editor-params-id");
  _context.youtubeVideoId = getInputElementValue("editor-params-youtube-id");
  _context.url = getInputElementValue("editor-params-url");
  _context.currentOwnerId = getInputElementValue("editor-params-owner-id");
}

// player
function applyPlayerSetting() {
  const wrapper = document.getElementById("player-wrapper");
  if (!wrapper) {
    return;
  }

  const iframe = wrapper.querySelector("iframe");
  if (!iframe) {
    return;
  }

  _context.id = getInputElementValue("player-params-id");
  _context.licenseKey = getInputElementValue("player-params-license-key");

  const playerUrl = "https://a1.pages.flonol.kr/pages/player";
  const src = `${playerUrl}?id=${_context.id}&license_key=${_context.licenseKey}`;
  iframe.src = src;

  const codeViewer = document.getElementById("player-iframe-code");
  if (codeViewer) {
    codeViewer.innerText = iframe.outerHTML.toString().replace(/\&amp\;/g, "&");
  }
}

// popup sample
function showEditorWindow() {
  hideEmbededEditorArea();

  if (_context.popupFlnl) {
    _context.popupFlnl.closePopup();
    _context.popupFlnl = null;
  }

  console.log("showEditorWidnow");

  const isPopup = true;
  const options = getOptionsFromContext(isPopup);

  _context.popupFlnl = new FLNL(options);
}

function closeEditorWindow() {
  if (_context.popupFlnl) {
    _context.popupFlnl.closePopup();
    _context.popupFlnl = null;
  }
}

function onSaveCallback(data) {
  setInputElementValue("editor-params-id", data.data.id);
  setInputElementValue("flonol-result-value", JSON.stringify(data));

  // document.getElementById("flonol-result-value").value = JSON.stringify(data);
  closeEditorWindow();
}

function getOptionsFromContext(isPopup) {
  bindingInputToContext();

  const options = {
    licenseKey: _context.licenseKey,
    currentOwnerId: _context.currentOwnerId,
    event: {
      onSave: (data) => {
        onSaveCallback(data);
      },
    },
  };

  if (!isPopup || isPopup !== true) {
    options.elementId = _context.elementId;
  }

  switch (_context.callType) {
    case "id-form":
      options.id = _context.id;
      break;
    case "youtube-form":
      options.youtubeVideoId = _context.youtubeVideoId;
      break;
    case "url-form":
      options.url = _context.url;
      break;
  }

  return options;
}

function showEditorIframe() {
  showEmbededEditorArea();

  const options = getOptionsFromContext();

  if (_context.iframeFlnl) {
    _context.iframeFlnl.resetEditor(options);
    return;
  }

  // 생성/호출 Sample
  _context.iframeFlnl = new FLNL(options);
}

function showEmbededEditorArea() {
  showElementById("embeded-editor-area");
}

function hideEmbededEditorArea() {
  hideElementById("embeded-editor-area");
}

function showByCallType() {
  if (_context.callType == "") {
    return;
  }

  console.log("CallType", _context.callType);

  queryAllToArray(".input-params > li").map((elem) => {
    if (elem.classList.contains(_context.callType)) {
      if (elem.classList.contains(_hideClassName))
        elem.classList.remove(_hideClassName);
    } else {
      elem.classList.add(_hideClassName);
    }
  });
}

function setCallType(callType) {
  if (callType == "") {
    callType = "id-form";
  }

  _context.callType = callType;

  const rdo = document.getElementById(callType);
  if (rdo && !rdo.checked) {
    rdo.checked = true;
  }

  showByCallType();
}

function showEditorTab() {
  showElementById("editor-view");
}

function hideEditorTab() {
  hideElementById("editor-view");
}

function showPlayerTab() {
  showElementById("player-view");
}

function hidePlayerTab() {
  hideElementById("player-view");

  const wrapper = document.getElementById("player-wrapper");
  if (!wrapper) {
    return;
  }

  const iframe = wrapper.querySelector("iframe");
  if (!iframe) {
    return;
  }

  iframe.src = "";
  iframe.innerHTML = "";
  console.log("hide", iframe);
}

function setTab(tabId) {
  switch (tabId) {
    case "tab-editor":
      hidePlayerTab();
      showEditorTab();
      setCallType("id-form");
      break;
    case "tab-player":
      hideEditorTab();
      showPlayerTab();
      break;
  }
}

function onClickTab() {
  const e = window.event;
  const tabId = e.target.id;
  queryAllToArray(".title-tab").map((a) => {
    if (a.id == tabId) {
      if (!a.classList.contains("on")) {
        a.classList.add("on");
      }
    } else {
      a.classList.remove("on");
    }
  });

  setTab(tabId);
}

function initCallTypeRadios() {
  queryAllToArray("[name=call-type]").map((elem) => {
    elem.addEventListener("click", (e) => {
      setCallType(e.target.value);
    });
  });
}

function initPage() {
  setCallType("id-form");
  setInputElementValue("editor-params-license-key", _context.licenseKey);
  setInputElementValue("editor-params-id", _context.id);
  setInputElementValue("editor-params-youtube-id", _context.youtubeVideoId);
  setInputElementValue("editor-params-url", _context.url);
  setInputElementValue("editor-params-owner-id", _context.currentOwnerId);

  setInputElementValue("player-params-license-key", _context.licenseKey);
  setInputElementValue("player-params-id", _context.id);

  initCallTypeRadios();
}

window.addEventListener("load", initPage);
