(() => {
  const replacements = new Map([
    ["https://at.adobe.com/i3gTkcW18diXU4vk", "https://at.adobe.com/60MvLkgk1DPbzGxv"],
    ["https://at.adobe.com/GsfR5p3nDymqlbfR", "https://at.adobe.com/8iYfr7R7QN6b7N02"],
    ["https://at.adobe.com/T6t6WRq31UnKl9nn", "https://at.adobe.com/lg1PTNJIJ5lbKqNE"],
    ["https://at.adobe.com/xmKGqJUsYPRsAOhe", "https://at.adobe.com/O9rrVkFm1cV3AeCF"],
    ["https://at.adobe.com/udOYRbgFbkkqvvmW", "https://at.adobe.com/E5mHqtwKoZEt2kJv"],
    ["https://at.adobe.com/D31xs4KCQZHVF6RA", "https://at.adobe.com/m0ysBu8nl6b7p4O2"],
    ["https://at.adobe.com/PyD5VPTQRV0BRMTj", "https://at.adobe.com/yLSvzK9l0Q5G2l7b"],
    ["https://at.adobe.com/MaDktMEGW14xswb1", "https://at.adobe.com/PYlT5Ej4SKiHAUgA"],
    ["https://at.adobe.com/uHiqeeRLQfnDNW9u", "https://at.adobe.com/it35ot93DwysMAMq"],
    ["https://at.adobe.com/Ftdy5QFpw4HLKGIM", "https://at.adobe.com/Scr0KP5kplcwfPh2"],
    ["https://at.adobe.com/N4MBIg2TmUtWxaw7", "https://at.adobe.com/JSq98HqTJdMmvdVc"],
    ["https://at.adobe.com/QFt6E184xLFFQmzv", "https://at.adobe.com/MklOtoQ2MyD5aBlI"],
    ["https://at.adobe.com/pJmqz6MEiCwRCw5z", "https://at.adobe.com/69wYdMpqiHcm6GCs"],
    ["https://at.adobe.com/rhHX2M0xiSuMdbiA", "https://at.adobe.com/0A3rYvCpOx9N2gwf"],
    ["https://at.adobe.com/fbfWvuphnxRdSNRK", "https://at.adobe.com/MyNpfb7Ht2qth7RD"],
    ["https://at.adobe.com/grqXq1bwo7ZY4xMa", "https://at.adobe.com/11DHyjh8dYEdAtEd"],
    ["https://at.adobe.com/DfIJlX2HdyccmXvk", "https://at.adobe.com/SfgQETE0H7khArNk"],
    ["https://at.adobe.com/M30uaZoo8fRapziQ", "https://at.adobe.com/ysOUW0K22waZC6TV"]
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
