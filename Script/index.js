// Constructor
function Book(name,author,type)
{
    this.name=name;
    this.author=author;
    this.type=type;
}

//Display Constructor
function Display() {

}



// Add methods to display prototype

Display.prototype.add=function(book){

    //Adding inside UI
    tableBody=document.getElementById('tableBody');
    let uiString= `<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`;
    tableBody.innerHTML+=uiString;
    console.log();

};

// Implement the clear fucntion
Display.prototype.clear=function()
{
    let libraryform=document.getElementById('libraryform');
    libraryform.reset();
}

// Implement the validate function
Display.prototype.validate=function(book)
{
    if(book.name.length<3 || book.author.length<4)
        return false;
    else
        return true;
}

Display.prototype.show=function(type,msg)
{
    let message=document.getElementById('message');
    message.innerHTML=`<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>!!</strong> ${msg}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
    
    setTimeout(function(){
        message.innerHTML='';  // after displaying the above message remove it after 2000 msec. 
    },2000);
}


// Add submit event listner to form

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

    e.preventDefault();w
}



