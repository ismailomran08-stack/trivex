#!/bin/bash
# Trivex Website - Quick Deploy Script
# Double-click this file or run: ./deploy.sh

cd "$(dirname "$0")"

# Check if site-data.json has changed
if git diff --quiet site-data.json 2>/dev/null && ! git ls-files --others --exclude-standard | grep -q site-data.json; then
    echo "No changes to deploy."
    exit 0
fi

git add site-data.json
git commit -m "Update site content — $(date '+%b %d, %Y %I:%M %p')"
git push

echo ""
echo "✓ Changes pushed! Vercel will deploy in ~30 seconds."
echo "  Visit: https://www.trivexgroup.com"
