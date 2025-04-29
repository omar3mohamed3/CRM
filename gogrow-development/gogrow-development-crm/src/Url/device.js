export  const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;

  let deviceName = "Unknown Device";

  // Check if the device is an iPhone
  if (/iPhone/i.test(userAgent)) {
    deviceName = "iPhone";
  }
  // Check if the device is a Samsung
  else if (/Samsung/i.test(userAgent)) {
    deviceName = "Samsung Mobile";
  }
  // Check if it's a Mac
  else if (/Mac/i.test(platform)) {
    deviceName = "Mac";
  }
  // Check if it's a Windows laptop/PC
  else if (/Win/i.test(platform)) {
    deviceName = "Windows PC/Laptop";
  }
  // Check if it's an Android device (other than Samsung)
  else if (/Android/i.test(userAgent)) {
    deviceName = "Android Mobile";
  }
  // Check if it's a generic mobile device
  else if (/Mobile/i.test(userAgent)) {
    deviceName = "Mobile Device";
  }

  return {
    userAgent,
    platform,
    deviceName
  };
};

 