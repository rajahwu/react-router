#!/bin/bash

# Navigate to the src directory
cd src

# Find all files in the src directory and its subdirectories
# that match the patterns you want to format with Prettier
find . -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" | while read -r file; do
  # Run Prettier on each file
  prettier --write "$file"
done

# Navigate back to the root directory
cd ..
