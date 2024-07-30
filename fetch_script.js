function post_member() {
    fetch('membership_view.php')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('members_table');
            data.forEach(member => {
                const row = table.insertRow();
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                const cell3 = row.insertCell(2);
                const cell4 = row.insertCell(3);
                const cell5 = row.insertCell(4);
                const cell6 = row.insertCell(5);

                cell1.innerHTML = member.id;
                cell2.innerHTML = member.name;
                cell3.innerHTML = member.gender;
                cell4.innerHTML = member.address;
                cell5.innerHTML = member.phone;
                cell6.innerHTML = member.hometown;
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

function post_offering() {
    fetch('offering_view.php')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('offering_table');
            data.forEach(offering => {
                const row = table.insertRow();
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                const cell3 = row.insertCell(2);

                cell1.innerHTML = offering.id;
                cell2.innerHTML = offering.day;
                cell3.innerHTML = offering.amount;
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

function post_seed() {
    fetch('seed_view.php')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('seed_table');
            data.forEach(seed => {
                const row = table.insertRow();
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                const cell3 = row.insertCell(2);

                cell1.innerHTML = seed.id;
                cell2.innerHTML = seed.day;
                cell3.innerHTML = seed.amount;
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

function post_tithe() {
    fetch('tithe_view.php')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('tithe_table');
            data.forEach(tithe => {
                const row = table.insertRow();
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                const cell3 = row.insertCell(2);
                const cell4 = row.insertCell(3);
                const cell5 = row.insertCell(4);
                const cell6 = row.insertCell(5);

                cell1.innerHTML = tithe.id;
                cell2.innerHTML = tithe.name;
                cell3.innerHTML = tithe.amount;
                cell4.innerHTML = tithe.date;
                cell5.innerHTML = tithe.phone;
                cell6.innerHTML = tithe.address;
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

function post_welfare() {
    fetch('welfare_view.php')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('welfare_table');
            data.forEach(welfare => {
                const row = table.insertRow();
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                const cell3 = row.insertCell(2);
                const cell4 = row.insertCell(3);
                const cell5 = row.insertCell(4);
                const cell6 = row.insertCell(5);

                cell1.innerHTML = welfare.id;
                cell2.innerHTML = welfare.name;
                cell3.innerHTML = welfare.amount;
                cell4.innerHTML = welfare.day;
                cell5.innerHTML = welfare.phone;
                cell6.innerHTML = welfare.address;
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}
