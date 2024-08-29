// document.addEventListener("DOMContentLoaded", () => {
//     hide_view();
// });

// window.location.href = `update_membership.html?id=${member.id}`;

function hide_view(){
    var but = document.getElementById('but') ;

    but.style.display = 'none';
}

// document.addEventListener('DOMContentLoaded', function() {
//     console.log('Script Loaded');
//     document.addEventListener('click', function(event) {
//         console.log('Click detected');
//         if (event.target.classList.contains('ed-btn')) {
//             console.log('ed-btn clicked');
//         }
//     });
// });

document.addEventListener('click', function(event) {
    if (event.target.id === 'total_amount') {
        // Assuming you calculate the total amount from the table rows
        const table = document.getElementById('offering_table');
        let total = 0;

        // Loop through each row in the table (excluding the header)
        for (let i = 1, row; row = table.rows[i]; i++) {
            // Assuming the amount is in the third column (index 2)
            const amountCell = row.cells[2];
            const amount = parseFloat(amountCell.textContent);
            total += amount;
        }

        // Update the amount displayed
        const amountElement = document.getElementById('amount');
        amountElement.textContent = `Ghc ${total.toFixed(2)}`;
        amountElement.style.color = 'yellow';
        amountElement.style.backgroundColor = 'purple';
    }
});


document.addEventListener('click', function(event) {
    if (event.target.classList.contains('ed-btn')) {
        const row = event.target.closest('tr');
        const id = row.cells[0].innerText; 
        const urlParams = new URLSearchParams(window.location.search);
        const accountType = urlParams.get('account');

        console.log('Account Type:', accountType);

        if (!accountType) {
            alert('Account type cannot be recognized. Please Sign in as an Admin or User.');
            return;
        }

        if (confirm('Are you sure you want to edit this record?')) {
            window.location.href = `update_member.html?id=${id}&account=${accountType}`;
        }
    }
});



document.addEventListener('click', function(event) {
    if (event.target.classList.contains('off-ed-btn')) {
        const row = event.target.closest('tr');
        const id = row.cells[0].innerText; // Assuming the ID is in the first cell

        const urlParams = new URLSearchParams(window.location.search);
        const accountType = urlParams.get('account');

        console.log('Account Type:', accountType);

        if (!accountType) {
            alert('Account type cannot be recognized. Please Sign in as an Admin or User.');
            return;
        }

        if (confirm('Are you sure you want to edit this record?')) {
            window.location.href = `update_offering.html?id=${id}&account=${accountType}`;
        }
    }
});

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('t-ed-btn')) {
        const row = event.target.closest('tr');
        const id = row.cells[0].innerText; // Assuming the ID is in the first cell
        const urlParams = new URLSearchParams(window.location.search);
        const accountType = urlParams.get('account');

        console.log('Account Type:', accountType);

        if (!accountType) {
            alert('Account type cannot be recognized. Please Sign in as an Admin or User.');
            return;
        }

        if (confirm('Are you sure you want to edit this record?')) {
            window.location.href = `update_tithe.html?id=${id}&account=${accountType}`;
        }
    }
});

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('s-ed-btn')) {
        const row = event.target.closest('tr');
        const id = row.cells[0].innerText; // Assuming the ID is in the first cell
        const urlParams = new URLSearchParams(window.location.search);
        const accountType = urlParams.get('account');

        console.log('Account Type:', accountType);

        if (!accountType) {
            alert('Account type cannot be recognized. Please Sign in as an Admin or User.');
            return;
        }

        if (confirm('Are you sure you want to edit this record?')) {
            window.location.href = `update_seed.html?id=${id}&account=${accountType}`;
        }
    }
});

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('w-ed-btn')) {
        const row = event.target.closest('tr');
        const id = row.cells[0].innerText; // Assuming the ID is in the first cell
        const urlParams = new URLSearchParams(window.location.search);
        const accountType = urlParams.get('account');

        console.log('Account Type:', accountType);

        if (!accountType) {
            alert('Account type cannot be recognized. Please Sign in as an Admin or User.');
            return;
        }

        if (confirm('Are you sure you want to edit this record?')) {
            window.location.href = `update_welfare.html?id=${id}&account=${accountType}`;
        }
    }
});

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('del-btn')) {
        const row = event.target.closest('tr');
        const id = row.cells[0].innerText; // Assuming the ID is in the first cell

        if (confirm('Are you sure you want to delete this record?')) {
            fetch('btn_del.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `id=${id}`
            })
            .then(response => response.text())
            .then(data => {
                alert(data); // Show success/error message
                if (data.includes("Record deleted successfully")) {
                    row.remove(); // Remove the row from the table
                }
            })
            .catch(error => console.error('Error:', error));
        }
    }
});

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('off-del-btn')) {
        const row = event.target.closest('tr');
        const id = row.cells[0].innerText; // Assuming the ID is in the first cell

        if (confirm('Are you sure you want to delete this record?')) {
            fetch('btn_del_offering.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `id=${id}`
            })
            .then(response => response.text())
            .then(data => {
                alert(data); // Show success/error message
                if (data.includes("Record deleted successfully")) {
                    row.remove(); // Remove the row from the table
                }
            })
            .catch(error => console.error('Error:', error));
        }
    }
});

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('s-del-btn')) {
        const row = event.target.closest('tr');
        const id = row.cells[0].innerText; // Assuming the ID is in the first cell

        if (confirm('Are you sure you want to delete this record?')) {
            fetch('btn_del_seed.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `id=${id}`
            })
            .then(response => response.text())
            .then(data => {
                alert(data); // Show success/error message
                if (data.includes("Record deleted successfully")) {
                    row.remove(); // Remove the row from the table
                }
            })
            .catch(error => console.error('Error:', error));
        }
    }
});

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('t-del-btn')) {
        const row = event.target.closest('tr');
        const id = row.cells[0].innerText; // Assuming the ID is in the first cell

        if (confirm('Are you sure you want to delete this record?')) {
            fetch('btn_del_tithe.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `id=${id}`
            })
            .then(response => response.text())
            .then(data => {
                alert(data); // Show success/error message
                if (data.includes("Record deleted successfully")) {
                    row.remove(); // Remove the row from the table
                }
            })
            .catch(error => console.error('Error:', error));
        }
    }
});

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('w-del-btn')) {
        const row = event.target.closest('tr');
        const id = row.cells[0].innerText; // Assuming the ID is in the first cell

        if (confirm('Are you sure you want to delete this record?')) {
            fetch('btn_del_welfare.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `id=${id}`
            })
            .then(response => response.text())
            .then(data => {
                alert(data); // Show success/error message
                if (data.includes("Record deleted successfully")) {
                    row.remove(); // Remove the row from the table
                }
            })
            .catch(error => console.error('Error:', error));
        }
    }
});


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
                const cell7 = row.insertCell(6);

                cell1.innerHTML = member.id;
                cell2.innerHTML = member.name;
                cell3.innerHTML = member.gender;
                cell4.innerHTML = member.address;
                cell5.innerHTML = member.phone;
                cell6.innerHTML = member.hometown;
                cell7.innerHTML = '<button class="ed-btn">Edit</button> <button class="del-btn">Delete</button>';
            });

        })
        .catch(error => console.error('Error fetching data:', error));
}

