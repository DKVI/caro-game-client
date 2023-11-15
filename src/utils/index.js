const utils = {
  formatTimeFromSeconds(seconds) {
    const hours = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}:${remainingSeconds}`;
    return formattedTime;
  },

  normalSort(arr) {
    const length = arr.length;

    for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length - 1 - i; j++) {
        if (arr[j].SCORE < arr[j + 1].SCORE) {
          // Hoán đổi hai phần tử nếu thứ tự chưa đúng
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  },

  createTimeStamp() {
    const currentTime = new Date();

    const year = currentTime.getFullYear();
    const month = String(currentTime.getMonth() + 1).padStart(2, "0");
    const day = String(currentTime.getDate()).padStart(2, "0");
    const hours = String(currentTime.getHours()).padStart(2, "0");
    const minutes = String(currentTime.getMinutes()).padStart(2, "0");
    const seconds = String(currentTime.getSeconds()).padStart(2, "0");

    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedTime;
  },
};

export default utils;
