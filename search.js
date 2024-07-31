function search() {
    const query = document.getElementById('search_text').value;

    // Fetch data from search.php
    fetch(`search.php?query=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                // Get table body element
                const tableBody = document.querySelector('#members_table tbody');
                
                // Clear any existing rows
                tableBody.innerHTML = '';

                // Iterate over the results and create table rows
                result.results.forEach(member => {
                    const row = document.createElement('tr');

                    row.innerHTML = `
                        <td>${member.id}</td>
                        <td>${member.name}</td>
                        <td>${member.gender}</td>
                        <td>${member.address}</td>
                        <td>${member.phone}</td>
                        <td>${member.hometown}</td>
                    `;
                    
                    tableBody.appendChild(row);
                });
            } else {
                alert('No results found or an error occurred');
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            alert('There was a problem with the fetch operation.');
        });
}

// Assuming you have a search button or form that calls this function
document.getElementById('search_button').addEventListener('click', search);