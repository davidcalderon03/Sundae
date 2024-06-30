document.getElementById('submit-response').addEventListener('click', function () {
    const response = document.getElementById('user-response').value;
    if (response.trim()) {
        const responseContainer = document.getElementById('response-container');
        const responseElement = document.createElement('div');
        responseElement.className = 'response';
        responseElement.textContent = response;
        responseContainer.appendChild(responseElement);
        document.getElementById('user-response').value = '';
    } else {
        alert('Please enter a response.');
    }
});
