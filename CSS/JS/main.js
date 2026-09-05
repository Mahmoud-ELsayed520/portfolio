/**
 * Main entry point - Initializes all modules
 */
import { initTheme } from './theme.js';
import { initUI } from './ui.js';
import { initHeroCanvas } from './canvas.js';
import { initProjects } from './projects.js';
import { initCustomCursor } from './cursor.js';

initTheme();
initUI();
initHeroCanvas();
initProjects();
initCustomCursor();
