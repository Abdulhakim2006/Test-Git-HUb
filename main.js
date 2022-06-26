let users = [];
let edit = ''



function getUser() {
    $.ajax({

        url: 'https://ibs-test-api-v1.herokuapp.com/users',
        type: "get",
        success: (data) => {
            users = data
        },
        error: (error) => {
            alert("error")
        },
        async: false

    })
    drawUser()
}


$("#form").submit((event) => {
    event.preventDefault();
    let e = event.target;

    let obj = {
        fullName: e[1].value,
        email: e[2].value,
        phone: e[3].value
    }
    postUser(obj)
})

function postUser(obj) {
    $.ajax({
        url: 'https://ibs-test-api-v1.herokuapp.com/users',
        type: "post",
       dataType: "json",
       contentType: "application/json; charset=utf-8",
       data: JSON.stringify(obj),
        success: (data)=>{
            getUser(data)
        },
        error: (err) =>{
            alert(err)
        }

    })

}



function deleteUser(id){
  $.ajax({
    url: `https://ibs-test-api-v1.herokuapp.com/users/${id}`,
    type: "delete",
    success: () =>{
      getUser()
    },
    error: ()=> {
      alert(err)
    }
  })
}

function EditeUser(id){
    users.map(item =>{
        if(item.id === id){
            edit = item
        }
    })
    $("#name").val(edit.fullName)
    $("#email").val(edit.email)
    $("#phone").val(edit.phone)
}



function drawUser() {
    let a = users.map((item, index) => `
    <tr>
        <td>${item.id}</td>
        <td>${item.fullName}</td>
        <td>${item.email}</td>
        <td>${item.phone}</td>
        <td>
        <i class="bi bi-pencil-square mr-4 h4  "   onclick="EditeUser(${item.id})"></i>
        <i class="bi bi-trash-fill h4"  onclick="deleteUser(${item.id})"></i>
        </td>
    
    </tr>
    `)

    $("#tbody").html(a)
}

getUser()