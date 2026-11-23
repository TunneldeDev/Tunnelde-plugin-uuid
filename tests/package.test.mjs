import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { packagePlugin, verifyArchive } from '@tunnelde/plugin-sdk/tools';
test('independent archive has a root manifest, matching identity, license and checksum',async t=>{
 const output=await mkdtemp(join(tmpdir(),'tunnelde-plugin-test-'));t.after(()=>rm(output,{recursive:true,force:true}));
 const entry=await packagePlugin({output});const bytes=await readFile(join(output,`${entry.id}-${entry.version}.zip`));
 const manifest=verifyArchive(bytes,entry);assert.equal(manifest.id,entry.id);
 assert.deepEqual(await packagePlugin({output}),entry);
});
