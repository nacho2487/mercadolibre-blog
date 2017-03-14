(function () {
    window.addEventListener('load', function () {
        var dropdown = document.querySelector('[data-toggle="dropdown"]');
        var dropdownText = document.querySelector('[data-toggle="dropdown"] span');
        var dropdownCategories = document.querySelectorAll('.categories-select a');
        var searchButton = document.querySelector('.search-button');
        var searchHeader = document.querySelector('.header-search');
        var chevron = document.querySelector('.chevron');
        var inputSearch = document.querySelector('.search-field');
        var searchForm = document.getElementById('searchform');
        var searchCategory = document.getElementById('searchCategory');
        var primaryMenu = document.querySelector('.primary-menu');
        var back = document.getElementById('blurBackground');
        var searchRemove = document.getElementById('searchRemove');

        inputSearch.addEventListener('focus', function(event) {
            back.className += ' back-blur';
            primaryMenu.className += ' mobile-hide';
            inputSearch.className += ' left-search-field'
        });

        inputSearch.addEventListener('blur', function(event) {
            back.classList.remove('back-blur');
            primaryMenu.classList.remove('mobile-hide');
            inputSearch.classList.remove('left-search-field');

        });

        searchForm.addEventListener('submit', function(event) {
            if(!inputSearch.value) event.preventDefault();
            searchCategory.value = dropdownText.innerHTML;
        });

        searchRemove.addEventListener('click', function (event) {
            event.preventDefault();
            if (searchHeader.className.indexOf('open') > -1) {
                searchHeader.classList.remove('open');
            } else {
                searchHeader.className += ' open';
            }
            inputSearch.value = '';
        });

        searchButton.addEventListener('click', function (event) {
            event.preventDefault();
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
