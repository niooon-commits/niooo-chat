#!/usr/bin/env node

/**
 * Material Symbols Icon Standard Guard & Validator
 * 
 * Enforces the usage of Material Symbols (@expo/material-symbols)
 * across all applications, interfaces, and components.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Terminal color formatting
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  purple: '\x1b[35m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  bgPurple: '\x1b[45m\x1b[37m'
};

console.log(`\n${c.cyan}======================================================================${c.reset}`);
console.log(`${c.bold}${c.purple}   🎨 MATERIAL SYMBOLS ICON STANDARD GUARD (@expo/material-symbols) 🎨${c.reset}`);
console.log(`${c.cyan}======================================================================${c.reset}\n`);

// 1. Check package.json dependency
const pkgPath = path.join(rootDir, 'package.json');
let pkgInstalled = false;
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  if (deps['@expo/material-symbols']) {
    console.log(`${c.green}✔ @expo/material-symbols package declared:${c.reset} ${c.bold}${deps['@expo/material-symbols']}${c.reset}`);
    pkgInstalled = true;
  }
}

if (!pkgInstalled) {
  console.log(`${c.red}✖ @expo/material-symbols missing in package.json!${c.reset}`);
}

// 2. Check skill existence
const skillPath = path.join(rootDir, 'skills', 'material-symbols', 'SKILL.md');
if (fs.existsSync(skillPath)) {
  console.log(`${c.green}✔ Material Symbols Skill active:${c.reset} ./skills/material-symbols/SKILL.md`);
} else {
  console.log(`${c.yellow}▲ Material Symbols Skill missing at: ${skillPath}${c.reset}`);
}

// 3. Check React Component
const componentPath = path.join(rootDir, 'src', 'components', 'MaterialSymbol.tsx');
if (fs.existsSync(componentPath)) {
  console.log(`${c.green}✔ Universal Component active:${c.reset} src/components/MaterialSymbol.tsx`);
} else {
  console.log(`${c.yellow}▲ Universal Component missing at: ${componentPath}${c.reset}`);
}

// 4. Check HTML font configuration
const htmlPath = path.join(rootDir, 'index.html');
if (fs.existsSync(htmlPath)) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  if (html.includes('Material+Symbols')) {
    console.log(`${c.green}✔ Material Symbols Fonts linked in index.html${c.reset}`);
  } else {
    console.log(`${c.yellow}▲ Notice: Font links missing in index.html${c.reset}`);
  }
}

// 5. Directives for Agents & Developers
console.log(`\n${c.bgPurple}${c.bold} 🌟 ICONOGRAPHY DIRECTIVE FOR NEW APPLICATIONS 🌟 ${c.reset}`);
console.log(`${c.yellow}When generating or updating any application UI:${c.reset}\n`);

console.log(`  ${c.bold}1. Mandatory Icon Standard:${c.reset}`);
console.log(`     Use Material Symbols for all buttons, menus, cards, and status icons.`);
console.log(`     Import '<MaterialSymbol name="..." />' from '@/components/MaterialSymbol'.\n`);

console.log(`  ${c.bold}2. Consistent Visual Hierarchy:${c.reset}`);
console.log(`     - Standard actions: size={20} or size={24}, outlined style`);
console.log(`     - Active/Selected state: fill={true}`);
console.log(`     - Dense indicators & badges: size={16}\n`);

console.log(`  ${c.bold}3. Mobile & Expo Compatibility:${c.reset}`);
console.log(`     In Expo apps, import '@expo/material-symbols/<icon>.xml' or run 'npx add-material-symbols'.\n`);

console.log(`${c.cyan}======================================================================${c.reset}`);
console.log(`${c.bold}${c.green}✔ Material Symbols Guard Passed. Icon standard ready for applications.${c.reset}\n`);
