class FLNL {
  popup = null;
  id = "";

  get editorUrl() {
    // return "http://d.mdl.flonol.kr/editor.html";
    return "https://a1.pages.flonol.kr/pages/editor";
  }

  constructor(options) {
    this.initEditor(options);
  }

  closePopup() {
    if (this.popup) {
      this.popup.close();
    }
  }

  initEditor(options) {
    if (!options.elementId || options.isPopup === true) {
      // elementId가 없거나, isPopup 옵션이 true인 경우
      this.popupWindow(options);
    } else if (options.elementId) {
      this.elementId = options.elementId;
      this.createEditor(options);
    }

    if (options.event && options.event.onSave) {
      window.addEventListener("message", (e) => {
        options.event.onSave(e.data);
      });
    }
  }

  resetEditor(options) {
    if (!this.elementId) {
      console.error("elementId is required!!!");
      return;
    }

    const wrapper = document.getElementById(this.elementId);
    if (!wrapper) {
      console.error("Element is not exists!!!");
      return;
    }

    wrapper.innerHTML = "";
    this.createEditor(options);
  }

  createEditor(options) {
    if (!options.licenseKey) {
      console.error("options.licenseKey is required !!!");
      return;
    }

    if (!this.elementId) {
      console.error("elementId is required!!!");
      return;
    }

    const wrapper = document.getElementById(this.elementId);
    if (!wrapper) {
      console.error("Element is not exists!!!");
      return;
    }

    if (!options.currentOwnerId) {
      console.error("currentOwnerId is required");
      return;
    }

    let src = this.getUrlWithParams(options);
    if (!src || src == "") {
      console.error("video parameters is required");
      return;
    }

    const iframe = document.createElement("iframe");
    iframe.src = src; // `${url}?id=0d214f026dfcc073b98dc9703c005c10`;
    iframe.allowFullscreen = true;
    // iframe.scrolling = "no";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.style.overflow = "hidden";
    wrapper.appendChild(iframe);
  }

  popupWindow(options) {
    const popupWidth = options.popupWidth ? options.popupWidth : "1080";
    const popupHeight = options.popupHeight ? options.popupHeight : "900";

    const url = this.getUrlWithParams(options);
    const windowOptions = `status=no, menubar=no, toolbar=no, resizable=no, width=${popupWidth}, height=${popupHeight}`;

    if (!url || url == "") {
      console.error("video parameters is required");
      return;
    }

    this.popup = window.open(url, "", windowOptions);
  }

  getUrlWithParams(options) {
    let url = "";
    if (options.id) {
      this.id = options.id;
      url = `${this.editorUrl}?id=${options.id}`;
    } else if (options.youtubeVideoId) {
      url = `${this.editorUrl}?youtube_video_id=${options.youtubeVideoId}`;
    } else if (options.url) {
      url = `${this.editorUrl}?url=${options.url}`;
    } else {
      console.error("video parameters is required");
      return "";
    }

    return `${url}&license_key=${options.licenseKey}&current_owner_id=${options.currentOwnerId}`;
  }
}
