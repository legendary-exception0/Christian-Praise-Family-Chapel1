document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    const tableBody = document.querySelector('#members_table tbody');
    if (!tableBody) {
        console.error('Table body element not found');
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

    if (query) {
        fetch(`search_welfare.php?query=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    // Clear any existing rows
                    tableBody.innerHTML = '';

                    // Iterate over the results and create table rows
                    result.results.forEach(welfare => {
                        const row = document.createElement('tr');

                        row.innerHTML = `
                            <td>${welfare.id}</td>
                            <td>${welfare.name}</td>
                            <td>${welfare.amount}</td>
                            <td>${welfare.day}</td>
                            <td>${welfare.phone}</td>
                            <td>${welfare.address}</td>
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
    } else {
        alert('No search query provided.');
    }
});
