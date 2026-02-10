#!/bin/bash

echo "🧹 Cleaning up unnecessary files..."

cd "$(dirname "$0")"

# Files to delete
files_to_delete=(
    ".DS_Store"
    "FILES_CREATED.md"
    "SUMMARY.txt"
    "CHECKLIST.md"
    "SETUP.md"
)

for file in "${files_to_delete[@]}"; do
    if [ -f "$file" ]; then
        rm "$file"
        echo "✓ Deleted: $file"
    else
        echo "- Not found: $file (already deleted)"
    fi
done

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "Remaining documentation:"
echo "  - README.md         (Project overview & quick start)"
echo "  - START_HERE.md     (Detailed setup guide)"
echo "  - quick-start.sh    (Automated setup)"
echo "  - troubleshoot.sh   (Diagnostic tool)"
echo ""
