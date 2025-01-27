$(document).ready( function() {
    
    // console.log($);
    
    // $('#tableBody').html('<tr> <td>5</td>  <td>21DCE014</td> <td>Devarsh</td> <td>Djc@gmail.com</td> <tr>');

    const data_url = 'https://jsonplaceholder.typicode.com/comments'

    function renderTableHead() {
        $("#dataTable").html(`
            <thead id="table-head">
                <tr>
                    <th scope="col">Post ID</th>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody id="tableBody"></tbody>
        `);
    }


    function renderTableBody(data) {
        data.forEach(element => {
            $('#tableBody').append(`
                <tr>
                    <td>${element.postId}</td>
                    <td>${element.id}</td>
                    <td class="api-name">${element.name}</td>
                    <td>${element.email}</td>
                    <td> <button type="button" class="btn btn-secondary" id="${element.id}">View body</button> </td>
                </tr>
            `)
        });
    }

    function bodyViewButton(data) {
        data.forEach(element => {
            $(`#${element.id}`).on('click',function() {
                alert(`${element.body}`)  
            })
        });
    }


    $.ajax({
        url: data_url,
        method: "GET",

        success: function(data) {
            
            renderTableHead();
            renderTableBody(data);

            // To see body-content
            bodyViewButton(data);

            paginationContent(1, data);
   
        },

        error: function(error) {
            console.log('Error :', error);
        }
    });

    // Live-Search
    $('#inputData').on('keydown', function() {
        
        let textValue = $(this).val().toLowerCase();
        
        $('#dataTable #tableBody tr').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(textValue) > -1)
        })
        
    })
    

})