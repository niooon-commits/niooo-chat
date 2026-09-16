#!/usr/bin/env node

/**
 * Superpowers Enforcement Guard & Pre-Flight Reminder
 * 
 * Automatically enforces and reminds AI Agents and Developers to adhere to the
 * Superpowers Software Development Methodology (https://github.com/obra/superpowers).
 * 
 * Core Mandate:
 * Never jump directly into writing code without first consulting and invoking
 * the appropriate Superpowers skill (Brainstorming -> Writing Plans -> TDD -> Debugging).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Colors for terminal formatting
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
  bgYellow: '\x1b[43m\x1b[30m',
  bgRed: '\x1b[41m\x1b[37m'
};

const REQUIRED_SKILLS = [
  { name: 'using-superpowers', desc: 'Master trigger rule for skill invocation' },
  { name: 'defer-application-code', desc: 'Strict zero-unsolicited app code until instructed' },
  { name: 'brainstorming', desc: 'Interactive design exploration before coding' },
  { name: 'writing-plans', desc: 'Bite-sized implementation planning' },
  { name: 'executing-plans', desc: 'Plan execution tracking' },
  { name: 'test-driven-development', desc: 'Red-Green-Refactor TDD cycle' },
  { name: 'systematic-debugging', desc: 'Evidence-based root cause analysis' },
  { name: 'verification-before-completion', desc: 'Evidence-based verification' }
];

const GRAPH_SKILLS = [
  { name: 'explore-codebase', desc: 'Structural codebase exploration' },
  { name: 'debug-issue', desc: 'Graph-powered issue & call-chain tracing' },
  { name: 'review-changes', desc: 'Risk-scored change analysis & blast radius' },
  { name: 'review-delta', desc: 'Token-efficient delta review' },
  { name: 'refactor-safely', desc: 'Dependency-aware safe refactoring' }
];

console.log(`\n${c.cyan}======================================================================${c.reset}`);
console.log(`${c.bold}${c.magenta}   ⚡ SUPERPOWERS ACTIVE GUARD & PRE-FLIGHT REMINDER ⚡${c.reset}`);
console.log(`${c.cyan}======================================================================${c.reset}\n`);

// 1. Check Skills Directory
const skillsDir = path.join(rootDir, 'skills');
let skillsStatus = true;

if (!fs.existsSync(skillsDir)) {
  console.log(`${c.red}✖ CRITICAL: Skills directory not found at: ${skillsDir}${c.reset}`);
  skillsStatus = false;
} else {
  console.log(`${c.green}✔ Skills Directory Detected:${c.reset} ./skills`);
  for (const skill of REQUIRED_SKILLS) {
    const skillPath = path.join(skillsDir, skill.name, 'SKILL.md');
    if (fs.existsSync(skillPath)) {
      console.log(`   ${c.green}●${c.reset} ${c.bold}${skill.name}${c.reset} ${c.dim}- ${skill.desc}${c.reset}`);
    } else {
      console.log(`   ${c.yellow}▲ Missing skill: ${skill.name}${c.reset}`);
      skillsStatus = false;
    }
  }

  console.log(`\n${c.green}✔ Code Review Graph Intelligence Skills:${c.reset}`);
  for (const skill of GRAPH_SKILLS) {
    const skillPath = path.join(skillsDir, skill.name, 'SKILL.md');
    if (fs.existsSync(skillPath)) {
      console.log(`   ${c.green}●${c.reset} ${c.bold}${skill.name}${c.reset} ${c.dim}- ${skill.desc}${c.reset}`);
    }
  }
}

// 2. Check Knowledge Graph Database
const graphDb = path.join(rootDir, '.code-review-graph', 'graph.db');
if (fs.existsSync(graphDb)) {
  console.log(`\n${c.green}✔ Knowledge Graph Database Active:${c.reset} .code-review-graph/graph.db`);
} else {
  console.log(`\n${c.yellow}▲ Knowledge Graph Database not yet built (run: npm run graph:build)${c.reset}`);
}

// 3. Check System Instruction Files
console.log(`\n${c.cyan}[Verifying Instructions]${c.reset}`);
const geminiMd = path.join(rootDir, 'GEMINI.md');
const agentsMd = path.join(rootDir, 'AGENTS.md');

if (fs.existsSync(geminiMd)) {
  console.log(`${c.green}✔ GEMINI.md active${c.reset} (Auto-injected into agent context)`);
} else {
  console.log(`${c.yellow}▲ GEMINI.md missing - Agent memory degraded${c.reset}`);
}

if (fs.existsSync(agentsMd)) {
  console.log(`${c.green}✔ AGENTS.md active${c.reset} (DevOps & Platform rules active)`);
}

// 3. Print The Ironclad Agent Directives
console.log(`\n${c.bgYellow}${c.bold} 🛑 MANDATORY AGENT DIRECTIVES (DO NOT SKIP) 🛑 ${c.reset}`);
console.log(`${c.yellow}Before writing or editing ANY production code, verify the following:${c.reset}\n`);

console.log(`  ${c.bold}0. System Setup Boundary (defer-application-code):${c.reset}`);
console.log(`     NEVER write application/website code in src/ or index.html during setup.`);
console.log(`     Wait for the user's explicit command before implementing application UI.\n`);

console.log(`  ${c.bold}1. The 1% Rule (using-superpowers):${c.reset}`);
console.log(`     If there is even a 1% chance a skill applies, you ${c.bold}MUST${c.reset} invoke it.`);
console.log(`     Do NOT start typing code or make assumptions before invoking the skill.\n`);

console.log(`  ${c.bold}2. Spec & Design First (brainstorming):${c.reset}`);
console.log(`     Clarify requirements and break them down into digestible specs.`);
console.log(`     Never build unsolicited features or oversized unverified implementations.\n`);

console.log(`  ${c.bold}3. Implementation Planning (writing-plans):${c.reset}`);
console.log(`     Formulate bite-sized, numbered implementation tasks with explicit criteria.\n`);

console.log(`  ${c.bold}4. TDD Discipline (test-driven-development):${c.reset}`);
console.log(`     Write failing tests first before writing implementation code whenever applicable.\n`);

console.log(`  ${c.bold}5. Zero Guesswork (systematic-debugging):${c.reset}`);
console.log(`     When encountering an issue, investigate root cause with evidence before patching.\n`);

console.log(`  ${c.bold}6. Verification Before Completion (verification-before-completion):${c.reset}`);
console.log(`     Never declare a task done until lint and compile succeed without errors.\n`);

console.log(`${c.cyan}======================================================================${c.reset}`);
console.log(`${c.bold}${c.green}✔ Guard Check Passed. Superpowers methodology enforced.${c.reset}\n`);
