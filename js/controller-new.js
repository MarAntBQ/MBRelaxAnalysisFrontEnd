function loadQuestions(gender) {
    fetch(`http://190.110.54.245:8090/api/mbrelax/questions/${gender}`)
        .then(response => response.json())
        .then(json => {
            const QuestionsDisplayer = document.getElementById("questions-ctnr");
            QuestionsDisplayer.innerHTML = ''; // Limpiar preguntas anteriores
            json.forEach((question, index) => {
                QuestionsDisplayer.innerHTML += `
                    <p class="fs18px tac mt5px mb5px tbold">${index + 1}. ${question.name}</p>
                    <div class="radios-container">
                        <div class="row-input" data-question-id="${question.id}" data-value="true">
                            <input type="radio" required name="question${question.id}" value="true" id="question${question.id}true">
                            <label for="question${question.id}true">SI</label>
                        </div>
                        <div class="row-input" data-question-id="${question.id}" data-value="false">
                            <input type="radio" required name="question${question.id}" value="false" id="question${question.id}false">
                            <label for="question${question.id}false">NO</label>
                        </div>
                    </div>`;
            });
            document.querySelectorAll('.row-input').forEach(div => {
                div.addEventListener('click', () => {
                    const questionId = div.getAttribute('data-question-id');
                    const value = div.getAttribute('data-value');
                    document.getElementById(`question${questionId}${value}`).checked = true;
                });
            });
        });
}

window.onload = function () {
    document.getElementById("nextButton").addEventListener("click", () => {
        const genderInputs = document.getElementsByName("gender");
        const selectedGender = Array.from(genderInputs).find(input => input.checked);
        if (selectedGender) {
            document.getElementById("genderPhase").style.display = "none";
            document.getElementById("personalDataPhase").style.display = "block";
            loadQuestions(selectedGender.value);
        } else {
            alert("Por favor seleccione su género.");
        }
    });

    document.getElementById("termsLink").addEventListener("click", (event) => {
        event.preventDefault();
        alert("Autoriza el uso de los datos solo con fines de brindar la asesoría personalizada y que estos datos en ningún momento serán usados por fuentes externas.");
    });

    document.getElementById("personalTest").addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const answers = [];
        formData.forEach((value, key) => {
            if (value === 'true' && key.startsWith('question')) {
                answers.push(parseInt(key.replace('question', '')));
            }
        });

        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            city: formData.get('city'),
            state: formData.get('state'),
            answers: answers
        };

        document.getElementById("spinner").style.display = "block";

        fetch('http://localhost:3000/api/mbrelax/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            document.getElementById("personalDataPhase").style.display = "none";
            document.getElementById("resultsPhase").style.display = "block";
            const resultsDisplayer = document.getElementById("results-ctnr");
            resultsDisplayer.innerHTML = ''; // Limpiar resultados anteriores
            const healthStatus = result.healthStatus;
            const systemNames = {
                Digestive: "Digestivo",
                Intestinal: "Intestinal",
                Circulatory: "Circulatorio",
                Nervous: "Nervioso",
                Immune: "Inmunológico",
                Respiratory: "Respiratorio",
                Urinary: "Urinario",
                Glandular: "Glandular",
                Structural: "Estructural"
            };
            for (const [key, value] of Object.entries(healthStatus)) {
                resultsDisplayer.innerHTML += `<p><strong>${systemNames[key]}:</strong> ${value}</p>`;
            }
            window.scrollTo(0, 0);
        })
        .catch(error => console.error('Error:', error))
        .finally(() => {
            // Ocultar el spinner
            document.getElementById("spinner").style.display = "none";
        });
    });

    document.getElementById("homeButton").addEventListener("click", () => {
        window.location.href = 'https://mbrelax.xyz/contact/';
    });
};