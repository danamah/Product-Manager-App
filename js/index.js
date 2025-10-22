// ^###### HTML Element
var productNameInput = document.getElementById("productName");
var productCategoryInput = document.getElementById("productCategory");
var productPriceInput = document.getElementById("productPrice");
var productDescriptionInput = document.getElementById("productDescription");
var productImageInput = document.getElementById("productImage");
var productContainer = document.getElementById("productContainer");
var searchProductsInput = document.getElementById("searchProductsInput");
var addButton = document.getElementById("addButton");
var updateButton = document.getElementById("updateButton");
var productsRegex = {
  productName: /^[A-Z][\sa-z0-9]{2,}$/,
  productPrice: /^[0-9]{2,6}$/,
  productCategory: /^(Mobile|Tv|Camera|Laptop|Headpho|Speaker|Printer)$/,
  productDescription: /^[A-Za-z].{3,}$/,
};

// &###### App Variable
// ! By Using logical operator
var productList = JSON.parse(localStorage.getItem("prodcutsList")) || [];
// ! By using if condition
// if (localStorage.getItem("prodcutsList")) {
//   var productList = JSON.parse(localStorage.getItem("prodcutsList"));
// } else {
//   var productList = [];
// }

displayAllProduct();

// *###### Function

// ~Create or add function (C)
function addProduct() {
  if (
    isValidInput(productsRegex.productName, productNameInput) &
    isValidInput(productsRegex.productCategory, productCategoryInput) &
    isValidInput(productsRegex.productPrice, productPriceInput) &
    isValidInput(productsRegex.productDescription, productDescriptionInput) &
    isValidateProductImage()
  ) {
    var product = {
      productName: productNameInput.value,
      productCategory: productCategoryInput.value,
      productPrice: productPriceInput.value,
      productDescription: productDescriptionInput.value,
      productImage: productImageInput.files[0].name,
    };

    // display product
    productList.push(product);
    displayProducut(productList.length - 1);

    // reset all
    resetInput();

    // local storay
    localStorage.setItem("prodcutsList", JSON.stringify(productList));
  }
}

// ~ Retrive, read or display function (R)
function displayProducut(index) {
  var productCardMarkup = `<div class="col-6 col-lg-3">
              <div class="product-card rounded-3 overflow-hidden">
                <div class="image bg-white">
                  <img
                    class="img-fluid object-fit-contain p-2"
                    src="./images/${productList[index].productImage}"
                    alt=""
                  />
                </div>
                <div class="product-info py-3 px-2">
                  <h3 class="h6 pb-2">${productList[index].productName}</h3>
                  <div
                    class="d-flex align-items-center justify-content-between mb-3 mt-2"
                  >
                    <h4 class="h6">
                      <i class="fa-solid fa-tags"></i>
                      <span>${productList[index].productCategory}</span>
                    </h4>
                    <span class="h6">${productList[index].productPrice} L.E</span>
                  </div>
                  <p class="text-body-secondary">
                    ${productList[index].productDescription}
                  </p>
                  <div class="d-flex gap-2">
                    <button class="btn w-100 btn-outline-warning" onclick = "moveProductDataToTheTop(${index})">
                      update
                    </button>
                    <button class="btn w-100 btn-outline-danger" onclick="deleteProduct(${index})">delete</button>
                  </div>
                </div>
              </div>
            </div>`;

  productContainer.innerHTML += productCardMarkup;
}

//~Reset inputs
function resetInput() {
  productNameInput.value = null;
  productCategoryInput.value = null;
  productPriceInput.value = null;
  productDescriptionInput.value = null;
  productImageInput.value = null;
  productNameInput.classList.remove("is-valid", "is-invalid");
  productPriceInput.classList.remove("is-valid", "is-invalid");
  productCategoryInput.classList.remove("is-valid", "is-invalid");
  productDescriptionInput.classList.remove("is-valid", "is-invalid");
}

// ~ display all product function
function displayAllProduct() {
  for (var i = 0; i <= productList.length - 1; i++) {
    displayProducut(i);
  }
}

// ~ delete product function (D)
function deleteProduct(index) {
  productList.splice(index, 1);
  localStorage.setItem("prodcutsList", JSON.stringify(productList));
  productContainer.innerHTML = "";
  displayAllProduct();
}

// ~ searchProducts function
function searchProducts() {
  productContainer.innerHTML = "";
  var searchKeyword = searchProductsInput.value;
  for (var i = 0; i < productList.length; i++) {
    if (
      productList[i].productName
        .toLowerCase()
        .includes(searchKeyword.toLowerCase())
    ) {
      displayProducut(i);
    }
  }
}

// ~ move productData to the Top
var updatedIndex;
function moveProductDataToTheTop(index) {
  productNameInput.value = productList[index].productName;
  productCategoryInput.value = productList[index].productCategory;
  productPriceInput.value = productList[index].productPrice;
  productDescriptionInput.value = productList[index].productDescription;
  // set updated index
  updatedIndex = index;
  // make updated button appear and add product button disappear
  addButton.classList.replace("d-block", "d-none");
  updateButton.classList.replace("d-none", "d-block");
}

//  ~ updateProduct function
function updateProducts() {
  productList[updatedIndex].productName = productNameInput.value;
  productList[updatedIndex].productCategory = productCategoryInput.value;
  productList[updatedIndex].productPrice = productPriceInput.value;
  productList[updatedIndex].productDescription = productDescriptionInput.value;
  if (productImageInput.files.length > 0) {
    productList[updatedIndex].productImage = productImageInput.files[0].name;
  }
  // update in local storage
  localStorage.setItem("prodcutsList", JSON.stringify(productList));
  // display Product
  productContainer.innerHTML = "";
  displayAllProduct();
  // reset input
  resetInput();
  // buttons
  addButton.classList.replace("d-none", "d-block");
  updateButton.classList.replace("d-block", "d-none");
}

// ~ validate the inputs
function isValidInput(regex, productInputElement) {
  if (regex.test(productInputElement.value)) {
    productInputElement.classList.add("is-valid");
    productInputElement.classList.remove("is-invalid");
    // next element(p) to the productinputElement
    productInputElement.nextElementSibling.classList.replace(
      "d-block",
      "d-none"
    );
    return true;
  } else {
    productInputElement.classList.add("is-invalid");
    productInputElement.classList.remove("is-valid");
    productInputElement.nextElementSibling.classList.replace(
      "d-none",
      "d-block"
    );
    return false;
  }
}

// ~ validat product image
function isValidateProductImage() {
  if (productImageInput.files.length > 0) {
    productImageInput.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  } else {
    productImageInput.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  }
}
