// Terminal Application Logic
class TerminalApp {
    constructor() {
        this.terminal = document.getElementById('terminal');
        this.currentCommand = '';
        this.commands = this.initializeCommands();
        
        this.setupEventListeners();
        this.initializeTerminal();
    }

    initializeCommands() {
        return {
            'cv overview': () => this.showOverview(),
            'cv work': () => this.showWork(),
            'cv education': () => this.showEducation(),
            'cv skills': () => this.showSkills(),
            'cv languages': () => this.showLanguages(),
            'cv contacts': () => this.showContacts(),
            'cv help': () => this.showCVHelp(),
            'cv': () => this.showCVHelp(),
            'clear': () => this.clearTerminal(),
            'whoami': () => this.showWhoAmI(),
            'contacts': () => this.showContacts(),
            'help': () => this.showHelp()
        };
    }

    // Command implementations
    showOverview() {
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('PROFESSIONAL OVERVIEW', 'header');
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('');
        this.addOutput(cvData.overview);
        this.addOutput('');
    }

    showWork() {
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('WORK EXPERIENCE', 'header');
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('');
        
        cvData.work.forEach((job, index) => {
            this.addOutput(`${job.title}`, 'title');
            this.addOutput(`${job.company} | ${job.period}`, 'subtitle');
            
            job.details.forEach(detail => {
                this.addOutput(`• ${detail}`, 'detail');
            });
            
            if (index < cvData.work.length - 1) {
                this.addOutput('');
                this.addOutput('');
            }
            this.addOutput('-'.repeat(50), 'separator');
        });
        this.addOutput('');
    }

    showEducation() {
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('EDUCATION & TRAINING', 'header');
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('');
        
        cvData.education.forEach((edu, index) => {
            this.addOutput(`${edu.degree}`, 'title');
            this.addOutput(`${edu.school} - ${edu.location}`, 'subtitle');
            this.addOutput(`Grade: ${edu.grade}`, 'detail');
            this.addOutput(`Focus: ${edu.focus}`, 'detail');
            
            if (index < cvData.education.length - 1) {
                this.addOutput('');
                this.addOutput('-'.repeat(40), 'separator');
                this.addOutput('');
            }
        });
        this.addOutput('');
    }

    showSkills() {
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('TECHNICAL SKILLS', 'header');
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('');
        
        Object.entries(cvData.skills).forEach(([category, skills]) => {
            this.addOutput(`${category}:`, 'title');
            this.addOutput(`  ${skills.join(' • ')}`, 'detail');
            this.addOutput('');
        });
    }

    showLanguages() {
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('LANGUAGES', 'header');
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('');
        cvData.languages.forEach(lang => this.addOutput(`• ${lang}`, 'detail'));
        this.addOutput('');
    }

    showContacts() {
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('CONTACT INFORMATION', 'header');
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('');
        this.addContactWithLink(`📧 Email: ${cvData.contacts.email}`, `mailto:${cvData.contacts.email}`);
        this.addContactWithLink(`🔗 LinkedIn: ${cvData.contacts.linkedin}`, cvData.contacts.linkedin);
        this.addOutput(`📍 Location: ${cvData.contacts.location}`, 'contact');
        this.addOutput('');
    }

    showCVHelp() {
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('AVAILABLE COMMANDS', 'header');
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('');
        this.addOutput('  cv overview    - Professional summary', 'detail');
        this.addOutput('  cv work        - Work experience', 'detail');
        this.addOutput('  cv education   - Education and training', 'detail');
        this.addOutput('  cv skills      - Technical skills', 'detail');
        this.addOutput('  cv languages   - Languages', 'detail');
        this.addOutput('  cv contacts    -  informatiContacton', 'detail');
        this.addOutput('  cv help        - Show which commands are supported', 'detail');
        this.addOutput('');
    }

    clearTerminal() {
        const lines = this.terminal.querySelectorAll('.line');
        lines.forEach(line => line.remove());
    }

    showWhoAmI() {
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('💻 Your Name - Your Title', 'header');
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('');
    }

