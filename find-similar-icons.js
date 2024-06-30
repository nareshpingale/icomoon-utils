const fs = require('fs');
const stringSimilarity = require('string-similarity');
const prompt = require('prompt-sync')();

function loadSelectionJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function compareSvgs(svg1, svg2) {
    return stringSimilarity.compareTwoStrings(svg1, svg2);
}

function findSimilarIcons(icons, similarityThreshold = 0.99) {
    const similarIcons = {};

    for (let i = 0; i < icons.length; i++) {
        const icon1 = icons[i];
        const svg1 = icon1.icon.paths.join('');

        for (let j = i + 1; j < icons.length; j++) {
            const icon2 = icons[j];
            const svg2 = icon2.icon.paths.join('');

            const similarity = compareSvgs(svg1, svg2);
            if (similarity >= similarityThreshold) {
                if (!similarIcons[icon1.properties.name]) {
                    similarIcons[icon1.properties.name] = [];
                }
                similarIcons[icon1.properties.name].push(icon2.properties.name);
            }
        }
    }

    return similarIcons;
}

function main() {
    const filePath = prompt('Enter the path to selection.json: ');
    const similarityThresholdInput = prompt('Enter the similarity threshold (default is 0.99): ');
    const similarityThreshold = parseFloat(similarityThresholdInput) || 0.99;

    if (!fs.existsSync(filePath)) {
        console.error('selection.json not found at:', filePath);
        process.exit(1);
    }

    const data = loadSelectionJson(filePath);
    const icons = data.icons;
    const similarIcons = findSimilarIcons(icons, similarityThreshold);

    for (const [icon, similars] of Object.entries(similarIcons)) {
        console.log(`${icon},${similars.join(',')}`);
    }
}

main();
