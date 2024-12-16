document.addEventListener('DOMContentLoaded', function() {
    fetch('data/data.xml')
        .then(response => response.text())
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
        .then(data => {
            const container = document.getElementById('container');
            container.innerHTML = `
                <div class="header">
                    <h1>${data.querySelector('title').textContent}</h1>
                    <p>${data.querySelector('description').textContent}</p>
                </div>
                
                <div class="section contact-info">
                    <h2>Contact Information</h2>
                    <p>Location: ${data.querySelector('based-in').textContent}</p>
                    <p>Email: ${data.querySelector('press-contact').textContent}</p>
                    <p>Website: <a href="${data.querySelector('website').textContent}">${data.querySelector('website').textContent}</a></p>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error loading press kit:', error);
            document.getElementById('container').innerHTML = '<p>Error loading press kit. Please try again later.</p>';
        });
});
