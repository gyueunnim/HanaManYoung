export const getCategoryKor = (category) => {
  if (category === "CT_FOOD") return "식비/간식";
  else if (category === "CT_BEAUTY") return "미용/패션";
  else if (category === "CT_TRAFFIC") return "교통비";
  else if (category === "CT_HOBBY") return "문화/취미";
  else if (category === "CT_EDU") return "교육/학습";
  else if (category === "CT_SHOP") return "디지털 콘텐츠/쇼핑";
  else if (category === "CT_ETC") return "기타/예비/용돈";
  else return "카테고리";
};

export const getCategoryBgColor = (category) => {
  if (category === "CT_FOOD") return "#fce0b2";
  else if (category === "CT_BEAUTY") return "#d1a6f9";
  else if (category === "CT_TRAFFIC") return "#a2f59a";
  else if (category === "CT_HOBBY") return "#f5ee9a";
  else if (category === "CT_EDU") return "#c3ab82";
  else if (category === "CT_SHOP") return "#fcb2ee";
  else if (category === "CT_ETC") return "#d8d9d5";
  else return "bg-gray-500";
};

export const getCategoryBg = (category) => {
  if (category === "식비/간식") return "#fce0b2";
  else if (category === "미용/패션") return "#d1a6f9";
  else if (category === "교통비") return "#a2f59a";
  else if (category === "문화/취미") return "#f5ee9a";
  else if (category === "교육/학습") return "#c3ab82";
  else if (category === "디지털 콘텐츠/쇼핑") return "#fcb2ee";
  else if (category === "기타/예비/용돈") return "#d8d9d5";
  else return "bg-gray-500";
};
