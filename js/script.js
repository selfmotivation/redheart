const form = document.querySelector('.form');
const formField = document.querySelector('.form__field');
const testButton = document.querySelector('.main__test-btn');

const TestForm = {
    showForm() {
        form.style.display = 'flex';

        setTimeout(() => {
            form.style.opacity = '100%';
        }, 50);
        setTimeout(() => {
            formField.style.opacity = '100%';
        }, 200);
        this.defineElements();
    },

    closeForm() {
        formField.style.opacity = '0';

        setTimeout(() => {
            form.style.opacity = '0';
        }, 0);
        setTimeout(() => {
            form.style.display = 'none';
        }, 200);
    },

    defineElements() {
        this.form = document.querySelector('.form__field');
        this.aside = this.form.querySelector('.aside');
        this.resultOrderList = this.aside.querySelector('.aside__result-order');
        this.currentStep = this.aside.querySelector('.aside__current-step');
        this.currentStepCounter = +this.currentStep.textContent.slice(0,1);
        this.currentStepContent = this.form.querySelector(`.form__select_step-${this.currentStepCounter}`);
        this.currentOptions = this.form.querySelector('.form__select-options');
        this.status = this.form.querySelector('.status-bar');
        this.statusPercents = this.status.querySelector('.status-bar__percents');
        this.currentActiveStatus = this.status.querySelectorAll('.status-bar__current-status_active');
        this.optionInputs = this.form.querySelectorAll('input');
        this.nextButton = this.form.querySelector('.form__btn_next');

        this.optionInputs.forEach(optionInput => {
            optionInput.addEventListener('click', () => {
                TestForm.checkNextButton(optionInput);
                TestForm.updateResultOrderList(optionInput);
                TestForm.updateStatusBar();
            });
        });

        // this.nextButton.addEventListener('click', changeContent());
    },
    
    checkNextButton(optionInput) {
        if (optionInput.checked === true) {
            this.nextButton.removeAttribute('disabled');
            TestForm.nextButton.addEventListener('click', e => {
                e.preventDefault();

                TestForm.changeContent(TestForm.currentOptions);
            })
        } else {
            this.nextButton.setAttribute('disabled');
        }
    },

    changeContent(prev, next) {

        prev.style.opacity = '0';
        setTimeout(() => {
            prev.style.display = 'none';
        }, 300);

        TestForm.currentStep.innerHTML = '2 шаг';

        next.style.display = 'flex';

        setTimeout(() => {
            next.style.opacity = '100%';
        }, 300);
        setTimeout(() => {
            next.style.opacity = '100%';
        }, 500);
        this.defineElements();

    },

    updateResultOrderList(optionInput) {
        const newListItem = document.createElement('li');
        newListItem.classList.add('result-order__item');
        newListItem.innerText = optionInput.nextElementSibling.textContent;

        checkIfFirstItem(this, newListItem, optionInput);
        

        function checkIfFirstItem(parent, child, optionInput) {
            if (parent.resultOrderList.childElementCount === 0) {
                parent.resultOrderList.textContent = 'Состав вашей страховки:';
                checkOptionType(optionInput, parent, child);
                parent.resultOrderList.appendChild(child);
            } else {
                checkOptionType(optionInput, parent, child);
                parent.resultOrderList.appendChild(child);
            }
        }

        function checkOptionType(optionInput, parent, child) {
            if (optionInput.type === 'radio' && parent.resultOrderList.childElementCount === parent.currentStepCounter) {
                const lastListItem = parent.resultOrderList.lastElementChild;
                parent.resultOrderList.replaceChild(newListItem, lastListItem);
            }
        }
        
// Animation?
        // const newListItem = 
        // const showListItem = setInterval(animateAdding, 200);
        // function animateAdding() {
        //     this.style.opacity = '100%';
        // }
    },

    updateStatusBar() {
        let perc = this.statusPercents;
        let oldPerc = this.statusPercents.style.left;
        const newPerc = this.currentStepCounter * 20;

        this.currentActiveStatus[this.currentStepCounter - 1].style.width = '100%';
        this.statusPercents.style.left = `${newPerc}%`;
        
        let changePercents = setInterval(change, 15);

        function change() {
            if (oldPerc < newPerc) {
                oldPerc++;
                perc.innerHTML = `${oldPerc}%`;
            }
        }
    }
}

testButton.addEventListener('click', () => {
    TestForm.showForm();
});

form.addEventListener('click', e => {
    if (e.target === form || e.target.getAttribute('data-close') == '') {
        TestForm.closeForm();
    }
});


// const formCurrentStep = document.querySelector('.form__select_step-1');
// const options = formCurrentStep.querySelectorAll('.form__select-option');
// const statusBar = document.querySelector('.status-bar');
// const currentStatus = statusBar.querySelectorAll('.status-bar__current-status_active');
    
// console.log(options);

// options.forEach(option => {
//         option.addEventListener('click', fillStatusBar);
    
// });
// function fillStatusBar(event) {
//     // console.log(this);
//     console.log(this.tagName);
//     currentStatus[0].style.width = '100%';
// }

