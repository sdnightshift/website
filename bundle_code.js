const fs = require('fs');
const path = require('path');

// Konfiguration
const OUTPUT_FILE = 'website_context.txt'; // Name der Zieldatei
const INCLUDE_EXTS = ['.html', '.css', '.js'];
const EXCLUDE_DIRS = ['assets', '.git', '.vscode', 'node_modules'];

function bundleProject(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (!EXCLUDE_DIRS.includes(file)) {
                bundleProject(filePath, fileList);
            }
        } else {
            if (INCLUDE_EXTS.includes(path.extname(file))) {
                fileList.push(filePath);
            }
        }
    });

    return fileList;
}

function writeBundle() {
    const allFiles = bundleProject('.');
    let combinedContent = `--- SD NIGHTSHIFT STUDIO CONTEXT SNAPSHOT ---\n`;
    combinedContent += `Erstellt am: ${new Date().toLocaleString()}\n\n`;

    allFiles.forEach(filePath => {
        const fileName = path.basename(filePath);

        // WICHTIG: Ignoriere das Skript selbst UND die Ausgabedatei
        if (fileName === 'bundle.js' || fileName === OUTPUT_FILE) {
            return;
        }

        try {
            const content = fs.readFileSync(filePath, 'utf8');
            combinedContent += `\n${'='.repeat(60)}\n`;
            combinedContent += `FILE: ${filePath}\n`;
            combinedContent += `${'='.repeat(60)}\n\n`;
            combinedContent += content + '\n\n';
        } catch (err) {
            console.error(`Fehler beim Lesen von ${filePath}:`, err);
        }
    });

    fs.writeFileSync(OUTPUT_FILE, combinedContent);
    console.log(`✅ Erfolg! Kontext wurde in '${OUTPUT_FILE}' gespeichert.`);
    console.log(`(Die Datei '${OUTPUT_FILE}' wurde beim Einlesen ignoriert.)`);
}

writeBundle();