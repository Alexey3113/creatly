#!/bin/bash
cd /Users/leo/programming/creatly
OUT=analitic/eval/verdicts.jsonl
: > "$OUT"
declare -A PIN=( [dj]=djconcert [porsche]=porsche911 )
for s in clothing skydive vinyl porsche skisnow ecology anime notredame dj bmw dance folkmusic rockband photographer womensuit hoodie escort cardealer jprestaurant jptattoo jpclub redsuit freestyle; do
  pin="${PIN[$s]:-$s}"
  pf="analitic/pins/$pin.jpg"; rf="analitic/eval/shots/$s.jpg"
  if [ ! -f "$pf" ] || [ ! -f "$rf" ]; then echo "{\"slug\":\"$s\",\"error\":\"missing image\"}" >> "$OUT"; continue; fi
  j=$(codex exec -s read-only -C /Users/leo/programming/creatly --ignore-rules -i "$pf" -i "$rf" - < analitic/eval/rubric.txt 2>/dev/null | grep -oE '\{"pin_match".*\}' | tail -1)
  [ -z "$j" ] && j='{"pin_match":null,"craft":null,"verdict":"error","note":"no output"}'
  echo "{\"slug\":\"$s\",\"pin\":\"$pin\",$(echo "$j" | sed 's/^{//')" >> "$OUT"
  echo "done $s -> $j"
done
echo "ALL DONE"
