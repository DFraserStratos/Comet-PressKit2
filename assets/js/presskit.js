// Press Kit JavaScript

async function loadPressKit() {
    try {
        const response = await fetch('data/data.xml');
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        // Update the content
        updateContent(xmlDoc);
    } catch (error) {
        console.error('Error loading press kit:', error);
        document.getElementById('content').innerHTML = '<p>Error loading press kit data. Please try again later.</p>';
    }
}

function updateContent(xmlDoc) {
    const title = xmlDoc.querySelector('title').textContent;
    const description = xmlDoc.querySelector('description').textContent;
    
    // Update the page title
    document.title = `${title} - Press Kit`;
    
    // Build the HTML content
    const content = document.getElementById('content');
    content.innerHTML = `
        <header>
            <h1>${title}</h1>
            <p class="description">${description}</p>
        </header>
        
        ${buildBasicInfo(xmlDoc)}
        ${buildHistory(xmlDoc)}
        ${buildTeam(xmlDoc)}
        ${buildContact(xmlDoc)}
    `;
}

function buildBasicInfo(xmlDoc) {
    const basedIn = xmlDoc.querySelector('based-in')?.textContent || '';
    const website = xmlDoc.querySelector('website')?.textContent || '';
    
    return `
        <section class="section basic-info">
            <h2>Basic Information</h2>
            <p><strong>Location:</strong> ${basedIn}</p>
            <p><strong>Website:</strong> <a href="${website}">${website}</a></p>
        </section>
    `;
}

function buildHistory(xmlDoc) {
    const histories = xmlDoc.querySelectorAll('history');
    if (!histories.length) return '';
    
    const historyItems = Array.from(histories).map(history => {
        const header = history.querySelector('header')?.textContent || '';
        const text = history.querySelector('text')?.textContent || '';
        return `
            <div class="history-item">
                <h3>${header}</h3>
                <p>${text}</p>
            </div>
        `;
    }).join('');
    
    return `
        <section class="section history">
            <h2>History</h2>
            ${historyItems}
        </section>
    `;
}

function buildTeam(xmlDoc) {
    const credits = xmlDoc.querySelectorAll('credit');
    if (!credits.length) return '';
    
    const teamMembers = Array.from(credits).map(credit => {
        const person = credit.querySelector('person')?.textContent || '';
        const role = credit.querySelector('role')?.textContent || '';
        const website = credit.querySelector('website')?.textContent || '';
        
        return `
            <div class="team-member">
                <h3>${person}</h3>
                <p>${role}</p>
                ${website ? `<p><a href="${website}">${website}</a></p>` : ''}
            </div>
        `;
    }).join('');
    
    return `
        <section class="section team">
            <h2>Team</h2>
            <div class="grid">
                ${teamMembers}
            </div>
        </section>
    `;
}

function buildContact(xmlDoc) {
    const contacts = xmlDoc.querySelectorAll('contact');
    if (!contacts.length) return '';
    
    const contactItems = Array.from(contacts).map(contact => {
        const name = contact.querySelector('n')?.textContent || '';
        const mail = contact.querySelector('mail')?.textContent || '';
        const link = contact.querySelector('link')?.textContent || '';
        
        return `
            <div class="contact-item">
                <h3>${name}</h3>
                ${mail ? `<p><a href="mailto:${mail}">${mail}</a></p>` : ''}
                ${link ? `<p><a href="${link}">${link}</a></p>` : ''}
            </div>
        `;
    }).join('');
    
    return `
        <section class="section contact-info">
            <h2>Contact Information</h2>
            <div class="grid">
                ${contactItems}
            </div>
        </section>
    `;
}

// Load the press kit when the page loads
document.addEventListener('DOMContentLoaded', loadPressKit);
