export const wait = async (delay) =>
  new Promise((resolve) =>
    setTimeout(
      resolve,
      delay
    )
  );