function loadRepos() {
	let input = document.getElementById('username').value;
	let ul = document.getElementById('repos');

	fetch(`https://api.github.com/users/${input}/repos`)
		.then(response => {
			ul.innerHTML = '';

			if (!response.ok) {
				alert(`${response.status} - ${response.statusText}`);
				throw new Error(`${response.status} - ${response.statusText}`);
			}

			return response.json();
		})
		.then(array => array.forEach(element => {
			let li = document.createElement('li');
			let anchor = document.createElement('a');
			anchor.href = element.html_url;
			anchor.target = "_blank"
			anchor.textContent = element.full_name;
			li.appendChild(anchor);
			ul.appendChild(li);
		}))
		.catch(err => {
			console.error(err);
		});
}