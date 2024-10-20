const addResumeBtn = document.getElementById('btn-input');
const addResume = document.getElementById('add-resume');

const addUpdateBtn = document.getElementById('btn-update');
const addUpdate = document.getElementById('add-resume');

addResumeBtn.addEventListener('click', function () {
	if (addResume.style.display === 'none') {
		addResume.style.display = 'block';
	} else {
		addResume.style.display = 'none';
	}
});

addUpdateBtn.addEventListener('click', function () {
	if (addUpdate.style.display === 'none') {
		addUpdate.style.display = 'block';
	} else {
		addUpdate.style.display = 'none';
	}
});

const RESUME_STORAGE = 'todo-storage';

let resumeData = [];

function insertResumeName() {
	if (resumeData.length === 0) {
		return 1;
	}
	return resumeData[todoData.length - 1].id + 1;
}

function insertResumeToCard() {
	const addResumeInput = document.getElementById('add-resume');
	const name = insertResumeName();
}