    showHelp() {
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('AVAILABLE COMMANDS', 'header');
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('');
        this.addOutput('  cv             - CV informations', 'detail');
        this.addOutput('  whoami         - Info about me', 'detail');
        this.addOutput('  clear          - Clear terminal', 'detail');
        this.addOutput('  contacts      - How to contact me', 'detail');
        this.addOutput('  help           - Show available commands', 'detail');
        this.addOutput('');
    }

    // Utility methods
    addOutput(text, className = 'output') {
        const line = document.createElement('div');
        line.className = `line output ${className}`;
        line.textContent = text;
        this.terminal.appendChild(line);
        this.terminal.scrollTop = this.terminal.scrollHeight;
    }

    addContactWithLink(text, url) {
        const line = document.createElement('div');
        line.className = 'line output contact';
        
        const link = document.createElement('a');
        link.href = url;
        link.textContent = text;
        link.style.color = '#87ceeb';
        link.style.textDecoration = 'none';
        link.style.cursor = 'pointer';
        
        link.addEventListener('mouseenter', () => {
            link.style.textDecoration = 'underline';
        });
        link.addEventListener('mouseleave', () => {
            link.style.textDecoration = 'none';
        });
        
        line.appendChild(link);
        this.terminal.appendChild(line);
        this.terminal.scrollTop = this.terminal.scrollHeight;
    }

    createPromptLine() {
        const line = document.createElement('div');
        line.className = 'line';

        const promptSpan = document.createElement('span');
        promptSpan.className = 'prompt';
        promptSpan.textContent = 'user@portfolio:~$ ';

        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'cursor';
        cursorSpan.id = 'cursor';
        cursorSpan.textContent = '\u00A0';

        line.appendChild(promptSpan);
        line.appendChild(cursorSpan);
        this.terminal.appendChild(line);
        this.terminal.scrollTop = this.terminal.scrollHeight;
    }

    addCommandLine(cmd) {
        const line = document.createElement('div');
        line.className = 'line';

        const promptSpan = document.createElement('span');
        promptSpan.className = 'prompt';
        promptSpan.textContent = 'user@portfolio:~$ ';

        const commandSpan = document.createElement('span');
        commandSpan.className = 'command';
        commandSpan.textContent = cmd;

        line.appendChild(promptSpan);
        line.appendChild(commandSpan);
        this.terminal.appendChild(line);
        this.terminal.scrollTop = this.terminal.scrollHeight;
    }

    executeCommand(cmd, silent = false) {
        // Validate input first
        if (!this.validateInput(cmd)) {
            if (!silent) {
                // Remove cursor from current line and make it a completed command line
                const currentLine = this.terminal.lastElementChild;
                while (currentLine.firstChild) {
                    currentLine.removeChild(currentLine.firstChild);
                }

                const promptSpan = document.createElement('span');
                promptSpan.className = 'prompt';
                promptSpan.textContent = 'user@portfolio:~$ ';

                const commandSpan = document.createElement('span');
                commandSpan.className = 'command';
                commandSpan.textContent = cmd;

                currentLine.appendChild(promptSpan);
                currentLine.appendChild(commandSpan);
            }
            
            this.addOutput('Invalid command format');
            if (!silent) {
                this.createPromptLine();
            }
            return;
        }

        const sanitizedCmd = this.sanitizeInput(cmd);
        const command = sanitizedCmd.toLowerCase().trim();

        if (!silent) {
            const currentLine = this.terminal.lastElementChild;
            while (currentLine.firstChild) {
                currentLine.removeChild(currentLine.firstChild);
            }

            const promptSpan = document.createElement('span');
            promptSpan.className = 'prompt';
            promptSpan.textContent = 'user@portfolio:~$ ';

            const commandSpan = document.createElement('span');
            commandSpan.className = 'command';
            commandSpan.textContent = sanitizedCmd;

            currentLine.appendChild(promptSpan);
            currentLine.appendChild(commandSpan);
        }

        if (this.commands[command]) {
            try {
                this.commands[command]();
            } catch (error) {
                this.addOutput('Error executing command');
                console.error('Command execution error:', error);
            }
        } else if (command === '') {
            // Empty command
        } else {
            this.addOutput(`Command not found: ${sanitizedCmd}`);
            this.addOutput('Type "help" for available commands');
        }

        if (!silent) {
            this.createPromptLine();
        }
    }

