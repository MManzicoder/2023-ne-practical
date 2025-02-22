module.exports.generateMeterNumber = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

module.exports.getTokenExpirationDate = (amount, power_expiration_time) => {
  const date = power_expiration_time
    ? new Date(power_expiration_time)
    : new Date();
  return new Date(date.setDate(date.getDate() + amount / 100));
};

module.exports.validateUUID = (str) => {
  // Regular expression to check if string is a valid UUID
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexExp.test(str);
};

module.exports.getDaysDifference = (date) => {
  const diffTime = Math.abs(new Date(date).getTime() - new Date().getTime());
  console.log("difftime", diffTime);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 0;
};

module.exports.generateToken = () => {
  const length = 8;
  const characters = "0123456789";
  let token = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }

  return token;
};
