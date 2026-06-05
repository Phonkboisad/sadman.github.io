// Terminal Application Logic
class TerminalApp {
    constructor() {
        this.terminal = document.getElementById('terminal');
        this.currentCommand = '';
        this.commands = this.initializeCommands();
        
        // Multi-tab support
        this.tabs = [];
        this.currentTabId = null;
        this.tabIdCounter = 0;
        
        this.setupEventListeners();
        this.createNewTab('Tab 1');
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
            'git': () => this.openGithub(),
            'cd ..': () => this.tellJoke(),
            'ls': () => this.listProjects(),
            'pwd': () => this.showCurrentDirectory(),
            'echo': () => this.showMotivation(),
            'about': () => this.showAbout(),
            'close': () => this.closeBrowserTab(),
            'exit': () => this.closeBrowserTab(),
            'quit': () => this.closeBrowserTab(),
            'help': () => this.showHelp()
        };
    }

    // Multi-tab functionality
    createNewTab(tabName = null) {
        const tabId = `tab-${this.tabIdCounter++}`;
        const name = tabName || `Tab ${this.tabs.length + 1}`;
        
        this.tabs.push({
            id: tabId,
            name: name,
            content: ''
        });
        
        this.currentTabId = tabId;
        this.renderTabs();
        this.clearTerminalContent();
        this.initializeTerminal();
    }

    switchTab(tabId) {
        this.currentTabId = tabId;
        this.renderTabs();
        this.updateTerminalDisplay();
    }

    closeTab(tabId) {
        if (this.tabs.length === 1) {
            alert('Cannot close the last tab!');
            return;
        }
        
        const index = this.tabs.findIndex(t => t.id === tabId);
        this.tabs.splice(index, 1);
        
        if (this.currentTabId === tabId) {
            this.currentTabId = this.tabs[0].id;
        }
        
        this.renderTabs();
        this.updateTerminalDisplay();
    }

    renderTabs() {
        const tabsContainer = document.getElementById('tabsContainer');
        tabsContainer.innerHTML = '';
        
        this.tabs.forEach(tab => {
            const tabEl = document.createElement('div');
            tabEl.className = `tab ${tab.id === this.currentTabId ? 'active' : ''}`;
            tabEl.innerHTML = `
                <span class="tab-name">${tab.name}</span>
                <span class="tab-close" data-tab-id="${tab.id}">✕</span>
            `;
            
            tabEl.querySelector('.tab-name').addEventListener('click', () => this.switchTab(tab.id));
            tabEl.querySelector('.tab-close').addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeTab(tab.id);
            });
            
            tabsContainer.appendChild(tabEl);
        });
    }

    updateTerminalDisplay() {
        this.terminal = document.getElementById('terminal');
        this.clearTerminalContent();
        this.initializeTerminal();
    }

    clearTerminalContent() {
        this.terminal.innerHTML = '';
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
        this.addOutput('👤 ABOUT ME', 'header');
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('');
        this.addOutput('Name: Sadman Bin Morshed', 'title');
        this.addOutput('Title: Cybersecurity Enthusiast | CSE Undergraduate', 'subtitle');
        this.addOutput('');
        this.addOutput('Bio:', 'detail');
        this.addOutput(cvData.overview, 'detail');
        this.addOutput('');
    }

    openGithub() {
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('🔗 OPENING GITHUB', 'header');
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('');
        this.addOutput('Opening GitHub profile in new tab...', 'detail');
        this.addOutput('');
        window.open('https://github.com/Phonkboisad', '_blank');
    }

    tellJoke() {
        const jokes = [
            'Why did the programmer quit his job? Because he didn\'t get arrays.',
            'How many programmers does it take to change a light bulb? None, that\'s a hardware problem!',
            'Why do programmers prefer dark mode? Because light attracts bugs!',
            'Why did the developer go broke? He used up all his cache!',
            'How do you know if there\'s a developer in your house? Don\'t worry, he\'ll tell you!',
            'Why did the cybersecurity expert lock the door? Because she wasn\'t taking any chances!'
        ];
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('😂 DISK ERROR MESSAGE', 'header');
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('');
        this.addOutput(randomJoke, 'detail');
        this.addOutput('');
    }

    listProjects() {
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('📁 MY PROJECTS', 'header');
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('');
        this.addOutput('1. Student CGPA Management System', 'title');
        this.addOutput('   Repository: https://github.com/Phonkboisad/CGPA-stats', 'subtitle');
        this.addOutput('   A robust console-based management system in Pure C', 'detail');
        this.addOutput('   Features: CGPA calculation, ranking, data visualization', 'detail');
        this.addOutput('');
    }

    showCurrentDirectory() {
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('📍 CURRENT DIRECTORY', 'header');
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('');
        this.addOutput('/home/sadman/portfolio', 'detail');
        this.addOutput('');
    }

    showMotivation() {
        const quotes = [
            'Security is not a product, but a process. - Bruce Schneier',
            'The only truly secure system is one that is powered off. - Unknown',
            'Code is poetry written for computers. - Anonymous',
            'Innovation distinguishes between a leader and a follower. - Steve Jobs',
            'The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt',
            'Every expert was once a beginner. - Ralph Waldo Emerson'
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('💡 MOTIVATIONAL QUOTE', 'header');
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('');
        this.addOutput(randomQuote, 'detail');
        this.addOutput('');
    }

    showAbout() {
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('ℹ️  QUICK INTRO', 'header');
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('');
        this.addOutput('Name: Sadman Bin Morshed', 'title');
        this.addOutput('Location: Chittagong, Bangladesh', 'detail');
        this.addOutput('Email: c253125@ugrad.iiuc.ac.bd', 'detail');
        this.addOutput('GitHub: https://github.com/Phonkboisad', 'detail');
        this.addOutput('');
    }

    closeBrowserTab() {
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('👋 GOODBYE!', 'header');
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('');
        this.addOutput('Closing window in 2 seconds...', 'detail');
        this.addOutput('');
        
        setTimeout(() => {
            window.close();
        }, 2000);
    }

    showHelp() {
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('AVAILABLE COMMANDS', 'header');
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('');
        this.addOutput('📚 CV & PROFILE:', 'title');
        this.addOutput('  cv             - CV informations', 'detail');
        this.addOutput('  whoami         - Info about me', 'detail');
        this.addOutput('  about          - Quick intro', 'detail');
        this.addOutput('  contacts       - How to contact me', 'detail');
        this.addOutput('');
        this.addOutput('🛠️  FAVORITE COMMANDS:', 'title');
        this.addOutput('  git            - Open GitHub in new tab', 'detail');
        this.addOutput('  cd ..          - Tell a dev joke', 'detail');
        this.addOutput('  ls             - List my projects', 'detail');
        this.addOutput('  pwd            - Show current directory', 'detail');
        this.addOutput('  echo           - Motivational quote', 'detail');
        this.addOutput('');
        this.addOutput('⚙️  UTILITIES:', 'title');
        this.addOutput('  clear          - Clear terminal', 'detail');
        this.addOutput('  close/exit/quit- Close the tab', 'detail');
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
                this.addOutput('Error executing command', 'error');
                console.error('Command execution error:', error);
            }
        } else if (command === '') {
            // Empty command
        } else {
            this.addOutput(`Command not found: ${sanitizedCmd}`, 'error');
            this.addOutput('Type "help" for available commands', 'error');
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
        const commandInput = document.getElementById('commandInput');
        
        // Handle keyboard input from the hidden input
        if (commandInput) {
            commandInput.addEventListener('input', (e) => {
                const inputValue = e.target.value;
                // Append new characters to currentCommand
                this.currentCommand += inputValue;
                this.updateCursor();
                e.target.value = '';
            });
            
            commandInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.executeCommand(this.currentCommand);
                    this.currentCommand = '';
                    e.target.value = '';
                } else if (e.key === 'Backspace') {
                    e.preventDefault();
                    this.currentCommand = this.currentCommand.slice(0, -1);
                    this.updateCursor();
                } else if (e.key === 'Tab') {
                    e.preventDefault();
                    this.autoComplete();
                }
            });
        }
        
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        this.terminal.addEventListener('click', () => this.focusInput());
        this.setupTrafficLights();
        
        // Tab add button
        const tabAddBtn = document.getElementById('tabAddBtn');
        if (tabAddBtn) {
            tabAddBtn.addEventListener('click', () => this.createNewTab());
        }
    }

    handleKeyboard(e) {
        // Focus the hidden input to ensure it remains focused
        const commandInput = document.getElementById('commandInput');
        if (commandInput && document.activeElement !== commandInput) {
            commandInput.focus();
        }
    }

    focusInput() {
        const commandInput = document.getElementById('commandInput');
        if (commandInput) {
            commandInput.focus();
            commandInput.value = '';
        }
    }

    setupTrafficLights() {
        // Close button
        const closeBtn = document.getElementById('closeBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                if(confirm('Do you want to close the terminal?')) {
                    this.hideTerminal();
                }
            });
        }

        // Minimize button
        const minimizeBtn = document.getElementById('minimizeBtn');
        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', () => {
                this.hideTerminal();
            });
        }

        // Maximize button
        const maximizeBtn = document.getElementById('maximizeBtn');
        if (maximizeBtn) {
            maximizeBtn.addEventListener('click', () => {
                this.toggleMaximize();
            });
        }

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
        // Show welcome message
        this.addOutput('Welcome to Sadman Bin Morshed\'s Portfolio Terminal', 'header');
        this.addOutput('='.repeat(60), 'separator');
        this.addOutput('');
        this.addOutput('💡 Tip: Type "help" to see available commands', 'detail');
        this.addOutput('');
        
        // Create the input line
        this.createPromptLine();
        
        // Focus on the hidden input for keyboard handling
        const commandInput = document.getElementById('commandInput');
        if (commandInput) {
            commandInput.focus();
        }
        
        // Initialize draggable functionality
        this.initializeDraggable();
    }
    
    initializeDraggable() {
        const terminalWindow = document.querySelector('.terminal-window');
        const terminalHeader = document.querySelector('.terminal-header');
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        
        terminalHeader.style.cursor = 'move';
        
        terminalHeader.addEventListener('mousedown', (e) => {
            isDragging = true;
            initialX = e.clientX - terminalWindow.offsetLeft;
            initialY = e.clientY - terminalWindow.offsetTop;
        });
        
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                
                terminalWindow.style.position = 'fixed';
                terminalWindow.style.left = currentX + 'px';
                terminalWindow.style.top = currentY + 'px';
            }
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }
}

// Initialize the terminal when the page loads
window.addEventListener('load', () => {
    new TerminalApp();
});
