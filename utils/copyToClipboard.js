export const copyToClipboard = (url, type = "link") => {
  const text = type === "link" ? "링크가 복사되었습니다." : "이메일이 복사되었습니다.";
  const copiedUrl = type === "link" ? url + "&receiver=1" : url;
  navigator.clipboard.writeText(copiedUrl).then(() => {
    alert(text);
  });
};
