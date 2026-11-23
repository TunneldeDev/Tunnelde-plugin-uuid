import assert from "node:assert/strict";import {test} from "node:test";import {runCommand as uuid} from "../index.mjs";

test("UUID keeps copyable values separate from the localized batch count", () => {
  for (const letterCase of [undefined, "upper"]) {
    const result = uuid("generate", { count: "3", letterCase, _locale: "zh-CN" });
    assert.equal(result.title, "已生成 3 个 UUID");
    const rows = result.text.split("\n");
    assert.equal(rows.length, 3);
    for (const row of rows) {
      assert.match(row, /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i);
      assert.equal(row, letterCase ? row.toUpperCase() : row.toLowerCase());
    }
  }
});
