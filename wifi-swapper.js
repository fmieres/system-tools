const 
  shell = require('shelljs'),
  camelcase = require('camelcase')
;


function multilineToArray(multiline) {
  const array = [];
  let json = {};
  multiline.split(/\r?\n/g).forEach(line => {
    if (line) {
      let [key, value] = line.split(/:\s+/);
      key = camelcase(key);

      if (key in json) {
        array.push(json);
        json = {};
      }
      json[key] = value;
    }
  });
  if (Object.keys(json).length) {
      array.push(json);
  }
  return array;
}


function execute(command) {
  return new Promise((resolve, reject) => {
    shell.exec(command, { silent: true }, (code, stdout, stderr) => {
      if (code) {
        return reject(stderr.trim());
      }
      resolve(stdout.trim());
    });
  });
}

function disconnectAndReconnectTo(name){
  return execute('nmcli d disconnect wlp2s0').then(_ => execute(`nmcli c up ${name}`))
}

let ssid1 = process.argv[2]
let ssid2 = process.argv[3]

execute('nmcli -m multiline con show --active').then(multilineToArray).then(x=>x[0]).then(x => 
  disconnectAndReconnectTo( x.name === ssid1 ? ssid2 : ssid1)
)