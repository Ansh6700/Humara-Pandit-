const FormController = (() => {

  let currentStep = 1;
  const totalSteps = 2;
  let selectedGoal = null;


  let formEl, steps, progressDots, progressLines;
  let nameInput, dobInput, genderInputs, zodiacPreview;
  let backBtn, nextBtn;
  let onSubmitCallback = null;

  function init(onSubmit) {
    onSubmitCallback = onSubmit;

    formEl = document.getElementById('birth-form');
    steps = document.querySelectorAll('.form-step');
    progressDots = document.querySelectorAll('.progress-dot');
    progressLines = document.querySelectorAll('.progress-line');

    nameInput = document.getElementById('input-name');
    dobInput = document.getElementById('input-dob');
    genderInputs = document.querySelectorAll('input[name="gender"]');
    zodiacPreview = document.getElementById('zodiac-preview');

    backBtn = document.getElementById('btn-back');
    nextBtn = document.getElementById('btn-next');


    nextBtn.addEventListener('click', handleNext);
    backBtn.addEventListener('click', handleBack);
    dobInput.addEventListener('change', handleDobChange);


    document.querySelectorAll('.goal-option').forEach(el => {
      el.addEventListener('click', () => selectGoal(el));
    });


    const today = new Date().toISOString().split('T')[0];
    dobInput.setAttribute('max', today);

    showStep(1);
  }

  function showStep(step) {
    currentStep = step;


    steps.forEach((s, i) => {
      s.classList.toggle('active', i + 1 === step);
    });


    progressDots.forEach((dot, i) => {
      dot.classList.remove('active', 'completed');
      if (i + 1 === step) {
        dot.classList.add('active');
      } else if (i + 1 < step) {
        dot.classList.add('completed');
      }
    });


    progressLines.forEach((line, i) => {
      line.classList.toggle('filled', i + 1 < step);
    });


    backBtn.classList.toggle('visible', step > 1);


    if (step === totalSteps) {
      nextBtn.innerHTML = '✨ Discover My Gemstone';
    } else {
      nextBtn.innerHTML = 'Continue →';
    }
  }

  function handleNext() {
    if (!validateStep(currentStep)) return;

    if (currentStep < totalSteps) {
      showStep(currentStep + 1);
    } else {
      submitForm();
    }
  }

  function handleBack() {
    if (currentStep > 1) {
      showStep(currentStep - 1);
    }
  }

  function validateStep(step) {
    clearErrors();

    if (step === 1) {
      let valid = true;

      if (!nameInput.value.trim()) {
        showError(nameInput, 'Please enter your name');
        valid = false;
      }
      if (!dobInput.value) {
        showError(dobInput, 'Please select your date of birth');
        valid = false;
      }

      return valid;
    }

    if (step === 2) {
      const genderSelected = document.querySelector('input[name="gender"]:checked');
      if (!genderSelected) {

        const radioGroup = document.querySelector('.radio-group');
        if (radioGroup) {
          radioGroup.style.outline = '1px solid #ef4444';
          radioGroup.style.borderRadius = '12px';
          setTimeout(() => {
            radioGroup.style.outline = 'none';
          }, 2000);
        }
        return false;
      }
      if (!selectedGoal) {

        document.querySelectorAll('.goal-option').forEach(el => {
          el.style.borderColor = 'rgba(239, 68, 68, 0.4)';
          setTimeout(() => {
            el.style.borderColor = '';
          }, 2000);
        });
        return false;
      }
      return true;
    }

    return true;
  }

  function showError(input, message) {
    input.classList.add('error');
    const errorEl = input.parentElement.querySelector('.form-error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');
    }
  }

  function clearErrors() {
    document.querySelectorAll('.form-input.error, .form-select.error').forEach(el => {
      el.classList.remove('error');
    });
    document.querySelectorAll('.form-error').forEach(el => {
      el.classList.remove('visible');
    });
  }

  function handleDobChange() {
    if (!dobInput.value) {
      zodiacPreview.classList.remove('visible');
      return;
    }

    const date = new Date(dobInput.value + 'T00:00:00');
    const zodiac = AstrologyEngine.getZodiacSign(date);

    if (zodiac) {
      zodiacPreview.querySelector('.zodiac-preview-symbol').textContent = zodiac.symbol;
      zodiacPreview.querySelector('.zodiac-preview-name').textContent = zodiac.name;
      zodiacPreview.querySelector('.zodiac-preview-dates').textContent =
        `${zodiac.hindi} • ${getMonthName(zodiac.startMonth)} ${zodiac.startDay} – ${getMonthName(zodiac.endMonth)} ${zodiac.endDay}`;
      zodiacPreview.classList.add('visible');
    }
  }

  function selectGoal(el) {
    document.querySelectorAll('.goal-option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    selectedGoal = el.dataset.goal;
  }

  function submitForm() {
    const name = nameInput.value.trim();
    const dob = new Date(dobInput.value + 'T00:00:00');
    const gender = document.querySelector('input[name="gender"]:checked').value;

    if (onSubmitCallback) {
      onSubmitCallback({
        name,
        birthDate: dob,
        gender,
        goalId: selectedGoal
      });
    }
  }

  function getMonthName(month) {
    const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month] || '';
  }

  function reset() {
    currentStep = 1;
    selectedGoal = null;
    if (nameInput) nameInput.value = '';
    if (dobInput) dobInput.value = '';
    genderInputs.forEach(r => r.checked = false);
    document.querySelectorAll('.goal-option').forEach(o => o.classList.remove('selected'));
    zodiacPreview.classList.remove('visible');
    clearErrors();
    showStep(1);
  }

  return { init, reset };

})();
