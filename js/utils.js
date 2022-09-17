function setInputElementValue(id, value) {
  const elem = document.getElementById(id);
  if (!elem) {
    return;
  }

  elem.value = value ? value : "";
}

function getInputElementValue(id) {
  const elem = document.getElementById(id);
  return elem && elem.value ? elem.value : "";
}

function queryAllToArray(query) {
  return Array.from(document.querySelectorAll(query));
}
