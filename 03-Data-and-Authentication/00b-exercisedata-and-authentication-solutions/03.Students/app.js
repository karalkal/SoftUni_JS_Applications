function solve() {
    // load data and display data first
    displayTable()

    const form = document.getElementById('form');
    form.addEventListener('submit', createRecord);


    async function createRecord(event) {
        event.preventDefault();

        let formData = new FormData(event.target);
        let dataToSubmit = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            facultyNumber: formData.get('facultyNumber'),
            grade: formData.get('grade'),
        };

        // clear form fields
        let formFields = document.querySelectorAll('div.inputs input');
        formFields.forEach(element => {
            if (element.value == '') {              // check for zero values
                alert('Some fields have been left empty!')
                throw new Error('Some fields have been left empty!')
            }
            element.value = ''
        });

        try {
            let response = await fetch('http://localhost:3030/jsonstore/collections/students', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSubmit)

            })
            if (response.ok == false) {
                let error = await response.json()
                throw new Error(error.message)
            }
        } catch (error) {
            alert(error.message)
        };

        displayTable();
    }

    async function displayTable() {
        const tBody = document.getElementsByTagName('tbody')[0]
        tBody.innerHTML = ''

        try {
            let response = await fetch('http://localhost:3030/jsonstore/collections/students')
            if (response.ok == false) {
                let error = await response.json()
                throw new Error(error.message)
            }
            // if response is 200
            let studentRecords = await response.json()

            for (let std of Object.values(studentRecords)) {
                let tr = document.createElement('tr')
                let tdFirstN = document.createElement('td')
                tdFirstN.textContent = std.firstName
                let tdLastN = document.createElement('td')
                tdLastN.textContent = std.lastName
                let tdFacNum = document.createElement('td')
                tdFacNum.textContent = std.facultyNumber
                let tdGrade = document.createElement('td')
                tdGrade.textContent = std.grade
                tr.appendChild(tdFirstN)
                tr.appendChild(tdLastN)
                tr.appendChild(tdFacNum)
                tr.appendChild(tdGrade)

                tBody.appendChild(tr)
            }


        } catch (error) {
            alert(error.message)
        }
    }

}

solve()