function post_offering() {
    fetch('offering_view.php')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('offering_table');
            // Clear existing rows (except the header)
            table.querySelectorAll('tr:not(:first-child)').forEach(row => row.remove());
            
            data.forEach(offering => {
                const row = table.insertRow();
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                const cell3 = row.insertCell(2);
                const cell4 = row.insertCell(3);

                cell1.innerHTML = offering.id;
                cell2.innerHTML = offering.day;
                cell3.innerHTML = offering.amount;
                cell4.innerHTML = '<button class="off-ed-btn">Edit</button> <button class="off-del-btn">Delete</button>';
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
                const cell4 = row.insertCell(3);

                cell1.innerHTML = seed.id;
                cell2.innerHTML = seed.day;
                cell3.innerHTML = seed.amount;
                cell4.innerHTML = '<button class="s-ed-btn">Edit</button> <button class="s-del-btn">Delete</button>';
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
                const cell7 = row.insertCell(6);

                cell1.innerHTML = tithe.id;
                cell2.innerHTML = tithe.name;
                cell3.innerHTML = tithe.amount;
                cell4.innerHTML = tithe.day;
                cell5.innerHTML = tithe.phone;
                cell6.innerHTML = tithe.address;
                cell7.innerHTML = '<button class="t-ed-btn">Edit</button> <button class="t-del-btn">Delete</button>';
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
                const cell7 = row.insertCell(6);

                cell1.innerHTML = welfare.id;
                cell2.innerHTML = welfare.name;
                cell3.innerHTML = welfare.amount;
                cell4.innerHTML = welfare.day;
                cell5.innerHTML = welfare.phone;
                cell6.innerHTML = welfare.address;
                cell7.innerHTML = '<button class="w-ed-btn">Edit</button> <button class="w-del-btn">Delete</button>';
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

// document.getElementById('members').addEventListener('click',post_member)
// document.getElementById('tithes').addEventListener('click',post_tithe)
// document.getElementById('offerings').addEventListener('click',post_offering)
// document.getElementById('seeds').addEventListener('click',post_seed)
// document.getElementById('welfares').addEventListener('click',post_welfare)