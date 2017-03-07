(function () {
    window.addEventListener('load', function () {
        var dropdown = document.querySelector('[data-toggle="dropdown"]');
        var dropdownText = document.querySelector('[data-toggle="dropdown"] span');
        var dropdownCategories = document.querySelectorAll('.categories-select a');
        var searchButton = document.querySelector('.search-button');
        var searchHeader = document.querySelector('.header-search');
        var chevron = document.querySelector('.chevron');

        searchButton.addEventListener('click', function (event) {
            event.preventDefault();
            if (searchButton.className.indexOf('open') > -1) {
                searchButton.classList.remove('open');
            } else {
                searchButton.className += ' open';
            }

            if (searchHeader.className.indexOf('open') > -1) {
                searchHeader.classList.remove('open');
            } else {
                searchHeader.className += ' open';
            }
        });

        dropdownCategories.forEach(function (category) {
            category.addEventListener('click', function (event) {
                var categoryClicked = event.target;
                var categoryParentElement = categoryClicked.parentElement;
                event.preventDefault();
                dropdownText.innerHTML = categoryClicked.innerHTML;
                dropdownCategories.forEach(function (dropCategory) {
                    dropCategory.classList.remove('selected');
                });
                categoryClicked.className += 'selected';
                if (categoryParentElement.nodeName === 'UL') {
                    categoryParentElement.classList.remove('open');
                } else {
                    categoryParentElement.parentElement.classList.remove('open');
                }
                chevron.classList.remove('rotate');
            });
        });

        dropdown.addEventListener('click', function (event) {
            var dropdownListElement = dropdown.nextElementSibling;
            event.preventDefault();

            if (dropdownListElement.className.indexOf('open') > -1) {
                dropdownListElement.classList.remove('open');
                chevron.classList.remove('rotate');
            } else {
                dropdownListElement.className += ' open';
                chevron.setAttribute('class', this.getAttribute('class') + ' rotate');
            }
        });
    });
}());
