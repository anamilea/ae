$(document).ready(function(){
  showCategories()
  showProducts()
})

function showCategories() {
  $.get( "/categories", function( data ) {
    var html = ''
    data.forEach(function(category) {
      html = html + '<li><a href="#" onClick="showProducts('+category.id+')">'+category.name+'</a></li>'
    })
    $('#categories').html(html)
  });
}

var cart = [];
var price = 0; 
function viewCart() {
 $('#view_cart_modal').modal('show');

 if(cart.length > 0) {
  populateCartView();
 }
 else {
   $('#cart-head').prop('hidden', true);
  $('#buy').prop('hidden', true);
  $('#cart-table').html('<h3> Nu exista produse in cos <h3>');
 }
}

function populateCartView() {
   var html = ''
    cart.forEach(function(book) {
  html = html +'<tr>'
  + '<td> '  + book.name  + '</td>' 
  +  '<td>' + book.price + ' RON' + '</td>'
    + '<td align="center">'
      + '<td align="center">'
      + '<button onclick="deleteCartItem('+ book.id +')" class="btn btn-danger">Delete</button>'
      + '</td>';
  + '</tr>'
  price = price + book.price;
})

 $('cart-footer').html( '<h3> Pret total cos: ' + price + ' RON' + ' </h3>');
 $('#cart-content').html(html);
}

function addToCart(name, price) {
 var book = {name: name, price: price, id: Math.floor(Math.random() * 1000)};
 cart.push(book)
 Swal(
  'Book ' + name+ ' addded to cart',
  'Price: ' +  price + ' RON',
  'success'
)
}

function deleteCartItem(id) {
  cart.forEach(function(book) {
    if(book.id === id) {
      cart.pop(book);
       Swal(
  'Book ' + book.name + ' has been removed from the cart',
  '... :( ...',
  'info'
)
    }
  })
 document.getElementById("progress").style.display = "block";
 
  refreshCart()
}

function refreshCart() {
  $("#cart-content tr").remove(); 
  populateCartView();
    document.getElementById("progress").style.display = "none";
}

function showProducts(categoryId) {
  if(categoryId) {
    var url = '/categories/'+ categoryId +'/products';
  } else {
    var url = '/products'   
  }
  $.get(url, function(data) {
    var html = '';
    data.forEach(
      function(product) {
        html = html + '<tr> '
        + '<td>'+product.name+'</td>'
        +  '<td>'+product.description+'</td>'
        +  '<td>'+product.category.name+'</td>'
        +  '<td>' + product.price+' RON </td>'
        + '<td align="center" style="width:200px;">'
        + `<button class="btn btn-success" onClick="addToCart('`+ product.name + `' , ` + product.price +`)">Adauga in cos</button>`
        + '</td>';
        + '</tr>';

        html =  html + ''

        if(product.reviews) {
          product.reviews.forEach(
            function(reviewData) {
              html = html + reviewData.name + ' ' + reviewData.content;
              html = html + '<br>';
            }
            )
        }


      }
      )
    $('#content').html(html);
  })
}