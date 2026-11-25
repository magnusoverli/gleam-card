import test from "node:test";
import assert from "node:assert/strict";
import { resolveGraph } from "../src/cards/graph/config.ts";
import { axisRange, makePlot, numberState, MINUTE as M, HOUR } from "../src/cards/graph/data.ts";
import { GraphHistory } from "../src/cards/graph/history.ts";

const series = (opts={}) => resolveGraph({series:[{entity:"sensor.a",...opts}]}).series[0];
const rows = pairs => pairs.map(([t,value])=>({time:t*M,value}));

test("graph defaults to native line history and rejects invalid or unbounded configurations",()=>{
  const config = resolveGraph({series:[{entity:"sensor.a"}]});
  assert.equal(config.hours_to_show,24); assert.equal(config.series[0].plot,"line");
  for (const s of [[],Array(5).fill({entity:"sensor.a"}),[{entity:"sensor.a"},{entity:"sensor.a"}],
    [{entity:"sensor.a",min:4,max:2}],[{entity:"light.a"}],[{entity:"sensor.a",plot:"bar",interval_minutes:1}]])
    assert.throws(()=>resolveGraph({series:s}));
  assert.deepEqual([0,"-2.5","unknown"," ","unavailable",null].map(numberState),[0,-2.5,null,null,null,null]);
});

test("decimation keeps outages between close samples even inside a single time bucket",()=>{
  const r=rows([[0,18],[4,22],[5,null],[6,14],[9,21]]);
  for (const plot of ["line","step"]) {
    const {points}=makePlot(r,series({plot}),0,10*M,1);
    assert.equal(points.find(p=>p.value===22).run,0);
    assert.equal(points.find(p=>p.value===14).run,1);
    assert.equal(points.at(-1).value,21);
  }
  const {points}=makePlot(rows([[-1,20],[4,null]]),series({plot:"step"}),0,10*M);
  assert.deepEqual(points.map(p=>[p.time/M,p.value]),[[0,20],[4,20]]);
  assert.deepEqual(makePlot(rows([[-5,20]]),series(),0,5*M).points.map(p=>p.time/M),[0,5]);
});

test("bars aggregate observations and omit missing or partly unavailable buckets",()=>{
  const r=rows([[-2,100],[1,-6],[3,0],[7,null],[12,9],[16,2],[18,6]]);
  for (const [aggregate,first,last] of [["mean",-3,4],["min",-6,2],["max",0,6],["last",0,6]]) {
    const {bars}=makePlot(r,series({plot:"bar",interval_minutes:5,aggregate}),0,20*M);
    assert.deepEqual(bars.map(b=>[b.from/M,b.to/M,b.value]),[[0,5,first],[15,20,last]]);
  }
});

test("line axes expose small variations; bar axes include zero; one-sided bounds remain ordered",()=>{
  const [lo,hi] = axisRange([1008,1012],false);
  assert.ok(lo>1007 && hi<1013);
  assert.deepEqual(axisRange([1008,1012],false,1000,1020),[1000,1020]);
  assert.equal(axisRange([-8,-2],true)[1],0);
  for (const [lo,hi] of [axisRange([],false),axisRange([0],false),axisRange([1],false,8),axisRange([9],false,undefined,3)]) assert.ok(lo<hi);
});

test("graph batches cold reads, requests overlapping tails and retains data after errors",async()=>{
  const cache = new GraphHistory(), ids=["sensor.a","sensor.b"], calls=[];
  const now=Date.UTC(2026,0,2), start=now-24*HOUR;
  const client={async callWS(req) {
    calls.push(req);
    return Object.fromEntries(req.entity_ids.map(id=>[id,[{lu:(now-M)/1000,s:"0"}]]));
  }};
  cache.retain(ids);
  await cache.refresh(client,ids,start,now);
  await cache.refresh(client,ids,start,now+1000);
  assert.equal(calls.length,1); assert.deepEqual(calls[0].entity_ids,ids);
  await cache.refresh(client,ids,start,now+M);
  assert.equal(Date.parse(calls[1].start_time),now-M);
  const old=cache.get(ids[0]).rows;
  await cache.refresh({callWS:()=>Promise.reject(Error())},ids,start,now+2*M);
  assert.equal(cache.get(ids[0]).rows,old); assert.match(cache.get(ids[0]).error,/history/);
});
