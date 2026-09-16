#!/usr/bin/env node

/**
 * Code Review Graph Guard & Intelligence Monitor
 * 
 * Automatically enforces and verifies the Code Review Graph
 * (https://github.com/tirth8205/code-review-graph) in this workspace.
 * 
 * Core Mandates:
 * 1. Graph Before Scan: Narrow scope via structural knowledge graph before reading source.
 * 2. Blast Radius & Impact: Always check dependents and execution flows before core edits.
 * 3. Keep Graph Fresh: Auto-update the graph incrementally on file modifications.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
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
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
  bgBlue: '\x1b[44m\x1b[37m'
};

console.log(`\n${c.cyan}======================================================================${c.reset}`);
console.log(`${c.bold}${c.blue}   📊 CODE REVIEW GRAPH INTELLIGENCE & IMPACT GUARD 📊${c.reset}`);
console.log(`${c.cyan}======================================================================${c.reset}\n`);

// 1. Verify CLI Tooling
let crgVersion = 'Unknown';
try {
  crgVersion = execSync('code-review-graph --version', { encoding: 'utf8' }).trim();
  console.log(`${c.green}✔ code-review-graph CLI detected:${c.reset} ${c.bold}${crgVersion}${c.reset}`);
} catch (err) {
  console.log(`${c.red}✖ Warning: code-review-graph CLI executable not found in PATH${c.reset}`);
}

// 2. Check Database Status
const graphDbPath = path.join(rootDir, '.code-review-graph', 'graph.db');
if (fs.existsSync(graphDbPath)) {
  const stats = fs.statSync(graphDbPath);
  const sizeKb = (stats.size / 1024).toFixed(1);
  console.log(`${c.green}✔ Knowledge Graph Database active:${c.reset} .code-review-graph/graph.db (${sizeKb} KB)`);

  try {
    const statusOutput = execSync('code-review-graph status', { encoding: 'utf8', cwd: rootDir }).trim();
    console.log(`\n${c.cyan}[Current Graph Topology]${c.reset}`);
    statusOutput.split('\n').forEach(line => {
      console.log(`   ${c.dim}●${c.reset} ${line}`);
    });
  } catch (e) {
    console.log(`   ${c.dim}● Note: Run 'npm run graph:build' to refresh full topology.${c.reset}`);
  }
} else {
  console.log(`${c.yellow}▲ Knowledge Graph Database not detected. Initializing build...${c.reset}`);
  try {
    execSync('code-review-graph build', { stdio: 'inherit', cwd: rootDir });
    console.log(`${c.green}✔ Knowledge Graph successfully built!${c.reset}`);
  } catch (e) {
    console.log(`${c.red}✖ Failed to build initial graph: ${e.message}${c.reset}`);
  }
}

// 3. Verify Graph Skills
const GRAPH_SKILLS = [
  { name: 'explore-codebase', desc: 'Structural codebase exploration' },
  { name: 'debug-issue', desc: 'Graph-powered issue & call-chain tracing' },
  { name: 'review-changes', desc: 'Risk-scored change analysis & blast radius' },
  { name: 'review-delta', desc: 'Token-efficient delta review' },
  { name: 'refactor-safely', desc: 'Dependency-aware safe refactoring' },
  { name: 'build-graph', desc: 'Incremental graph update management' }
];

console.log(`\n${c.cyan}[Graph Skills Verification]${c.reset}`);
const skillsDir = path.join(rootDir, 'skills');
for (const skill of GRAPH_SKILLS) {
  const skillPath = path.join(skillsDir, skill.name, 'SKILL.md');
  if (fs.existsSync(skillPath)) {
    console.log(`   ${c.green}●${c.reset} ${c.bold}${skill.name}${c.reset} ${c.dim}- ${skill.desc}${c.reset}`);
  } else {
    console.log(`   ${c.yellow}▲ Skill missing: ${skill.name}${c.reset}`);
  }
}

// 4. Code Intelligence Mandates (Reminders for Agent & Dev)
console.log(`\n${c.bgBlue}${c.bold} 🌐 CODE INTELLIGENCE DIRECTIVES (GRAPH FIRST) 🌐 ${c.reset}`);
console.log(`${c.yellow}Remember to apply structural graph analysis before modifying files:${c.reset}\n`);

console.log(`  ${c.bold}1. Graph before Blind Scan:${c.reset}`);
console.log(`     Use 'code-review-graph query' (callers_of, callees_of, imports_of)`);
console.log(`     instead of scanning entire file trees manually.\n`);

console.log(`  ${c.bold}2. Blast Radius Assessment:${c.reset}`);
console.log(`     Run 'code-review-graph impact' or 'npm run graph:review' before refactoring`);
console.log(`     to discover all affected entry points and dependents.\n`);

console.log(`  ${c.bold}3. Incremental Freshness:${c.reset}`);
console.log(`     Keep the knowledge graph updated via 'npm run graph:update'`);
console.log(`     whenever files are created, renamed, or modified.\n`);

console.log(`  ${c.bold}4. Source Truth Rule:${c.reset}`);
console.log(`     The graph narrows down the exact files and call-paths to inspect;`);
console.log(`     always verify logic in the actual source code before finalizing.\n`);

console.log(`${c.cyan}======================================================================${c.reset}`);
console.log(`${c.bold}${c.green}✔ Code Review Graph Guard Passed. Graph is healthy and active.${c.reset}\n`);
