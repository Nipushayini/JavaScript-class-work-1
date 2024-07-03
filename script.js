document.getElementById('moreUsersBtn').addEventListener('click', fetchUsers);

async function fetchUsers() {
    const profilesContainer = document.getElementById('profilesContainer');
    const userTableBody = document.querySelector('#userTable tbody');

    // Clear previous profiles
    profilesContainer.innerHTML = '';
    userTableBody.innerHTML = '';

    try {
        const response = await fetch('https://randomuser.me/api/?results=5');
        const data = await response.json();
        const users = data.results;

        // Create two rows of profile cards
        const firstRow = document.createElement('div');
        firstRow.classList.add('profile-row');

        const secondRow = document.createElement('div');
        secondRow.classList.add('profile-row');

        users.forEach((user, index) => {
            // Create profile card
            const profileCard = document.createElement('div');
            profileCard.classList.add('profile-card');
            profileCard.innerHTML = `
                <img src="${user.picture.medium}" alt="${user.name.first} ${user.name.last}">
                <h3>${user.name.first} ${user.name.last}</h3>
                <p>${user.email}</p>
            `;

            // Append profile card to appropriate row
            if (index < 3) {
                firstRow.appendChild(profileCard);
            } else {
                secondRow.appendChild(profileCard);
            }

            // Add user info to the table
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name.first} ${user.name.last}</td>
                <td>${user.email}</td>
            `;
            userTableBody.appendChild(row);
        });

        // Append rows to the profiles container
        profilesContainer.appendChild(firstRow);
        profilesContainer.appendChild(secondRow);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

// Initial fetch
fetchUsers();
