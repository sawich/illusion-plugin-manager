

const x = {
  'asd': 2
};

console.log(x.qwe);


class Task {
  get awaiter() {
    return this._awaiter;
  }

  async run() {
    await new Promise(async (resolve) => {
      setTimeout(async () => {
        resolve();
        console.log('run resolved');

      }, 2000);
    });

    this._resolver();
  }

  constructor() {
    this._awaiter = new Promise(async (resolve) => this._resolver = resolve);
  }

  #resolver = Task.badResolver;
  #awaiter;

  static badResolver = () => {
    throw new Error("Bad resolver");
  };
}


async function main() {
  const t = new Task();
  t.run();

  await t.awaiter;
  console.log('task end');
}

main();










return;




console.log(args);

cp.spawn(exe, args);

// const x = cp.spawnSync(`${exe} `);
// console.log(x);

console.log(os.arch());
