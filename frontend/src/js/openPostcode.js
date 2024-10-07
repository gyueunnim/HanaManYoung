export const openPostcode = (
  setPostcode,
  setRoadAddress,
  setJibunAddress,
  setExtraAddress
) => {
  new window.daum.Postcode({
    oncomplete: (data) => {
      let roadAddr = data.roadAddress;
      let extraRoadAddr = "";

      if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
        extraRoadAddr += data.bname;
      }

      if (data.buildingName !== "" && data.apartment === "Y") {
        extraRoadAddr +=
          extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
      }

      if (extraRoadAddr !== "") {
        extraRoadAddr = " (" + extraRoadAddr + ")";
      }

      setPostcode(data.zonecode);
      setRoadAddress(roadAddr);
      setJibunAddress(data.jibunAddress);
      setExtraAddress(extraRoadAddr);
    },
  }).open();
};
