const d = "DgpkDwsADxAMABENABIORgdnANoVywAAAAAWzAAA";

var buf = Buffer.from(d, "base64");

console.log(buf);
console.log("");
buf.forEach((b, i) => console.log("[" + i + "]", b));
console.log("");
console.log("");

function Decode(fPort, bytes, variables) {
  // Battery Level
  // 0 - 100%
  var batteryLevel = bytes[2];

  // AcquisitionPeriodUnit
  // 0 = minutes, 1 = hour
  // minutes: 1 to 60, hours: 1 to 24
  var AcquisitionPeriodUnit = bytes[5] === 0 ? "minutes" : "hours";

  // Acquisition Period
  // Multiply by 0.25 if Acquisition Period Unit is minutes
  var AcquisitionPeriod =
    AcquisitionPeriodUnit === "minutes" ? bytes[6] : bytes[6] * 0.25;

  // WiFi Status
  // 1 = ON, 0 = OFF
  var wifiStatus = bytes[9];

  // System
  // 1 = OK, 0 = KO
  var system = bytes[12];

  // Memory
  // 0 - 100%
  var memory = bytes[15];

  // Temperature
  // -10 to 50C
  // Data resolution 0.1 (multiply result by 0.1)
  var temperature = (bytes[18] + bytes[19]) * 0.1;

  console.log(Int16(bytes[18] + bytes[19]));

  // Conductivity
  // -1 to 200 000µS/cm
  var conductivity = bytes[22] + bytes[23] + bytes[24] + bytes[25];

  // Salinity
  // -1 to 60g/kg
  // Data resolution 0.1 (multiply result by 0.1)
  var salinity = (bytes[28] + bytes[29]) * 0.1;

  return {
    batteryLevel: batteryLevel,
    AcquisitionPeriodUnit: AcquisitionPeriodUnit,
    AcquisitionPeriod: AcquisitionPeriod,
    wifiStatus: wifiStatus,
    system: system,
    memory: memory,
    temperature: temperature,
    conductivity: conductivity,
    salinity: salinity,
  };
}

function UInt8(v) {
  return v & 0xff;
}

function Int8(v) {
  var ref = UInt8(v);
  return ref > 0x7f ? ref - 0x100 : ref;
}
var UInt16 = function (value) {
  return value & 0xffff;
};

var Int16 = function (value) {
  var ref = UInt16(value);
  return ref > 0x7fff ? ref - 0x10000 : ref;
};

console.log(Int8(224));

var result = Decode(null, buf, null);

console.log(result);
