export const copyToClipboard = (url, type = "link") => {
    const text = type === 'link' ?  "링크가 복사되었습니다." : '이메일이 복사되었습니다.'
    navigator.clipboard.writeText(url).then(() => {
      alert(text);
    });
  };
  