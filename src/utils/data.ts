export const dateConvert = (x: number) => {
  const tmp = new Date(x * 1000);
  return (
    tmp.getFullYear().toString().padStart(4, "0") +
    "-" +
    (tmp.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    tmp.getDate().toString().padStart(2, "0") +
    "-" +
    tmp.getHours().toString().padStart(2, "0") +
    "시" +
    tmp.getMinutes().toString().padStart(2, "0") +
    "분" +
    tmp.getSeconds().toString().padStart(2, "0") +
    "초"
  );
};

export const getDateGap = (expirationDate: number, today: number) => {
  const dateGap = (expirationDate - today) * 1000;
  const gap = new Date(dateGap);

  if (dateGap < 60000) {
    return "만료됨";
  } else if (dateGap < 172800000) {
    // 48시간 미만
    return (
      (gap.getHours() - 9 > 0 ? +gap.getHours() - 9 + "시간 " : "") +
      (gap.getMinutes() > 0 ? +gap.getMinutes() + "분" : "")
    );
  } else {
    // 48시간 이상
    return Math.floor(dateGap / 1000 / 60 / 60 / 24) + "일";
  }
};
