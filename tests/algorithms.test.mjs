import assert from 'node:assert/strict';import { test } from 'node:test';import { spawnSync } from 'node:child_process';import { join } from 'node:path';import { pathToFileURL } from 'node:url';const root=process.cwd();
import {runCommand as uuid} from "../index.mjs";

test("UUIDs are valid independent v4 values, with batch boundaries enforced", () => {
  for (const count of [1, 100]) {
    const values = uuid("generate", { count: String(count) }).text.split("\n");
    assert.equal(values.length, count);
    assert.equal(new Set(values).size, count);
    for (const value of values)
      assert.match(value, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  }
  for (const count of ["0", "101", "-1", "1.5", "NaN", "1e2", ""])
    assert.equal(uuid("generate", { count }).error, true);
});

