showBooks();

// Add Scroll Bar into the table
let tableBody = document.getElementById('table');
tableBody.style.overflow = 'auto';
tableBody.style.height = '350px';


// Show Books in the table
function showBooks() {

    let getBooks = localStorage.getItem('books');
    let bookObj;
    if (getBooks == null) {
        bookObj = [];
    } else {
        bookObj = JSON.parse(getBooks);
    }

    let addRow = "";
    bookObj.forEach(function (element, index) {
        addRow += `<tr>
                    <td>${element.name}</td>
                    <td>${element.author}</td>
                    <td>${element.type}</td>
                    <td><button id="${index}" onclick="deleteBook(this.id)" class="btn btn-primary">Delete Book</button></td>
                  </tr>`;
    });
    let tableBody = document.getElementById('tableBody');
    if (bookObj.length == 0) {
        tableBody.innerHTML = "";
    }else{
        tableBody.innerHTML = addRow;
    }
}

// Delete Book from the table
function deleteBook(index) {
    let getBooks = localStorage.getItem('books');
    let bookObj;
    if (getBooks == null) {
        bookObj = [];
    } else {
        bookObj = JSON.parse(getBooks);
    }
    let bookName = bookObj[index].name;
    bookObj.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(bookObj));
    let message = document.getElementById('message');
    let boldText = 'Deleted';
    message.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>${boldText}: </strong> The book ${bookName} has been deleted from the library
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>`;
    setTimeout(() => {
        message.innerHTML = "";
    }, 5000);
    showBooks();
}

// Create a Book Constructor

class Book{
    constructor(name,author,type)
    {
        this.name=name;
        this.author=author;
        this.type=type;
    }
}


class Display
{   
    // Adding new Books
    add(book)
    {
        let getBooks = localStorage.getItem('books');
        let bookObj;
        if (getBooks == null) {
            bookObj = [];
        } else {
            bookObj = JSON.parse(getBooks);
        }

        bookObj.push(book);
        localStorage.setItem('books', JSON.stringify(bookObj));
        let tableBody = document.getElementById('tableBody');
        showBooks();
    }

    // Deleting the contents of the form
    clear()
    {
        let libraryform=document.getElementById('libraryform');
        libraryform.reset();
    }

    validate(book)
    {
        if(book.name.length<3 || book.author.length<4)
            return false;
        else
            return true;
    }

    show(type,msg)
    {
        let message=document.getElementById('message');
        let boldText;
        if(type=='success')
            boldText=SUCCESS;
        else if(type == 'warning')
            boldText= ERROR;
        message.innerHTML=`<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>! ${boldText}</strong> ${msg}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>`;
        
        setTimeout(function(){
            message.innerHTML='';  // after displaying the above message remove it after 2000 msec. 
        },2000);
    }
}



let libraryform=document.getElementById('libraryform');
libraryform.addEventListener('submit',libraryformSubmit);

function libraryformSubmit(e)
{
    e.preventDefault();     // prevent the event in libraryform Submit from getting refreshed
    // remove it to know its use;
    console.log("Submitted");
   // let book=new Book(name,author,typr);
    let name=   document.getElementById('bookName').value;
    let author= document.getElementById('author').value;

    let fiction= document.getElementById('fiction');
    let horror= document.getElementById('horror');
    let adventure= document.getElementById('adventure');
    let adult=document.getElementById('adult');

    let type;
    if(fiction.checked)  // .checked to check whether the checkbox box is checked or not
    {
        type=fiction.value;
    }
    else if(horror.checked)
    {
        type=horror.value;
    }
    else if(adventure.checked)
    {
        type=adventure.value;
    }
    else if(adult.checked)
    {
        type=adult.value;
    }
    let book=new Book(name,author,type);
    console.log(book);
    let display=new Display();
    if(display.validate(book)) 
    {
        display.add(book);
        display.clear();
        display.show('success',"Your book has been successfully added");
    }   
    else
    {
        display.show('warning','Opps something went wrong, Check your input fields');
    } 

    e.preventDefault();
}