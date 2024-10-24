const inputResumeBtn = document.getElementById('btn-input');
const updateResumeBtn = document.getElementById('btn-update');
const deleteResumeBtn = document.getElementById('btn-delete');
const addFormResume = document.getElementById('add-container');
const addResumeBtn = document.getElementById('btn-submit');

const RESUME_STORAGE = 'resume-storage';

let resumeData = [];
let id = 1;

function insertIdentityCard(id, name, role) {
	return `
	<div id="identity-card-${id}"> 
		<div class="font-black bg-slate-50 w-full h-10 mt-5">
			<h3 class="text-2xl sm:text-2xl">${name}</h3>
		</div>
		<div class="mt-2 bg-slate-50 w-full h-10">
			<h4 class="text-sm sm:text-base">${role}</h4>
		</div>
	</div>
	`;
}

function insertResumeCard(id, availability, age, location, experience, email) {
	return `
		<div id="resume-card-${id}">
			<p>${availability}</p>			
			<p class="mt-2">${age}</p>			
			<p class="mt-2">${location}</p>			
			<p class="mt-2">${experience}</p>			
			<p class="mt-2">${email}</p>	
		</div>
	`;
}

function handleInputResume() {
	const addName = document.getElementById('add-name');
	const addRole = document.getElementById('add-role');
	const addAvailability = document.getElementById('add-availability');
	const addAge = document.getElementById('add-age');
	const addLocation = document.getElementById('add-location');
	const addExperience = document.getElementById('add-experience');
	const addEmail = document.getElementById('add-email');

	const name = addName.value;
	const role = addRole.value;
	const availability = addAvailability.value;
	const age = addAge.value;
	const location = addLocation.value;
	const experience = addExperience.value;
	const email = addEmail.value;

	const addIdentityContainer = document.getElementById('identity-container');
	const addNameRoleCard = insertIdentityCard(id, name, role);
	addIdentityContainer.innerHTML += addNameRoleCard;

	const addResumeContainer = document.getElementById('resume-container');
	const addResumeCard = insertResumeCard(id, availability, age, location, experience, email);
	addResumeContainer.innerHTML += addResumeCard;

	if (resumeData.length > 0) {
		console.log('data sudah terisi');
		return;
	}

	resumeData.push({
		id: id,
		identity: { name: name, role: role },
		resume: {
			availability: availability,
			age: age,
			location: location,
			experience: experience,
			email: email,
		},
	});

	localStorage.setItem(RESUME_STORAGE, JSON.stringify(resumeData));

	document.getElementById('add-name').value = '';
	document.getElementById('add-role').value = '';
	document.getElementById('add-availability').value = '';
	document.getElementById('add-age').value = '';
	document.getElementById('add-location').value = '';
	document.getElementById('add-experience').value = '';
	document.getElementById('add-email').value = '';

	console.log(id);

	console.log(resumeData);
}

function handleReadResume() {
	try {
		const resumeString = localStorage.getItem(RESUME_STORAGE);
		if (resumeString) {
			const initialResume = JSON.parse(resumeString);
			if (Array.isArray(initialResume)) {
				let identityHTML = '';
				let resumeHTML = '';

				initialResume.forEach((resume) => {
					identityHTML += insertIdentityCard(resume.id, resume.identity.name, resume.identity.role);
					resumeHTML += insertResumeCard(resume.id, resume.resume.availability, resume.resume.age, resume.resume.location, resume.resume.experience, resume.resume.email);
				});

				const identityContainer = document.getElementById('identity-container');
				const resumeContainer = document.getElementById('resume-container');

				identityContainer.innerHTML = identityHTML;
				resumeContainer.innerHTML = resumeHTML;

				resumeData = initialResume;
			}
		} else {
			console.error('data resume tidak ditemukan');
		}
	} catch (error) {
		console.error('[handleReadResume]:', error);
	}
}

function setResumeToForm() {
	const resumeString = localStorage.getItem(RESUME_STORAGE);

	if (resumeString) {
		const resumeData = JSON.parse(resumeString);

		const selectedResume = resumeData.find((resume) => resume.id === id);

		if (selectedResume) {
			document.getElementById('add-name').value = selectedResume.identity.name;
			document.getElementById('add-role').value = selectedResume.identity.role;
			document.getElementById('add-availability').value = selectedResume.resume.availability;
			document.getElementById('add-age').value = selectedResume.resume.age;
			document.getElementById('add-location').value = selectedResume.resume.location;
			document.getElementById('add-experience').value = selectedResume.resume.experience;
			document.getElementById('add-email').value = selectedResume.resume.email;
		} else {
			console.log('data belum diisi!');
		}
	}
}

