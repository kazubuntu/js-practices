import enquirer from "enquirer";
const { Select } = enquirer;

export class Prompt {
  constructor(mode, choices) {
    this.mode = mode;
    this.choices = choices;
    this.property = this.setProperty();
  }

  setProperty() {
    if (this.mode === "r") {
      return {
        name: "memo",
        message: "Choose a note you want to see",
        choices: this.choices,
        format() {
          return this.selected.message;
        },
        footer() {
          return `\n${this.focused.name}`;
        },
      };
    } else if (this.mode === "d") {
      return {
        name: "memo",
        message: "Choose a note you want to delete",
        choices: this.choices,
        format() {
          return this.selected.message;
        },
        result() {
          return this.selected.value;
        },
      };
    }
  }

  async run() {
    const prompt = new Select(this.property);
    const answer = await prompt.run();
    return answer;
  }
}
