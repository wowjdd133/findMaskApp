
export const getElaspedTime = (time:string) => {
  const now = new Date();
  const timeValue = new Date(
    (time || "").replace(/-/g, "/").replace(/[TZ]/g, " ").split(".")[0]
  );
  const min = 60;
  //date.getTime() -> msec. so /1000
  let elaspedTime;
  elaspedTime = (now.getTime() - timeValue.getTime()) / 1000;

  let result = "알 수 없음";

  if (elaspedTime < min) return result;
  else if (elaspedTime < min * 60)
    result = Math.floor(elaspedTime / min) + "분 전";
  else if (elaspedTime < min * 60 * 24)
    result = Math.floor(elaspedTime / min / 60) + "시간 전";
  else if (elaspedTime < min * 60 * 24 * 30)
    result = Math.floor(elaspedTime / min / 60 / 24) + "일 전";

  return result;
}

export const getDistanceFromLatLon = (lat1:number, lat2:number, lon1:number, lon2:number) => {
  const deg2rad = (deg:number) => {
    return (deg * Math.PI) / 180.0;
  };

  const rad2deg = (rad:number) => {
    return (rad * 180) / Math.PI;
  };

  let theta = lon1 - lon2;
  let dist =
    Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.cos(deg2rad(theta));

  dist = Math.acos(dist);
  dist = rad2deg(dist);
  dist = dist * 60 * 1.1515;

  return (dist * 1.609344).toFixed(2);
}