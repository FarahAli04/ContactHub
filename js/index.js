var contactList = [];
var contactImage = document.querySelector("#contactImage");
var contactName = document.querySelector("#contactName");
var contactEmail = document.querySelector("#contactEmail");
var contactPhone = document.querySelector("#contactPhone");
var contactAddress = document.querySelector("#contactAddress");
var contactNote = document.querySelector("#contactNotes");
var contactGroup = document.querySelector("#contactGroup");
var contactBody = document.querySelector("#contactBody");
var isFavorite = document.querySelector("#isFavorite");
var isEmergency = document.querySelector("#isEmergency");
var contactForm = document.querySelector("#contactForm");
var rowData = document.getElementById("rowData");
var deleteBtn = document.querySelector("#deleteBtn");
var saveContactBtn = document.querySelector("#saveContactBtn");
var cancelBtn = document.querySelector("#cancelBtn");
var updateContactBtn = document.querySelector("#updateContactBtn");
var favoritesList = document.getElementById("favoritesBody");
var emergencyList = document.getElementById("emergencyBody");

if(localStorage.getItem("contacts")){
    contactList = JSON.parse(localStorage.getItem("contacts"));
    console.log(contactList);
    displayContacts();
}


// close modal function
function closeModal(){
    var Modal = document.getElementById("addContactModal");
    var bootstrapModal = bootstrap.Modal.getInstance(Modal);
    bootstrapModal.hide();
}



function createContact(name, email, phone, address, note, group, favorite, emergency){
    var newContact = {
        name: name,
        email: email,
        phone: phone,
        address: address,
        note: note,
        group: group,
        favorite: favorite,
        emergency: emergency,
        image: currentImage
    }
    contactList.push(newContact);
    console.log(contactList);
    localStorage.setItem("contacts" , JSON.stringify(contactList));

    closeModal();

     Swal.fire({
        title: "Added Successfully!",
        text: "You clicked the button!",
        icon: "success"
        });

    reset();
    displayContacts();
}

function reset(){
contactName.value = "";
contactEmail.value = "";
contactPhone.value = "";
contactAddress.value = "";
contactNote.value = "";
contactGroup.value = "";
isFavorite.checked = false;
isEmergency.checked = false;
contactImage.value = "";                
currentImage = null;                      
imagePlaceholder.innerHTML = `<i class="fa-solid fa-user text-white fs-3"></i>`; 
}

