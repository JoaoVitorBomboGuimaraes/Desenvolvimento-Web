document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const description = document.getElementById('description').value;

    
    const data = {
        name: name,
        email: email,
        description: description
    };

    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById('message').textContent = result.message;
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById('message').textContent = 'Erro ao enviar o formulário.';
    });
});