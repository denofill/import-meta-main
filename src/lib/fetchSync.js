export default function fetchSync($1, $2 = undefined) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", $1, false);

  let useBinaryEncoding = false;
  try {
    xhr.responseType = "arraybuffer";
  } catch (e) {
    xhr.overrideMimeType("text/plain; charset=x-user-defined");
    useBinaryEncoding = true;
  }

  xhr.send(null);

  const response = {};
  response.url = xhr.responseURL;
  return response;
}