    sanitizeInput(input) {
        if (typeof input !== 'string') return '';
        return input
            .replace(/[<>'"&]/g, '')
            .replace(/javascript:/gi, '')
            .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
            .substring(0, 100);
    }

    validateInput(input) {
        if (typeof input !== 'string') return false;
        if (input.length > 100) return false;
        // Only allow alphanumeric, spaces, and common safe characters
        return /^[a-zA-Z0-9\s\-_.]*$/.test(input);
    }

    // Auto-completion functionality
    getCompletions(input) {
        const allCommands = Object.keys(this.commands);
        
        if (input === 'c') {
            return ['clear', 'cv'];
        }
        if (input === '') {
            return ['whoami', 'cv', 'clear', 'help'];
        }
        
        if (input === 'cv' || input === 'cv ') {
            return ['overview', 'work', 'education', 'skills', 'languages', 'contacts', 'help'];
        }
        
        return allCommands.filter(cmd => cmd.startsWith(input));
    }

    autoComplete() {
        const completions = this.getCompletions(this.currentCommand);

        if (completions.length === 1) {
            this.currentCommand = completions[0];
            if (this.currentCommand === 'cv') {
                this.currentCommand = 'cv ';
            }
            this.updateCursor();
        } else if (completions.length > 1) {
            if (this.currentCommand === 'cv') {
                this.currentCommand = 'cv ';
            }

            const currentLine = this.terminal.lastElementChild;
            while (currentLine.firstChild) {
                currentLine.removeChild(currentLine.firstChild);
            }

            const promptSpan = document.createElement('span');
            promptSpan.className = 'prompt';
            promptSpan.textContent = 'user@portfolio:~$ ';

            const commandSpan = document.createElement('span');
            commandSpan.className = 'command';
            commandSpan.textContent = this.currentCommand;

            currentLine.appendChild(promptSpan);
            currentLine.appendChild(commandSpan);

            let commonPrefix = completions[0];
            for (let i = 1; i < completions.length; i++) {
                let j = 0;
                while (
                    j < commonPrefix.length &&
                    j < completions[i].length &&
                    commonPrefix[j] === completions[i][j]
                ) {
                    j++;
                }
                commonPrefix = commonPrefix.substring(0, j);
            }

            if (commonPrefix.length > this.currentCommand.length) {
                this.currentCommand = commonPrefix;
                this.updateCursor();
                return;
            }

            const displayCompletions = completions.map(cmd => {
                return cmd.startsWith('cv ') ? cmd.substring(3) : cmd;
            });

            const terminalWidth = this.terminal.offsetWidth;
            const charWidth = 8;
            const availableWidth = terminalWidth - 40;
            const maxCmdLength = Math.max(...displayCompletions.map(cmd => cmd.length));
            const columnWidth = Math.max(maxCmdLength + 4, 12);
            const columns = Math.max(1, Math.floor(availableWidth / (columnWidth * charWidth)));

            const totalWidth = displayCompletions.reduce((total, cmd) => total + cmd.length + 4, 0);
            const canFitInOneRow = totalWidth < (availableWidth / charWidth);

            if (canFitInOneRow && displayCompletions.length <= 8) {
                const singleRowText = displayCompletions.join('  ');
                this.addOutput(singleRowText);
            } else {
                const rows = Math.ceil(displayCompletions.length / columns);
                for (let i = 0; i < rows; i++) {
                    let rowText = '';
                    for (let j = 0; j < columns; j++) {
                        const index = i * columns + j;
                        if (index < displayCompletions.length) {
                            const cmd = displayCompletions[index].padEnd(columnWidth);
                            rowText += cmd;
                        }
                    }
                    if (rowText.trim()) {
                        this.addOutput(rowText);
                    }
                }
            }

            this.createPromptLine();
            this.updateCursor();
        }
    }

    updateCursor() {
        const currentLine = this.terminal.lastElementChild;
        if (currentLine) {
            while (currentLine.firstChild) {
                currentLine.removeChild(currentLine.firstChild);
            }

            const promptSpan = document.createElement('span');
            promptSpan.className = 'prompt';
            promptSpan.textContent = 'user@portfolio:~$ ';

            const commandSpan = document.createElement('span');
            commandSpan.className = 'command';
            commandSpan.textContent = this.currentCommand;

            const cursorSpan = document.createElement('span');
            cursorSpan.className = 'cursor';
            cursorSpan.id = 'cursor';
            cursorSpan.textContent = '\u00A0';

            currentLine.appendChild(promptSpan);
            currentLine.appendChild(commandSpan);
            currentLine.appendChild(cursorSpan);
        }
    }

    // Event listeners
    setupEventListeners() {
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        this.terminal.addEventListener('click', () => this.focusInput());
        this.setupTrafficLights();
    }

    handleKeyboard(e) {
        const commandInput = document.getElementById('commandInput');
        if (commandInput) {
            commandInput.focus();
        }
        
        if (e.key === 'Enter') {
            this.executeCommand(this.currentCommand);
            this.currentCommand = '';
        } else if (e.key === 'Backspace') {
            this.currentCommand = this.currentCommand.slice(0, -1);
            this.updateCursor();
        } else if (e.key === 'Tab') {
            e.preventDefault();
            this.autoComplete();
        } else if (e.key.length === 1) {
            this.currentCommand += e.key;
            this.updateCursor();
        }
    }

    focusInput() {
        const commandInput = document.getElementById('commandInput');
        if (commandInput) {
            commandInput.focus();
        }
    }

    setupTrafficLights() {
        // Close button
        document.querySelector('.close').addEventListener('click', () => {
            if(confirm('Do you want to close the terminal?')) {
                this.hideTerminal();
            }
        });

        // Minimize button
        document.querySelector('.minimize').addEventListener('click', () => {
            this.hideTerminal();
        });

        // Maximize button
        document.querySelector('.maximize').addEventListener('click', () => {
            this.toggleMaximize();
        });

        // Dock icon
        document.getElementById('dockIcon').addEventListener('click', () => {
            this.showTerminal();
        });
    }

    hideTerminal() {
        const terminalWindow = document.querySelector('.terminal-window');
        const dockIcon = document.getElementById('dockIcon');
        
        terminalWindow.style.transform = 'scale(0.8)';
        terminalWindow.style.opacity = '0';
        
        setTimeout(() => {
            terminalWindow.style.display = 'none';
            dockIcon.style.display = 'flex';
            
            setTimeout(() => {
                dockIcon.style.transform = 'translateX(-50%) scale(1)';
                dockIcon.style.opacity = '1';
            }, 100);
        }, 300);
    }

    showTerminal() {
        const terminalWindow = document.querySelector('.terminal-window');
        const dockIcon = document.getElementById('dockIcon');
        
        dockIcon.style.transform = 'translateX(-50%) scale(0)';
        dockIcon.style.opacity = '0';
        
        setTimeout(() => {
            dockIcon.style.display = 'none';
            terminalWindow.style.display = 'block';
            
            setTimeout(() => {
                terminalWindow.style.transform = 'scale(1)';
                terminalWindow.style.opacity = '1';
                this.focusInput();
            }, 50);
        }, 200);
    }

    toggleMaximize() {
        const terminalWindow = document.querySelector('.terminal-window');
        const terminalBody = document.querySelector('.terminal-body');
        
        if(terminalWindow.style.width === '90vw') {
            terminalWindow.style.width = '700px';
            terminalBody.style.height = '500px';
        } else {
            terminalWindow.style.width = '90vw';
            terminalBody.style.height = '700px';
        }
    }

    initializeTerminal() {
        // Execute initial commands
        this.addCommandLine('whoami');
        this.executeCommand('whoami', true);
        
        this.addCommandLine('help');
        this.executeCommand('help', true);
        
        // Create the input line
        this.createPromptLine();
        
        // Create hidden input for keyboard handling
        const commandInput = document.createElement('input');
        commandInput.type = 'text';
        commandInput.id = 'commandInput';
        commandInput.style.opacity = '0';
        commandInput.style.position = 'absolute';
        commandInput.style.left = '-9999px';
        document.body.appendChild(commandInput);
        
        // Focus on input
        commandInput.focus();
    }
}

// Initialize the terminal when the page loads
window.addEventListener('load', () => {
    new TerminalApp();
});
