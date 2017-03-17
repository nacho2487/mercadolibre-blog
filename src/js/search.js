(function () {
    var MeliBlog = function () {
        this.dropdown = document.querySelector('[data-toggle="dropdown"]');
        this.dropdownText = document.querySelector('[data-toggle="dropdown"] span');
        this.dropdownCategories = document.querySelectorAll('.categories-select a');
        this.searchButton = document.querySelector('.search-button');
        this.searchHeader = document.querySelector('.header-search');
        this.chevron = document.querySelector('.chevron');
        this.inputSearch = document.querySelector('.search-field');
        this.searchForm = document.getElementById('searchform');
        this.searchCategory = document.getElementById('searchCategory');
        this.primaryMenu = document.querySelector('.primary-menu');
        this.back = document.getElementById('blurBackground');
        this.searchRemove = document.getElementById('searchRemove');
        this.menuSwitch = document.getElementById('nav-header-menu-switch');
        this.shareSwitch = document.getElementById('nav-header-share-switch');

        this.init();
    };

    MeliBlog.prototype.init = function () {
        if (this.menuSwitch.checked || (this.shareSwitch && this.shareSwitch.checked)) {
            this.toggleBackground(true);
        }

        this.bind();
    };

    MeliBlog.prototype.bind = function () {
        var self = this;

        this.menuSwitch.addEventListener('change', function() {
            if (self.shareSwitch) {
                self.toggleSwitches(self.shareSwitch, this.checked);
            }
            self.toggleBackground(this.checked);
        });

        if (this.shareSwitch) {
            this.shareSwitch.addEventListener('change', function () {
                self.toggleSwitches(self.menuSwitch, this.checked);
                self.toggleBackground(this.checked);
            });
        }

        this.inputSearch.addEventListener('focus', function () {
            self.primaryMenu.className += ' mobile-hide';
            this.className += ' left-search-field';
        });

        this.inputSearch.addEventListener('blur', function () {
            self.primaryMenu.classList.remove('mobile-hide');
            this.classList.remove('left-search-field');

        });

        this.searchForm.addEventListener('submit', function(event) {
            if (!self.inputSearch.value) event.preventDefault();
            self.searchCategory.value = self.dropdownText.innerHTML;
        });

        this.searchRemove.addEventListener('click', function (event) {
            event.preventDefault();
            if (self.searchHeader.className.indexOf('open') > -1) {
                self.searchHeader.classList.remove('open');
            } else {
                self.searchHeader.className += ' open';
            }
            self.inputSearch.value = '';
        });

        this.searchButton.addEventListener('click', function (event) {
            event.preventDefault();
            if (self.searchHeader.className.indexOf('open') > -1) {
                self.searchHeader.classList.remove('open');
            } else {
                self.searchHeader.className += ' open';
            }
        });

        this.dropdownCategories.forEach(function (category, index, categories) {
            category.addEventListener('click', function (event) {
                var categoryClicked = event.target;
                var categoryParentElement = categoryClicked.parentElement;
                event.preventDefault();
                self.dropdownText.innerHTML = categoryClicked.innerHTML;
                categories.forEach(function (dropCategory) {
                    dropCategory.classList.remove('selected');
                });
                categoryClicked.className += 'selected';
                if (categoryParentElement.nodeName === 'UL') {
                    categoryParentElement.classList.remove('open');
                } else {
                    categoryParentElement.parentElement.classList.remove('open');
                }
                self.chevron.classList.remove('rotate');
            });
        });

        this.dropdown.addEventListener('click', function (event) {
            var dropdownListElement = this.nextElementSibling;
            event.preventDefault();

            if (dropdownListElement.className.indexOf('open') > -1) {
                dropdownListElement.classList.remove('open');
                self.chevron.classList.remove('rotate');
            } else {
                dropdownListElement.className += ' open';
                self.chevron.setAttribute('class', this.getAttribute('class') + ' rotate');
            }
        });
    };

    MeliBlog.prototype.toggleSwitches = function (targetSwitch, checked) {
        console.log(targetSwitch, checked);
        if (targetSwitch.checked && checked) {
            targetSwitch.checked = false;
        }
    };

    MeliBlog.prototype.toggleBackground = function (checked) {
        if (checked && this.back.className.indexOf('back-blur') === -1) {
            this.back.className += 'back-blur';
        } else if (!checked) {
            this.back.className = '';
        }
    }

    window.addEventListener('load', function () {
        var meliBlog = new MeliBlog();
    });
}());