function displayContacts(){   
    var cartona = ``;
    var Favcartona = ``;
    var Emergencycartona = ``;
    var favTotal = 0;
    var emergencyTotal = 0;
 
    for(var i = 0; i < contactList.length; i++){

        var current = contactList[i]; 

        var firstLetter = current.name.charAt(0).toUpperCase();
        var spaceMatch = current.name.match(/(?<= )\w/);
        var secondLetter = spaceMatch ? spaceMatch[0].toUpperCase() : "";
        var initials = firstLetter + secondLetter;

      
        cartona += `
        <div class="col-sm-12 col-md-6 col-lg-6 mb-3">
            <div class="p-4 rounded-4 border border-1 bg-white shadow-sm h-100">
                <header class="d-flex flex-column align-items-start gap-2 mb-4">
                    <div class="d-flex align-items-center justify-content-start gap-3 w-100">
                       <div class="contact-FL bg-purple rounded-4 d-flex align-items-center justify-content-center text-white position-relative">
    <div class="w-100 h-100 rounded-4 overflow-hidden d-flex align-items-center justify-content-center">
        ${current.image
            ? `<img src="${current.image}" class="w-100 h-100" style="object-fit:cover;">`
            : `<span class="fw-bolder">${initials}</span>`}
    </div>
    ${current.favorite ? `<span class="position-absolute top-0 start-100 translate-middle bg-warning rounded-circle sm-badge d-flex justify-content-center align-items-center"><i class="fas fa-star text-white"></i></span>` : ''}
    ${current.emergency ? `<span class="position-absolute top-100 start-100 translate-middle bg-danger rounded-circle sm-badge d-flex justify-content-center align-items-center"><i class="fas fa-heart-pulse text-white"></i></span>` : ''}
</div>
                        <div class="text d-flex flex-column">
                            <h5 class="mb-0 fw-bolder">${current.name}</h5>
                            <div class="d-flex align-items-center text-secondary font12x16x500 mt-1">
                                <div class="phone-icon bg-primary-subtle rounded-2 d-flex align-items-center justify-content-center me-2">
                                   <i class="fa-solid fa-phone text-primary"></i>
                                </div>
                                <span>${current.phone}</span>
                            </div>
                        </div>
                    </div>
                    <div class="w-100 d-flex flex-column gap-2 mt-1">
                        <div class="d-flex align-items-center text-secondary font14x20x600">
                            <div class="email-icon bg-purple-subtle rounded-2 d-flex align-items-center justify-content-center me-2">
                                <i class="fa-solid fa-envelope text-purple"></i>
                            </div>
                            <span>${current.email}</span>
                        </div>
                        <div class="d-flex align-items-center text-secondary font14x20x600">
                            <div class="address-icon bg-success-subtle rounded-2 d-flex align-items-center justify-content-center me-2">
                                <i class="fa-solid fa-location-dot text-success"></i>
                            </div>
                            <span>${current.address}</span>
                        </div>
                    </div>
             <div class="tags mt-2">
                    ${current.group ? `<span class="badge rounded-pill bg-primary-subtle px-2 py-1 font12x16x500 text-primary">${current.group}</span>`:''}
                    ${current.emergency ? '<span class="badge rounded-pill bg-danger-subtle px-2 py-1 font12x16x500 text-danger"><i class="fas fa-heartbeat text-danger me-2"></i>Emergency</span>':''}
                    ${current.favorite ? '<span class="badge rounded-pill bg-warning-subtle px-2 py-1 font12x16x500 text-warning"><i class="fas fa-star text-warning me-2"></i>Favorite</span>':''}</div>
                </header>
                <hr class="text-black-50 my-3"> 
                <footer class="d-flex justify-content-between align-items-center">
                    <div class="left d-flex gap-2">
                        <a class="smbtn bg-success-subtle rounded-2 d-flex align-items-center justify-content-center btn border-0 p-2" href="tel:${current.phone}">
                            <i class="fa-solid fa-phone text-success"></i>
                        </a>
                        <a class="smbtn bg-purple-subtle rounded-2 d-flex align-items-center justify-content-center btn border-0 p-2" href="mailto:${current.email}">
                            <i class="fa-solid fa-envelope text-purple"></i>
                        </a>
                    </div>
                    <div class="right d-flex gap-2">
                        <button class="smbtn rounded-2 btn d-flex justify-content-center align-items-center p-2 ${current.favorite ? "bg-warning-subtle":"bg-light"}" onclick="toggleFav(${i})"><i class="${current.favorite ? 'fa-solid fa-star text-warning' : 'fa-regular fa-star text-secondary'}"></i></button>
                        <button class="smbtn rounded-2 btn d-flex justify-content-center align-items-center p-2  ${current.emergency ? "bg-danger-subtle":"bg-light"}" onclick="toggleEmg(${i})"><i class="${current.emergency ? 'fa-solid fa-heart-pulse text-danger' : 'fa-regular fa-heart text-secondary'}"></i></button>
                        <button class="smbtn rounded-2 btn bg-light p-2 d-flex justify-content-center align-items-center" onclick="editContact(${i})" type="button" ><i class="fa-solid fa-pen text-secondary" data-bs-toggle="modal" data-bs-target="#addContactModal" title="Edit Contact"></i></button>
                        <button class="smbtn rounded-2 btn bg-light p-2 d-flex justify-content-center align-items-center" onclick="deleteContact(${i})" type="button"><i class="fa-solid fa-trash text-secondary"></i></button>
                    </div>
                </footer>
            </div>
        </div>`;

        if(current.favorite){
            favTotal++;
            Favcartona += `
            <div class="p-3 rounded-4 bg-white d-flex justify-content-between align-items-center w-100 mb-2">
                <div class="d-flex align-items-center gap-3">
                    <div class="contact-FL bg-purple rounded-4 d-flex align-items-center justify-content-center text-white position-relative overflow-hidden">
 ${current.image
    ? `<img src="${current.image}" class="w-100 h-100" style="object-fit:cover;">`
    : `<span class="fw-bolder">${initials}</span>`}
</div>
                    <div class="text d-flex flex-column">
                        <h6 class="mb-0 fw-bolder ">${current.name}</h6>
                        <span class="text-secondary font11x17x400">${current.phone}</span>
                    </div>
                </div>
                <a class="smbtn bg-success-subtle rounded-2 d-flex align-items-center justify-content-center btn border-0 p-2" href="tel:${current.phone}">
                    <i class="fa-solid fa-phone text-success"></i>
                </a>
            </div>`;
        }

        if(current.emergency){
            emergencyTotal++;
            Emergencycartona += `
            <div class="p-3 rounded-4 bg-white d-flex justify-content-between align-items-center w-100 mb-2">
                <div class="d-flex align-items-center gap-3">
                   <div class="contact-FL bg-purple rounded-4 d-flex align-items-center justify-content-center text-white position-relative overflow-hidden">
 ${current.image
    ? `<img src="${current.image}" class="w-100 h-100" style="object-fit:cover;">`
    : `<span class="fw-bolder">${initials}</span>`}
</div>
                    <div class="text d-flex flex-column">
                        <h6 class="mb-0 fw-bolder ">${current.name}</h6>
                        <span class="text-secondary font11x17x400">${current.phone}</span>
                    </div>
                </div>
                <a class="smbtn bg-danger-subtle rounded-2 d-flex align-items-center justify-content-center btn border-0 p-2" href="tel:${current.phone}">
                    <i class="fa-solid fa-phone text-danger"></i>
                </a>
            </div>`;
        }
    }


       rowData.innerHTML = contactList.length === 0
        ? `
        <div class="opacity-50 text-center">
                    <div class="empty-bg bg-secondary-subtle rounded-4 d-flex align-items-center justify-content-center mx-auto"><i class="fa-solid fa-address-book text-secondary-emphasis fs-3"></i></div>
                    <h6 class="text-secondary-emphasis mt-3 mb-0 fw-bolder">No contacts found</h6>
                    <span class="text-secondary font14x20x600">Click "Add Contact" to get started</span>
                    </div>
        `
        : cartona;

    document.querySelector("#contactsCount").innerHTML = contactList.length;
    document.querySelector("#total").innerHTML = contactList.length;
    document.querySelector("#favorites").innerHTML = favTotal;
    document.querySelector("#emergency").innerHTML = emergencyTotal;

    favoritesList.innerHTML = favTotal === 0
        ? `<span class="text-secondary py-5">No favorites yet</span>`
        : Favcartona;

    emergencyList.innerHTML = emergencyTotal === 0
        ? `<span class="text-secondary py-5">No emergency yet</span>`
        : Emergencycartona;
}


