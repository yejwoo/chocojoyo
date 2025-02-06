export const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      alert("링크가 복사되었습니다!");
    });
  };
  