function displayResumeData() {
	let resumeData = JSON.parse(localStorage.getItem(RESUME_STORAGE)) || [];
	const resumeIndex = resumeData.findIndex((identity) => identity.id === id);

	if (resumeIndex !== -1) {
		// Update isi dari div dengan data yang diambil dari localStorage
		document.getElementById('resume-name').textContent = resumeData[resumeIndex].identity.name;
		document.getElementById('resume-role').textContent = resumeData[resumeIndex].identity.role;
		document.getElementById('resume-availability').textContent = resumeData[resumeIndex].resume.availability;
		document.getElementById('resume-age').textContent = resumeData[resumeIndex].resume.age;
		document.getElementById('resume-location').textContent = resumeData[resumeIndex].resume.location;
		document.getElementById('resume-experience').textContent = resumeData[resumeIndex].resume.experience;
		document.getElementById('resume-email').textContent = resumeData[resumeIndex].resume.email;
	} else {
		console.log('Data tidak ditemukan di localStorage');
	}
}

function handleUpdateResume() {
	const updateName = document.getElementById('add-name').value;
	const updateRole = document.getElementById('add-role').value;
	const updateAvailability = document.getElementById('add-availability').value;
	const updateAge = document.getElementById('add-age').value;
	const updateLocation = document.getElementById('add-location').value;
	const updateExperience = document.getElementById('add-experience').value;
	const updateEmail = document.getElementById('add-email').value;

	let resumeData = JSON.parse(localStorage.getItem(RESUME_STORAGE)) || [];
	const resumeIndex = resumeData.findIndex((identity) => identity.id === id);

	if (resumeIndex !== -1) {
		resumeData[resumeIndex].identity.name = updateName;
		resumeData[resumeIndex].identity.role = updateRole;
		resumeData[resumeIndex].resume.availability = updateAvailability;
		resumeData[resumeIndex].resume.age = updateAge;
		resumeData[resumeIndex].resume.location = updateLocation;
		resumeData[resumeIndex].resume.experience = updateExperience;
		resumeData[resumeIndex].resume.email = updateEmail;
		localStorage.setItem(RESUME_STORAGE, JSON.stringify(resumeData));

		console.log('data berhasil diperbarui');

		document.getElementById('add-name').value = '';
		document.getElementById('add-role').value = '';
		document.getElementById('add-availability').value = '';
		document.getElementById('add-age').value = '';
		document.getElementById('add-location').value = '';
		document.getElementById('add-experience').value = '';
		document.getElementById('add-email').value = '';

		handleReadResume();
	} else {
		console.log('data gagal diperbarui');
	}
}

function handleDeleteResume() {
	if (resumeData.length === 0) {
		console.log('data tidak ada');
		return;
	}

	resumeData = resumeData.filter((data) => data.id !== id);

	const identityCard = document.getElementById(`identity-card-${id}`);
	if (identityCard) {
		identityCard.remove();
	}

	const resumeCard = document.getElementById(`resume-card-${id}`);
	if (resumeCard) {
		resumeCard.remove();
	}

	localStorage.setItem(RESUME_STORAGE, JSON.stringify(resumeData));
}

window.addEventListener('load', (_) => {
	handleReadResume();
});

addResumeBtn.addEventListener('click', function () {
	let resumeData = JSON.parse(localStorage.getItem(RESUME_STORAGE));
	const resumeIndex = resumeData.findIndex((resume) => resume.id === id);

	if (resumeIndex !== -1) {
		handleUpdateResume();
	} else {
		handleInputResume();
	}
});

inputResumeBtn.addEventListener('click', function () {
	if (addFormResume.style.display === 'none') {
		addFormResume.style.display = 'block';
	} else {
		addFormResume.style.display = 'none';
	}

	if (resumeData.length > 0) {
		console.log('data sudah terisi');
		document.getElementById('add-name').value = '';
		document.getElementById('add-role').value = '';
		document.getElementById('add-availability').value = '';
		document.getElementById('add-age').value = '';
		document.getElementById('add-location').value = '';
		document.getElementById('add-experience').value = '';
		document.getElementById('add-email').value = '';
		return;
	}
});

updateResumeBtn.addEventListener('click', function () {
	if (addFormResume.style.display === 'none') {
		addFormResume.style.display = 'block';
	} else {
		addFormResume.style.display = 'none';
	}
	setResumeToForm();
});

deleteResumeBtn.addEventListener('click', handleDeleteResume);
