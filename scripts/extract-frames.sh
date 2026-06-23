#!/bin/bash
# Extract frames from template video recordings for AI context
# Usage: ./scripts/extract-frames.sh <template-id> <video-file>
# Example: ./scripts/extract-frames.sh 2 ~/Desktop/template-2.mp4

set -euo pipefail

TEMPLATE_ID="${1:?Usage: extract-frames.sh <template-id> <video-file>}"
VIDEO_FILE="${2:?Usage: extract-frames.sh <template-id> <video-file>}"
OUTPUT_DIR="public/template-videos/${TEMPLATE_ID}"

mkdir -p "$OUTPUT_DIR"

# Extract 1 frame every 2 seconds, scale to 1280px width, quality 3 (good)
ffmpeg -i "$VIDEO_FILE" \
  -vf "fps=0.5,scale=1280:-1" \
  -q:v 3 \
  "$OUTPUT_DIR/frame-%03d.jpg"

COUNT=$(ls -1 "$OUTPUT_DIR"/*.jpg 2>/dev/null | wc -l | tr -d ' ')
echo "Extracted $COUNT frames to $OUTPUT_DIR"
