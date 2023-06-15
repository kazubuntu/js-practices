import sqlite3 from "sqlite3";
import { open } from "sqlite";

export class Memo {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }

  static db;

  static async dbConnect() {
    Memo.db = await open({
      filename: "memo.sqlite3",
      driver: sqlite3.Database,
    });
    await Memo.db.run(
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY, title TEXT, content TEXT) "
    );
  }

  static dbClose() {
    Memo.db.close();
  }

  static async all() {
    const memos = await Memo.db.all(
      "SELECT id AS value, content AS name, title AS message FROM memos"
    );
    return memos;
  }

  static async delete(id) {
    await Memo.db.run("DELETE FROM memos WHERE id = ?", id);
  }

  async save() {
    await Memo.db.run(
      "INSERT INTO memos(title, content) values(?, ?)",
      this.title,
      this.content
    );
  }
}
