const tabs = document.querySelectorAll('.tab');
        const underline = document.querySelector('.underline');

        function moveUnderline(activeTab) {
            underline.style.width = activeTab.offsetWidth + "px";
            underline.style.left = activeTab.offsetLeft + "px";
        }

        tabs.forEach(tab => {
            tab.addEventListener('click', function(event) {
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                moveUnderline(this);
            });
        });

        // Set underline position on page load
        moveUnderline(document.querySelector('.tab.active'));