const fs = require('fs');
const path = require('path');
const glob = require('glob');
const prompt = require('prompt-sync')();

const selectionFilePath = prompt('Enter the path to selection.json: ');
const projectDir = prompt('Enter the project directory to scan: ');

if (!fs.existsSync(selectionFilePath)) {
    console.error('selection.json not found at:', selectionFilePath);
    process.exit(1);
}

const selectionData = JSON.parse(fs.readFileSync(selectionFilePath, 'utf8'));
const iconNames = selectionData.icons.map((icon) => icon.properties.name);

const scanFilesForIcons = (files, icons) => {
    const usedIcons = new Set();

    files.forEach((file) => {
        const content = fs.readFileSync(file, 'utf8');

        icons.forEach((icon) => {
            const regex = new RegExp(`\\b${icon}\\b`, 'g');
            if (regex.test(content)) {
                usedIcons.add(icon);
            }
        });
    });

    return usedIcons;
};

glob.glob(`${projectDir}/**/*.{js,jsx,ts,tsx,html}`, {
    ignore: [
        '**/node_modules/**',
        '**/.next/**',
        '**/build/**',
        '**/dist/**',
        '**/coverage/**',
    ],
}).then((files) => {
    console.log(`Found ${files.length} files`);

    if (files.length === 0) {
        console.log('No files found to scan.');
        return;
    }

    const usedIcons = scanFilesForIcons(files, iconNames);
    console.log(`Found ${usedIcons.size} used icons`);

    const unusedIcons = iconNames.filter((icon) => !usedIcons.has(icon));

    if (unusedIcons.length > 0) {
        console.log('Unused icons:', unusedIcons);
    } else {
        console.log('No unused icons found.');
    }
}).catch((err) => {
    console.error('Error reading files:', err);
});
