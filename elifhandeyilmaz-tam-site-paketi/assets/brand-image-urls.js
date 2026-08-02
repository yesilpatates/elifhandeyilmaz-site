(() => {
  const replacements = new Map([
    ["https://at.adobe.com/i3gTkcW18diXU4vk", "https://at.adobe.com/UBRYEqvPvQcuXono"],
    ["https://at.adobe.com/GsfR5p3nDymqlbfR", "https://at.adobe.com/MJQWTzRqJ3yk3JrO"],
    ["https://at.adobe.com/T6t6WRq31UnKl9nn", "https://at.adobe.com/D7jVYpZ350aeu7WT"],
    ["https://at.adobe.com/xmKGqJUsYPRsAOhe", "https://at.adobe.com/bDe8F925GCCZfgqW"],
    ["https://at.adobe.com/udOYRbgFbkkqvvmW", "https://at.adobe.com/yu6bXlV0AimaI00D"],
    ["https://at.adobe.com/D31xs4KCQZHVF6RA", "https://at.adobe.com/P5e4b1Y4TmEIFP8T"],
    ["https://at.adobe.com/PyD5VPTQRV0BRMTj", "https://at.adobe.com/G7EdyJWmf1ekgb5c"],
    ["https://at.adobe.com/MaDktMEGW14xswb1", "https://at.adobe.com/bAVbGNoheAkf1gvN"],
    ["https://at.adobe.com/uHiqeeRLQfnDNW9u", "https://at.adobe.com/wvA42KLCAu0yjYZ4"],
    ["https://at.adobe.com/Ftdy5QFpw4HLKGIM", "https://at.adobe.com/Tgpx4KQ6OXDfZb8e"],
    ["https://at.adobe.com/N4MBIg2TmUtWxaw7", "https://at.adobe.com/TI4fiVhwAHLaWPQh"],
    ["https://at.adobe.com/QFt6E184xLFFQmzv", "https://at.adobe.com/KDJetqKie2EdsrID"],
    ["https://at.adobe.com/pJmqz6MEiCwRCw5z", "https://at.adobe.com/Rkguo71HMEDGWaLi"],
    ["https://at.adobe.com/rhHX2M0xiSuMdbiA", "https://at.adobe.com/5cHcRIWrKqS1IS0B"],
    ["https://at.adobe.com/fbfWvuphnxRdSNRK", "https://at.adobe.com/OkYqadhMrsn5Ko3F"],
    ["https://at.adobe.com/grqXq1bwo7ZY4xMa", "https://at.adobe.com/Kyt7kIpDqx9AsQyJ"],
    ["https://at.adobe.com/DfIJlX2HdyccmXvk", "https://at.adobe.com/m0FZmdkudkjmIVb0"],
    ["https://at.adobe.com/M30uaZoo8fRapziQ", "https://at.adobe.com/M1Q6Yn2ZViy1DBkt"]
  ]);

  const descriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "src");
  if (!descriptor?.get || !descriptor?.set) return;

  Object.defineProperty(HTMLImageElement.prototype, "src", {
    configurable: descriptor.configurable,
    enumerable: descriptor.enumerable,
    get: descriptor.get,
    set(value) {
      descriptor.set.call(this, replacements.get(String(value)) || value);
    }
  });
})();
