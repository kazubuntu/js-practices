import * as readline from "node:readline";

export class Terminal {
  constructor(prompt) {
    this.prompt = prompt;
  }

  async runPrompt() {
    const answer = await this.prompt.run();
    return answer;
  }

  static async readStdin() {
    return new Promise((resolve) => {
      const lines = [];
      const rl = readline.createInterface({ input: process.stdin });

      rl.on("line", (line) => {
        lines.push(line);
      });

      rl.on("close", () => {
        resolve(lines);
      });
    });
  }
}
