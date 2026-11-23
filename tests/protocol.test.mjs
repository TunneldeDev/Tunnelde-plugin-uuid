import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { tmpdir } from 'node:os';
test('real stdio supports initialization, localized view, command, errors and shutdown',()=>{
 const messages=[{id:1,method:'initialize',params:{apiVersion:1}},{id:2,method:'view.render',params:{view:'main',locale:'zh-CN'}},{id:3,method:'command.run',params:{command:"generate",input:{source:'{}',timestamp:'0',count:'2'}}},{id:4,method:'unknown'},{id:5,method:'shutdown'}];
 const child=spawnSync(process.execPath,[resolve('index.mjs')],{cwd:tmpdir(),input:messages.map(x=>JSON.stringify({jsonrpc:'2.0',...x})).join('\n')+'\n',encoding:'utf8',timeout:5000});assert.equal(child.status,0,child.stderr);
 const replies=child.stdout.trim().split('\n').map(JSON.parse);assert.equal(replies.length,5);assert.equal(replies[0].result.ok,true);assert.equal(replies[1].result.blocks.at(-1).type,'form');assert.equal(typeof replies[2].result.text,'string');assert.equal(replies[3].error.code,-32601);assert.equal(replies[4].result,null);
 const invalid=spawnSync(process.execPath,[resolve('index.mjs')],{input:'null\n{broken\n'+JSON.stringify({id:1,method:'initialize'})+'\n',encoding:'utf8',timeout:5000});assert.equal(invalid.status,0,invalid.stderr);const r=invalid.stdout.trim().split('\n').map(JSON.parse);assert.equal(r[0].error.code,-32600);assert.equal(r[1].error.code,-32700);assert.equal(r[2].result.ok,true);
});