// delete function
function deleteContact(index){
console.log(index);
var current = contactList[index];

    Swal.fire({
        title: "Delete Contact?",
        text: `Are you sure you want to delete ${current.name} ? This action cannot be undone.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#606773",
        confirmButtonText: "Yes, delete it!"
        }).then((result) => {
        if (result.isConfirmed){
            contactList.splice(index , 1);

            displayContacts();

            localStorage.setItem("contacts" , JSON.stringify(contactList));
         Swal.fire({
            title: "Deleted!",
            text: "Contact has been deleted.",
            icon: "success"
        });
    }
        });
    
}
var currentIndex = null;

contactForm.addEventListener("submit", function(e){
    e.preventDefault();
    if (currentIndex === null) {
        createContact(
            contactName.value, contactEmail.value, contactPhone.value,
            contactAddress.value, contactNote.value, contactGroup.value,
            isFavorite.checked, isEmergency.checked
        );
    } else {
        updateContact();
    }
});

function editContact(index){
    contactName.value = contactList[index].name;
    contactPhone.value = contactList[index].phone;
    contactEmail.value = contactList[index].email;
    contactAddress.value = contactList[index].address;
    contactGroup.value = contactList[index].group;
    contactNote.value = contactList[index].note;
    isFavorite.checked = contactList[index].favorite;   
    isEmergency.checked = contactList[index].emergency;  
     currentImage = contactList[index].image || null; 
    imagePlaceholder.innerHTML = currentImage
        ? `<img src="${currentImage}" class="w-100 h-100 rounded-circle" style="object-fit:cover;">`
        : `<i class="fa-solid fa-user text-white fs-3"></i>`;

    saveContactBtn.classList.add('d-none');
    updateContactBtn.classList.remove('d-none');
    currentIndex = index;
}

function updateContact(){
    var updatedContact = {
        name: contactName.value,
        email: contactEmail.value,
        phone: contactPhone.value,
        address: contactAddress.value,
        note: contactNote.value,
        group: contactGroup.value,
        favorite: isFavorite.checked,
        emergency: isEmergency.checked,
         image: currentImage
    };

    contactList.splice(currentIndex, 1, updatedContact);
    closeModal();

    Swal.fire({
        title: "Updated Successfully!",
        text: "Contact has been updated successfully",
        icon: "success"
    });

    reset();
    resetModalButtons(); 
    displayContacts();
    localStorage.setItem("contacts", JSON.stringify(contactList));
}

function resetModalButtons(){
    saveContactBtn.classList.remove('d-none');
    updateContactBtn.classList.add('d-none');
    currentIndex = null;
}

// toggle btns

function toggleFav(index){
     console.log(contactList[index]);
     contactList[index].favorite = ! contactList[index].favorite;
     displayContacts();
     localStorage.setItem("contacts" , JSON.stringify(contactList));
}

function toggleEmg(index){
     console.log(contactList[index]);
     contactList[index].emergency = ! contactList[index].emergency;
     displayContacts();
     localStorage.setItem("contacts" , JSON.stringify(contactList));
}


// search function

var searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", searchContact); 

function searchContact(){
    var text = searchInput.value.toLowerCase();
    var cards = ``;
    for(var i = 0; i < contactList.length; i++){
        var current = contactList[i]; 

        if(current.name.toLowerCase().includes(text) || current.email.toLowerCase().includes(text) || current.phone.toLowerCase().includes(text)){

            var firstLetter = current.name.charAt(0).toUpperCase();
            var spaceMatch = current.name.match(/(?<= )\w/);
            var secondLetter = spaceMatch ? spaceMatch[0].toUpperCase() : "";
            var initials = firstLetter + secondLetter; 

            cards += `
            <div class="col-sm-12 col-md-6 col-lg-6 mb-3">
            <div class="p-4 rounded-4 border border-1 bg-white shadow-sm h-100">
                <header class="d-flex flex-column align-items-start gap-2 mb-4">
                    <div class="d-flex align-items-center justify-content-start gap-3 w-100">
                    <div class="contact-FL bg-purple rounded-4 d-flex align-items-center justify-content-center text-white position-relative">
    <div class="w-100 h-100 rounded-4 overflow-hidden d-flex align-items-center justify-content-center">
        ${current.image
            ? `<img src="${current.image}" class="w-100 h-100" style="object-fit:cover;">`
            : `<span class="fw-bolder">${initials}</span>`}
    </div>
    ${current.favorite ? `<span class="position-absolute top-0 start-100 translate-middle bg-warning rounded-circle sm-badge d-flex justify-content-center align-items-center"><i class="fas fa-star text-white"></i></span>` : ''}
    ${current.emergency ? `<span class="position-absolute top-100 start-100 translate-middle bg-danger rounded-circle sm-badge d-flex justify-content-center align-items-center"><i class="fas fa-heart-pulse text-white"></i></span>` : ''}
</div>
                        <div class="text d-flex flex-column">
                            <h5 class="mb-0 fw-bolder">${current.name}</h5>
                            <div class="d-flex align-items-center text-secondary font12x16x500 mt-1">
                                <div class="phone-icon bg-primary-subtle rounded-2 d-flex align-items-center justify-content-center me-2">
                                   <i class="fa-solid fa-phone text-primary"></i>
                                </div>
                                <span>${current.phone}</span>
                            </div>
                        </div>
                    </div>
                    <div class="w-100 d-flex flex-column gap-2 mt-1">
                        <div class="d-flex align-items-center text-secondary font14x20x600">
                          <div class="email-icon bg-purple-subtle rounded-2 d-flex align-items-center justify-content-center me-2">
                                <i class="fa-solid fa-envelope text-purple"></i>
                            </div>
                            <span>${current.email}</span>
                        </div>
                        <div class="d-flex align-items-center text-secondary font14x20x600">
                            <div class="address-icon bg-success-subtle rounded-2 d-flex align-items-center justify-content-center me-2">
                                <i class="fa-solid fa-location-dot text-success"></i>
                            </div>
                            <span>${current.address}</span>
                        </div>
                    </div>
             <div class="tags mt-2">
                    ${current.group ? `<span class="badge rounded-pill bg-primary-subtle px-2 py-1 font12x16x500 text-primary">${current.group}</span>`:``}
                    ${current.emergency ? '<span class="badge rounded-pill bg-danger-subtle px-2 py-1 font12x16x500 text-danger"><i class="fas fa-heartbeat text-danger me-2"></i>Emergency</span>':''}
                    ${current.favorite ? '<span class="badge rounded-pill bg-warning-subtle px-2 py-1 font12x16x500 text-warning"><i class="fas fa-star text-warning me-2"></i>Favorite</span>':''}</div>
                </header>
                <hr class="text-black-50 my-3"> 
                <footer class="d-flex justify-content-between align-items-center">
                    <div class="left d-flex gap-2">
                        <a class="smbtn bg-success-subtle rounded-2 d-flex align-items-center justify-content-center btn border-0 p-2" href="tel:${current.phone}">
                            <i class="fa-solid fa-phone text-success"></i>
                        </a>
                        <a class="smbtn bg-purple-subtle rounded-2 d-flex align-items-center justify-content-center btn border-0 p-2" href="mailto:${current.email}">
                            <i class="fa-solid fa-envelope text-purple"></i>
                        </a>
                    </div>
                    <div class="right d-flex gap-2">
                  <button class="smbtn rounded-2 btn d-flex justify-content-center align-items-center p-2 ${current.favorite ? "bg-warning-subtle":"bg-light"}" onclick="toggleFav(${i})"><i class="${current.favorite ? 'fa-solid fa-star text-warning' : 'fa-regular fa-star text-secondary'}"></i></button>
                        <button class="smbtn rounded-2 btn d-flex justify-content-center align-items-center p-2  ${current.emergency ? "bg-danger-subtle":"bg-light"}" onclick="toggleEmg(${i})"><i class="${current.emergency ? 'fa-solid fa-heart-pulse text-danger' : 'fa-regular fa-heart text-secondary'}"></i></button>
                        <button class="smbtn rounded-2 btn bg-light p-2 d-flex justify-content-center align-items-center" onclick="editContact(${i})" type="button" ><i class="fa-solid fa-pen text-secondary" data-bs-toggle="modal" data-bs-target="#addContactModal" title="Edit Contact"></i></button>
                        <button class="smbtn rounded-2 btn bg-light p-2 d-flex justify-content-center align-items-center" onclick="deleteContact(${i})" type="button"><i class="fa-solid fa-trash text-secondary"></i></button>
                    </div>
                </footer>
            </div>
        </div>`;
        }
    }

    if(cards === ``){
        rowData.innerHTML = `
        <div class="opacity-50 text-center">
                    <div class="empty-bg bg-secondary-subtle rounded-4 d-flex align-items-center justify-content-center mx-auto"><i class="fa-solid fa-address-book text-secondary-emphasis fs-3"></i></div>
                    <h6 class="text-secondary-emphasis mt-3 mb-0 fw-bolder">No contacts found</h6>
                    <span class="text-secondary font14x20x600">Click "Add Contact" to get started</span>
                    </div>
        `;
    } else {
        rowData.innerHTML = cards;
    }
}


// validatioin

function validate_name(value) {
    return /^[A-Za-z\u0600-\u06FF\s]{2,50}$/.test(value.trim());
}

function validate_phone(value) {
    return /^(\+20|0020|20)?0?1[0125][0-9]{8}$/.test(value.trim());
}

function validate_email(value) {
    if (value.trim() === "") return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
} ;

contactName.addEventListener("input", function () {
    var value = contactName.value.trim();
    set_field_error(contactName, name_error, value.length > 0 && !validate_name(value));
});

contactPhone.addEventListener("input", function () {
    var value = contactPhone.value.trim();
    set_field_error(contactPhone, phone_error, value.length > 0 && !validate_phone(value));
});

contactEmail.addEventListener("input", function () {
    set_field_error(contactEmail, email_error, !validate_email(contactEmail.value));
});

var imagePlaceholder = document.querySelector(".image-placeholder");
var currentImage = null; 

contactImage.addEventListener("change", function(e){
    var file = e.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function(e){
        currentImage = e.target.result; // data:image/...;base64,....
        imagePlaceholder.innerHTML = `<img src="${currentImage}" class="w-100 h-100 rounded-circle" style="object-fit:cover;">`;
    };
    reader.readAsDataURL(file);
});