// filepath: /home/brads/projs/RememberBee/signals.js

// Ordered collection of signals
const signals = {
  "Blue Line South East": {
    signalList: [
      "154", "16", "226", "296", "354", "406", "24", "32", "592", "662",
      "40", "816", "916", "984", "54", "1172", "58", "1332", "62", "1402", "98"
    ],
    signalPrefix: "S"
  },
  "Blue Line South West": {
    signalList: [],
    signalPrefix: "S"
  },
  "Blue Line North East": {
    signalList: [
      "O2", "O046", "O089", "O086", "O123", "O6", "O162", "O193", "O192", "O10",
      "O258", "O296", "O295", "O14", "O18", "022", "O26", "O456", "O524", "O527",
      "O589", "O34", "O664", "O665", "O709", "O38", "O792", "O793", "O862", "O863",
      "O46", "O1036", "O1055", "O1142", "O1173", "O54", "O1223", "O1232", "O1259",
      "O1268", "O58", "O1323", "O62", "O1376", "O1397", "O1413", "O1422", "O66",
      "O1454", "O1457"
    ],
    signalPrefix: "O"
  },
  "Blue Line North West": {
    signalList: [],
    signalPrefix: "O"
  },
  "Orange Line East": {
    signalList: [],
    signalPrefix: "O"
  },
  "Orange Line West": {
    signalList: [],
    signalPrefix: "O"
  },
  "Green Line East": {
    signalList: [],
    signalPrefix: "G"
  },
  "Green Line West": {
    signalList: [],
    signalPrefix: "G"
  }
};

// Export the signals array
export default signals;