import parseArgs from "minimist";
import { Memo } from "./memo.mjs";
import { Terminal } from "./terminal.mjs";
import { Prompt } from "./prompt.mjs";

const options = parseArgs(process.argv.slice(2));
const DBNAME = "memo.sqlite3";

(async () => {
  await Memo.dbConnect(DBNAME);
  const memos = await Memo.all();

  if (options.r) {
    const prompt = new Prompt("r", memos);
    const terminal = new Terminal(prompt);
    const answer = await terminal.runPrompt();
    console.log(answer);
  } else if (options.d) {
    const prompt = new Prompt("d", memos);
    const terminal = new Terminal(prompt);
    const answer = await terminal.runPrompt();
    await Memo.delete(answer);
  } else if (options.l) {
    for (let memo of memos) {
      console.log(memo.message);
    }
  } else {
    const lines = await Terminal.readStdin();
    const title = lines[0];
    const content = lines.join("\n");
    const memo = new Memo(title, content);
    await memo.save();
  }

  Memo.dbClose();
})();
