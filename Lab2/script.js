document.addEventListener("DOMContentLoaded", function() {
    const goalCards = Array.from(document.querySelectorAll(".goal-card"));
    
    // Завантажуємо збережені стани
    loadCheckboxStates();
    
    // Додаємо обробники подій для всіх чекбоксів
    goalCards.forEach((card) => {
        const checkboxes = Array.from(card.querySelectorAll("input[type='checkbox']"));
        
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", function() {
                saveCheckboxStates();
                updateCardStatus(card);
                calculateProgress();
                
                // Сповіщаємо інші вкладки про оновлення
                localStorage.setItem("goalUpdateTimestamp", Date.now());
            });
        });
    });

    function calculateProgress() {
        const allCards = Array.from(document.querySelectorAll(".goal-card"));
        const allCheckboxes = Array.from(document.querySelectorAll(".goal-card input[type='checkbox']"));
        
        const totalGoals = allCards.length;
        const completedGoals = allCards.filter(card => card.classList.contains("completed")).length;
        const totalSubgoals = allCheckboxes.length;
        const completedSubgoals = allCheckboxes.filter(checkbox => checkbox.checked).length;
        
        const goalsPercent = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;
        const subgoalsPercent = totalSubgoals > 0 ? Math.round((completedSubgoals / totalSubgoals) * 100) : 0;

        // Зберігаємо значення у localStorage
        localStorage.setItem("totalGoals", totalGoals);
        localStorage.setItem("totalSubgoals", totalSubgoals);
        localStorage.setItem("goalsPercent", goalsPercent);
        localStorage.setItem("subgoalsPercent", subgoalsPercent);

        updateChart("goals-progress", goalsPercent);
        updateChart("subgoals-progress", subgoalsPercent);
    }

    function updateChart(chartId, percent) {
        const chart = document.getElementById(chartId);
        if (!chart) return;
        
        chart.style.setProperty("--percent", `${percent}%`);
        const percentText = chart.querySelector("span");
        if (percentText) percentText.textContent = `${percent}%`;
    }

    function saveCheckboxStates() {
        const checkboxStates = {};

        Array.from(document.querySelectorAll(".goal-card")).forEach((card, cardIndex) => {
            const cardCheckboxes = Array.from(card.querySelectorAll("input[type='checkbox']"));
            checkboxStates[`card_${cardIndex}`] = {};

            cardCheckboxes.forEach((checkbox, checkboxIndex) => {
                checkboxStates[`card_${cardIndex}`][`checkbox_${checkboxIndex}`] = checkbox.checked;
            });
        });

        localStorage.setItem("goalCheckboxStates", JSON.stringify(checkboxStates));
    }

    function loadCheckboxStates() {
        const savedStates = localStorage.getItem("goalCheckboxStates");
        if (!savedStates) return;
        
        const checkboxStates = JSON.parse(savedStates);

        Array.from(document.querySelectorAll(".goal-card")).forEach((card, cardIndex) => {
            const cardKey = `card_${cardIndex}`;
            if (checkboxStates[cardKey]) {
                const cardCheckboxes = Array.from(card.querySelectorAll("input[type='checkbox']"));

                cardCheckboxes.forEach((checkbox, checkboxIndex) => {
                    const checkboxKey = `checkbox_${checkboxIndex}`;
                    if (checkboxStates[cardKey][checkboxKey] !== undefined) {
                        checkbox.checked = checkboxStates[cardKey][checkboxKey];
                    }
                });
            }

            updateCardStatus(card);
        });

        // Завантажуємо загальні значення з localStorage
        const totalGoals = localStorage.getItem("totalGoals");
        const totalSubgoals = localStorage.getItem("totalSubgoals");
        const goalsPercent = localStorage.getItem("goalsPercent");
        const subgoalsPercent = localStorage.getItem("subgoalsPercent");

        if (totalGoals !== null && totalSubgoals !== null) {
            updateChart("goals-progress", parseFloat(goalsPercent));
            updateChart("subgoals-progress", parseFloat(subgoalsPercent));
        }
    }

    function updateCardStatus(card) {
        const checkboxes = Array.from(card.querySelectorAll("input[type='checkbox']"));
        const allChecked = checkboxes.every(cb => cb.checked);
        
        if (allChecked) {
            card.classList.add("completed");
        } else {
            card.classList.remove("completed");
        }
    }

    // Відслідковуємо зміни в localStorage в інших вкладках
    window.addEventListener("storage", function(event) {
        if (["goalUpdateTimestamp", "totalGoals", "totalSubgoals"].includes(event.key)) {
            console.log("Оновлення отримано з іншої вкладки");
            loadCheckboxStates();
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const motivationMessages = [
        "Ти можеш більше, ніж думаєш!",
        "Кожна хвилина наближає тебе до мети!",
        "Не зупиняйся на досягнутому!",
        "Сьогоднішні зусилля - завтрашній результат!",
        "Ти робиш велику роботу! Продовжуй!"
    ];

    // Елементи
    const timerButton = document.getElementById('timer-button');
    const timerContainer = document.querySelector('.floating-timer-container');
    const timerDisplay = document.querySelector('.timer-display');
    const motivationElement = document.getElementById('motivation-message');
    const startBtn = document.getElementById('start-timer');
    const pauseBtn = document.getElementById('pause-timer');
    const resetBtn = document.getElementById('reset-timer');
    
    // Змінні для таймера
    let seconds = 0;
    let timerInterval;
    let nextMotivationTime = 300;
    
    // Форматування часу
    function formatTime(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        return [
            hours.toString().padStart(2, '0'),
            minutes.toString().padStart(2, '0'),
            secs.toString().padStart(2, '0')
        ].join(':');
    }
    
    // Оновлення таймера
    function updateTimer() {
        seconds++;
        timerDisplay.textContent = formatTime(seconds);
        
        // Перевіряємо, чи настав час для мотивації
        if (seconds >= nextMotivationTime) {
            showRandomMotivation();
            nextMotivationTime += 300; // Наступне повідомлення ще через 5 хв
        }
    }
    
    // Випадкове мотиваційне повідомлення
    function showRandomMotivation() {
        const randomIndex = Math.floor(Math.random() * motivationMessages.length);
        motivationElement.textContent = motivationMessages[randomIndex];
        motivationElement.style.display = 'block';
        
        setTimeout(() => {
            motivationElement.style.display = 'none';
        }, 5000); // Ховаємо через 5 секунд
    }
    
    // Керування таймером
    function startTimer() {
        if (!timerInterval) {
            timerInterval = setInterval(updateTimer, 1000);
            startBtn.textContent = "⏵";
        }
    }
    
    function pauseTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
        startBtn.textContent = "▶️";
    }
    
    function resetTimer() {
        pauseTimer();
        seconds = 0;
        timerDisplay.textContent = formatTime(seconds);
    }
    
    // Обробники подій
    timerButton.addEventListener('click', function() {
        document.querySelector('.floating-timer-container').classList.toggle('timer-expanded');
    });

    document.getElementById('start-timer').addEventListener('click', startTimer);
    document.getElementById('pause-timer').addEventListener('click', pauseTimer);
    document.getElementById('reset-timer').addEventListener('click', function() {
        resetTimer();
        nextMotivationTime = 300; // Скидаємо лічильник мотивації
    });

    // Автоматичний показ мотивації
    setInterval(function() {
        if (timerInterval && seconds >= nextMotivationTime) {
            showRandomMotivation();
            nextMotivationTime += 300;
        }
    }, 1000);
});

document.getElementById("postForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const postContent = document.getElementById("postContent").value;

    if (postContent.trim() === "") return;

    const postElement = document.createElement("div");
    postElement.classList.add("post");

    postElement.innerHTML = `
        <div class="post-header">
            <span class="author">Ви</span>
            <span class="date">${new Date().toLocaleDateString()}</span>
        </div>
        <div class="post-content">
            <p>${postContent}</p>
        </div>
        <div class="post-actions">
            <button class="like-btn">👍 0</button>
            <button class="comment-btn">💬 Коментувати</button>
        </div>
        <div class="comments"></div>
    `;

    document.querySelector(".posts").prepend(postElement);
    document.getElementById("postContent").value = ""; // Очистити поле вводу
});

document.querySelector('button[type="submit"]').addEventListener('mouseover', function() {
    this.setAttribute('title', 'Опублікувати пост');
});

