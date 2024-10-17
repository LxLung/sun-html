function toggleAside() {
    const contentWrapper = document.getElementById('contentWrapper');
    const toggleButton = document.getElementById('toggleButton');

    contentWrapper.classList.toggle('collapsed');

    // Toggle button text between '>' and '<'
    if (toggleButton.innerHTML === '&lt;') {
        toggleButton.innerHTML = '&gt;';
    } else {
        toggleButton.innerHTML = '&lt;';
    }
}

function setupSidebarDrag() {
    const sidebar = document.querySelector('.sidebar');
    const handle = document.querySelector('.sidebar-drag-handle');

    const sidebarStyles = window.getComputedStyle(sidebar);
    const minWidth = parseInt(sidebarStyles.minWidth);
    const maxWidth = parseInt(sidebarStyles.maxWidth);

    let start = null;
    handle.addEventListener('mousedown', (e) => {
        start = {x: e.clientX, width: sidebar.clientWidth};
    });

    document.addEventListener('mousemove', (e) => {
        if (!start) {
            return;
        }

        const offset = e.clientX - start.x;
        const width = Math.max(start.width + offset, minWidth);
        sidebar.style.width = `${width}px`;
    });

    document.addEventListener('mouseup', () => {
        start = null;
    });
}

function toggleTOC() {
    const tocButton = document.getElementById('toc-button');
    const toc = document.querySelector('.toc');
    const article = document.querySelector('article');

    tocButton.classList.toggle('active');
    toc.classList.toggle('ToggleTOC');
    article.classList.toggle('ToggleTOC');
}


class Tab {
    static select() {
        const tabs = document.querySelectorAll(".tab-selector li");
        const sections = document.querySelectorAll(".tab-content section");
        const closeButtons = document.querySelectorAll(".tab-selector .close");
        const files = document.querySelectorAll('.file-tree li');

        const toggleContentSelected = (name) => {
            sections.forEach((section) => {
                section.classList.remove('selected');
            });

            sections.forEach((section) => {
                if (section.getAttribute('targetName') === name) {
                    section.classList.add('selected');
                }
            });
        };

        const hideTab = (tabName) => {
            const tabList = document.querySelector('.tab-selector');
            tabList.appendChild(tabName);
        };

        const moveTabAboveHidden = (tab) => {
            const hiddenTab = document.querySelector('.tab-selector li.hidden');
            if (hiddenTab) {
                hiddenTab.parentNode.insertBefore(tab, hiddenTab);
            }
        };


        tabs.forEach((tab) => {
            tab.addEventListener('click', function () {
                const targetName = this.getAttribute('TargetName');

                // Remove 'selected' class from all tabs
                tabs.forEach((item) => {
                    item.classList.remove('selected');
                });

                // Add 'selected' class to the clicked tab
                this.classList.add('selected');
                toggleContentSelected(targetName);
            });
        });

        closeButtons.forEach((button) => {
            button.addEventListener('click', function (event) {
                event.stopPropagation(); // Prevent triggering the tab selection
                const tabToClose = this.closest('li');
                const tabToOpen  = tabToClose.previousElementSibling;;
                const currentSelectedTab = document.querySelector('.tab-selector li.selected');
                var Name;

                // Adds tab to left if no tab is selected
                if (currentSelectedTab === tabToClose){
                    tabToOpen.classList.add('selected');
                    Name = tabToOpen.getAttribute('targetName');
                } else {
                    Name = currentSelectedTab.getAttribute('targetName');
                    tabToClose.classList.remove('selected');
                }
                toggleContentSelected(Name);

                // Hide tab that was closed
                tabToClose.classList.add('hidden');
                hideTab(tabToClose);
            });
        });

        files.forEach((file) => {
            file.addEventListener('click', function () {
                const tabName = file.getAttribute('TargetName');
                const matchingTab = Array.from(tabs).find(tab => tab.getAttribute('TargetName') === tabName);
                if (matchingTab) {
                    matchingTab.classList.remove('hidden');
                    tabs.forEach((item) => {
                        item.classList.remove('selected');
                    });
                    matchingTab.classList.add('selected');
                    moveTabAboveHidden(matchingTab);
                    toggleContentSelected(tabName);
                }
            });
        });
    }
}

Tab.select();

const codeLines = document.querySelectorAll('pre code');

function handleClick(event) {
    const isAlreadySelected = event.target.classList.contains('selected');
    document.querySelectorAll('code.selected').forEach(function(code) {
        code.classList.remove('selected');
    });
    if (!isAlreadySelected) {
        event.target.classList.toggle('selected');
    }
}

codeLines.forEach(function(code) {
    code.addEventListener('click', handleClick);
});

// function closeTab() { alert("Hello"); }

// =============================================
document.addEventListener('DOMContentLoaded', () => {
    setupSidebarDrag();
});
