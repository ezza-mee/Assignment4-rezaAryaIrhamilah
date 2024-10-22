// const addResumeBtn = document.getElementById('btn-input');
// const addResume = document.getElementById('add-resume');

// const addUpdateBtn = document.getElementById('btn-update');
// const addUpdate = document.getElementById('add-resume');

// addResumeBtn.addEventListener('click', function () {
// 	if (addResume.style.display === 'none') {
// 		addResume.style.display = 'block';
// 	} else {
// 		addResume.style.display = 'none';
// 	}
// });

// addUpdateBtn.addEventListener('click', function () {
// 	if (addUpdate.style.display === 'none') {
// 		addUpdate.style.display = 'block';
// 	} else {
// 		addUpdate.style.display = 'none';
// 	}
// });

// const dataResume = resumeData.some(
// 	(data) =>
// 		data.name === addName.value &&
// 		data.role === addRole.value &&
// 		data.availability === addAvailability.value &&
// 		data.age === addAge.value &&
// 		data.location === addLocation.value &&
// 		data.experience === addExperience.value &&
// 		data.email === addEmail.value
// );

// if (dataResume) {
// 	console.log('data sudah terisi');
// }

const RESUME_STORAGE = 'resume-storage';

const addInputResume = document.getElementById('add-resume');
const deleteDataResume = document.getElementById('btn-delete');

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
			<p>${age}</p>			
			<p>${location}</p>			
			<p>${experience}</p>			
			<p>${email}</p>	
		</div>
	`;
}

function handleAddResume() {
	if (resumeData.length > 0) {
		console.log('data sudah terisi');
		return;
	}

	// get id identity
	const addName = document.getElementById('add-name');
	const addRole = document.getElementById('add-role');

	// get value identity
	const name = addName.value;
	const role = addRole.value;

	// get id resume
	const addAvailability = document.getElementById('add-availability');
	const addAge = document.getElementById('add-age');
	const addLocation = document.getElementById('add-location');
	const addExperience = document.getElementById('add-experience');
	const addEmail = document.getElementById('add-email');

	// get value resume
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

	// memasukan data kedalam array menggunakan push
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
		status: false,
	});

	localStorage.setItem(RESUME_STORAGE, JSON.stringify(resumeData));

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

window.addEventListener('load', (_) => {
	handleReadResume();
});

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
}

deleteDataResume.addEventListener('click', handleDeleteResume);

addInputResume.addEventListener('click', handleAddResume);
